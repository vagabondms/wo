import type { Request, Response, NextFunction } from 'express';
import { getConnection, getRepository } from 'typeorm';

import type * as Req from '@shared/program/request';
import type * as Res from '@shared/program/response';
import type CustomUpdateResult from '@serverInterface';

import Program from '../entity/Program.entity';
import User from '../entity/User.entity';
import ExerciseProgram from '../entity/ExerciseProgram.entity';

// * 프로그램 목록 가져오기

export const getProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = 1; // TODO: 추후 session에서 꺼내쓰는 것으로 대체

    const programs: Program[] = await getRepository(Program)
      .createQueryBuilder('program')
      .where('program.scrapedBy = :userId', { userId })
      .innerJoinAndSelect('program.exercises', 'join')
      .innerJoinAndSelect('join.exercise', 'exercises')
      .getMany();

    const response: Res.GetProgram = programs;

    res.status(200).json(response);
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// * 프로그램 생성하기
export const createProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, isShared } = <Req.CreateProgram>req.body;
    if (!name) {
      res.status(400).json('빈 곳이 있습니다.');
      return;
    }

    const userId = 1; // TODO: 추후에 session에 있는 값으로 바꿀 예정

    const owner: User | undefined = await getRepository(User).findOne(userId);

    if (!owner) {
      res.status(403).json('작성자가 없습니다.');
      return;
    }

    const newProgram = new Program();
    newProgram.owner = owner;
    newProgram.scrapedBy = owner;
    newProgram.isShared = isShared;
    newProgram.name = name;

    await getConnection().manager.save(newProgram);

    const response: Res.CreateProgram = newProgram;

    res.status(200).json(response);
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

/*
  [프로그램 삭제]
  이 부분은 프로그램을 삭제하는 것이 아니라, user와의 연결을 끊는 것이다.
  다만, 연결이 아예 존재하지 않으면 그때, 삭제해야한다.

  따라서 두 부분으로 나눠진다.
  1. 연결 끊기
  2. 연결 끊은 후, 만약 연결되어 있는 것이 아무것도 없다면 삭제하기.
*/

export const deleteProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const programId = Number(req.params.programId);
    const userId = 1; // TODO: session 값으로 대체 예정

    // 곧바로 삭제를 실시한다. 그런데 삭제를 실시했는데 영향을 받은 row가 없으면
    // 잘못된 요청이 들어온 것임. 따라서 에러를 뱉는다.

    const { affected } = await getRepository(Program)
      .createQueryBuilder()
      .delete()
      .where('scrapedBy = :userId', { userId })
      .andWhere('id = :programId', { programId })
      .execute();

    if (affected === 0) {
      res.status(400).send('해당 program을 갖고있지 않습니다.');
    }

    const response: Res.DeleteProgram = programId;

    res.status(200).json(response);
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// * 프로그램 공유 설정
export const shareProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const programId = Number(req.params.programId);
    const userId = 1; // TODO: session 값으로 교체

    const {
      affected,
      raw: { changedRows },
    } = <CustomUpdateResult>(
      await getConnection()
        .createQueryBuilder()
        .update(Program)
        .set({ isShared: true })
        .where('id = :programId', { programId })
        .andWhere('scrapedBy = :userId', { userId })
        .execute()
    );
    if (affected === 0) {
      res.status(400).send('해당 프로그램을 갖고 있지 않습니다.');
      return;
    }
    if (changedRows === 0) {
      res.status(400).send('이미 공유되고 있습니다.');
      return;
    }

    // TODO: number가 아닌 다른 것으로 보내주기 status error 나는 중
    const response: Res.ShareProgram = programId;

    res.status(200).json(response);
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// * 프로그램 공유 취소
export const unshareProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const programId = Number(req.params.programId);
    const userId = 1; // TODO: session 값으로 교체

    const {
      affected,
      raw: { changedRows },
    } = <CustomUpdateResult>(
      await getConnection()
        .createQueryBuilder()
        .update(Program)
        .set({ isShared: false })
        .where('id = :programId', { programId })
        .andWhere('scrapedBy = :userId', { userId })
        .execute()
    );

    if (affected === 0) {
      res.status(400).send('해당 프로그램을 갖고 있지 않습니다.');
      return;
    }
    if (changedRows === 0) {
      res.status(400).send('이미 공유되지 않고 있습니다.');
      return;
    }

    const response: Res.UnshareProgram = programId;

    // TODO: number가 아닌 다른 것으로 보내주기
    res.status(200).json(response);
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// * 프로그램 스크랩하기
/*
  기존 프로그램을 복사해서 새로운 프로그램을  생성하는 방식으로 이루어져야 한다.
    1. 프로젝트의 내용을 그대로 복사.
    2. owner에 userId 할당
*/

export const scrapProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = 1; // TODO: session 값으로 교체

    const user: User | undefined = await getRepository(User).findOne(userId);
    if (!user) {
      res.status(400).json('잘못된 접근입니다.');
      return;
    }

    const programId = Number(req.params.programId);
    const { name } = <Req.ScrapProgram>req.body;

    const isProgramExist = await getRepository(Program).findOne(programId);
    if (!isProgramExist) {
      res.status(404).json('존재하지 않는 프로그램입니다.');
      return;
    }

    const targetExercises: ExerciseProgram[] = await getConnection()
      .createQueryBuilder()
      .relation(Program, 'exercises')
      .of(programId)
      .loadMany();

    const targetOwner: User | undefined = await getConnection()
      .createQueryBuilder()
      .relation(Program, 'owner')
      .of(programId)
      .loadOne();

    if (!targetOwner) {
      throw new Error('대상 프로그램 안에 owner가 없습니다.');
    }

    const newProgram = new Program();
    newProgram.name = name;
    newProgram.isShared = true;
    newProgram.owner = targetOwner;
    newProgram.scrapedBy = user;

    const { id } = await getConnection().manager.save(newProgram);

    await Promise.all(
      targetExercises.map(async (el): Promise<void> => {
        const { exerciseId, order } = el;
        const newExerciseProgram = new ExerciseProgram();
        newExerciseProgram.exerciseId = exerciseId;
        newExerciseProgram.programId = id;
        newExerciseProgram.order = order;
        await getConnection().manager.save(newExerciseProgram);
      }),
    );

    const response: Res.ScrapProgram = { programId, name };
    res.status(200).json(response);

    return;
  } catch (err) {
    console.log('hi');
    console.error(err);
    next(err);
  }
};

export const changeNameProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = 1; // ODO: session 값으로 교체
    const programId = Number(req.params.programId);
    const { name } = <Req.ChangeNameProgram>req.body;

    const { affected } = await getRepository(Program)
      .createQueryBuilder()
      .update()
      .set({ name })
      .where('id = :programId', { programId })
      .andWhere('scrapedById = :userId', { userId })
      .execute();

    if (affected === 0) {
      res.status(400).json('잘못된 접근입니다.');
      return;
    }

    const response: Res.ChangeNameProgram = { programId, name };
    res.status(200).json(response);
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};
