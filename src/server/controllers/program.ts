import { Request, Response, NextFunction } from 'express';
import { getConnection, getRepository } from 'typeorm';

import Program from '../entity/Program.entity';
import User from '../entity/User.entity';

import * as Type from 'types/post';
import Exercise from '../entity/Exercise.entity';

// * 프로그램 목록 가져오기
export const getProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId: Type.Id = 31; //TODO: 추후 session에서 꺼내쓰는 것으로 대체

    const programs: Program[] = await getConnection()
      .createQueryBuilder()
      .relation(User, 'programs')
      .of(userId)
      .loadMany();

    res.status(200).json(programs);
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 프로그램 생성하기
export const createProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, isShared, exerciseIds }: Type.createProgram = req.body;

    const userId: Type.Id = 31; //TODO: 추후에 session에 있는 값으로 바꿀 예정

    const exercises: Exercise[] | undefined = await getRepository(Exercise)
      .createQueryBuilder('exercise')
      .where('exercise.id IN (:...exerciseIds)', { exerciseIds }) //TODO: exerciseId가 잘못 들어왔을 경우를 생각해봐야겠다.
      .getMany();

    const owner: User | undefined = await getRepository(User).findOne(userId);

    if (!owner) {
      res.status(403).json('작성자가 없습니다.');
      return;
    }
    const newProgram = new Program(name, false || isShared);
    newProgram.exercises = exercises;
    newProgram.owner = owner;

    await getConnection().manager.save(newProgram);

    res.status(200).json(newProgram);
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
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
    const programId: Type.Id = req.params.programId;
    const userId: Type.Id = 32; //TODO: session 값으로 대체 예정

    // * 1. 연결을 끊는 부분.
    await getConnection()
      .createQueryBuilder()
      .relation(Program, 'users')
      .of(programId)
      .remove(userId);

    const counts = (
      await getRepository(Program)
        .createQueryBuilder()
        .relation(Program, 'users')
        .of(programId)
        .loadMany()
    ).length;

    //* 2. 연결된 것이 더 이상 없으면 프로그램을 DB에서 삭제함
    if (counts === 0) {
      await getRepository(Program)
        .createQueryBuilder()
        .delete()
        .where('id = :programId', { programId })
        .execute();
    }

    res.status(200).json(programId);
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

/* 
  프로그램 공유에 대해 고민해봐야할 것.
  1. owner만 공유/공유 해제를 할 수 있는데, 이때 만약 누군가 program을 가져가면 그때는 어떻게 작동시키는지?
  => 두가지 경우가 있을 것 같은데, 
        1) owner 바꾸기, 
        2) 공유 자체를 owner 한테 가서만 할 수 있게함. 따라서 가져간 사용자들은 공유/비공유에 영향을 끼칠 수 없게 제한.
    현재는 후자가 좋아 보이는데 생각을 더 해봐야 할 듯.
 */

// * 프로그램 공유 설정
export const shareProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const programId: Type.Id = req.params.programId;
    const userId: Type.Id = 27;

    const {
      raw: { changedRows },
    } = await getRepository(Program)
      .createQueryBuilder()
      .update()
      .set({
        isShared: true,
      })
      .where('id=:programId', { programId: 1 })
      .andWhere('ownerId = :userId', { userId })
      .execute();

    //* 변경된 것이 없으면 잘못된 요청임.
    if (changedRows === 0) {
      res.status(403).json('잘못된 요청입니다.');
      return;
    }

    res.status(200).send(programId);
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 프로그램 공유 취소
export const unshareProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const programId: Type.Id = req.params.programId;
    const userId: Type.Id = 27;

    const {
      raw: { changedRows },
    } = await getRepository(Program)
      .createQueryBuilder()
      .update()
      .set({
        isShared: false,
      })
      .where('id=:programId', { programId: 1 })
      .andWhere('ownerId = :userId', { userId })
      .execute();

    //* 변경된 것이 없으면 잘못된 요청임.
    if (changedRows === 0) {
      res.status(403).json('잘못된 요청입니다.');
      return;
    }

    res.status(200).send(programId);
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 프로그램 스크랩하기
export const scrapProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId: Type.Id = 32;
    const programId: Type.Id = req.params.programId;

    await getConnection().createQueryBuilder().relation(Program, 'users').of(programId).add(userId);
    res.status(200).send(programId);
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

export const changeNameProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};
