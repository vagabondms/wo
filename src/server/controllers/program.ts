import { Request, Response, NextFunction } from 'express';
import { getConnection, getRepository } from 'typeorm';

import Program from '../entity/Program.entity';
import User from '../entity/User.entity';

import * as Type from 'src/common/Types';
import Exercise from '../entity/Exercise.entity';
import Program_User from '../entity/Program_User.entity';

// * 프로그램 목록 가져오기
export const getProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId: Type.Id = 1; //TODO: 추후 session에서 꺼내쓰는 것으로 대체

    const user: User | undefined = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .innerJoinAndSelect('user.scrapedPrograms', 'programRelation')
      .innerJoinAndSelect('programRelation.program', 'program')
      .getOne();

    if (!user) {
      res.status(400).json('존재하지 않는 유저입니다.');
      return;
    }
    res.status(200).json();
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
    if (!name || !exerciseIds) {
      res.status(400).json('빈 곳이 있습니다.');
      return;
    }

    const userId: Type.Id = 1; //TODO: 추후에 session에 있는 값으로 바꿀 예정

    const owner: User | undefined = await getRepository(User).findOne(userId);

    const exercises: Exercise[] | undefined = await getRepository(Exercise)
      .createQueryBuilder('exercise')
      .where('exercise.id IN (:...exerciseIds)', { exerciseIds }) //TODO: exerciseId가 잘못 들어왔을 경우를 생각해봐야겠다.
      .getMany();

    if (!owner) {
      res.status(403).json('작성자가 없습니다.');
      return;
    }
    const newProgram = new Program();
    newProgram.exercises = exercises;
    newProgram.owner = owner;

    const { id: programId } = await getConnection().manager.save(newProgram);
    // program_user에 새 row를 만드는 부분.
    const programDetails = new Program_User();
    programDetails.program = programId;
    programDetails.name = name;
    programDetails.isShared = isShared;
    programDetails.user = userId;

    await getConnection().manager.save(programDetails);

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
    const userId: Type.Id = 1; //TODO: session 값으로 대체 예정

    // 곧바로 삭제를 실시한다. 그런데 삭제를 실시했는데 영향을 받은 row가 없으면
    // 잘못된 요청이 들어온 것임. 따라서 에러를 뱉는다.

    const { affected } = await getRepository(Program_User)
      .createQueryBuilder()
      .delete()
      .where('userId = :userId', { userId })
      .andWhere('programId = :programId', { programId })
      .execute();

    if (affected === 0) {
      res.status(400).send('해당 program을 갖고있지 않습니다.');
    }

    // 3. 연결된 유저가 없을 때 해당 프로그램을 삭제해아할까? 정보로서 가치가 있는지 판단이 필요.
    // 우선 삭제하지 않는 것으로.

    res.status(400).json(programId);
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 프로그램 공유 설정
export const shareProgram = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const programId: Type.Id = req.params.programId;
    const userId: Type.Id = 1; //TODO: session 값으로 교체

    const {
      affected,
      raw: { changedRows },
    } = await getConnection()
      .createQueryBuilder()
      .update(Program_User)
      .set({ isShared: true })
      .where('programId = :programId', { programId })
      .andWhere('userId = :userId', { userId })
      .execute();

    if (affected === 0) {
      res.status(400).send('해당 프로그램을 갖고 있지 않습니다.');
      return;
    }
    if (changedRows === 0) {
      res.status(400).send('이미 공유되고 있습니다.');
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
    const userId: Type.Id = 1; //TODO: session 값으로 교체

    const {
      affected,
      raw: { changedRows },
    } = await getConnection()
      .createQueryBuilder()
      .update(Program_User)
      .set({ isShared: false })
      .where('programId = :programId', { programId })
      .andWhere('userId = :userId', { userId })
      .execute();

    if (affected === 0) {
      res.status(400).send('해당 프로그램을 갖고 있지 않습니다.');
      return;
    }
    if (changedRows === 0) {
      res.status(400).send('이미 공유되지 않고 있습니다.');
      return;
    }
    res.status(200).send(programId);
    return;
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
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
    const userId: Type.Id = 1; //TODO: session 값으로 교체
    const programId: Type.Id = req.params.programId;
    const { name }: { name: string } = req.body;

    //program이 owner한테 존재하면 만들면 안된다.
    const isProgramAlreadyAssigned: Program_User | undefined = await getRepository(Program_User)
      .createQueryBuilder()
      .where('userId = :userId', { userId })
      .andWhere('programId = :programId', { programId })
      .getOne();

    if (isProgramAlreadyAssigned) {
      res.status(400).send('이미 스크랩한 프로그램입니다.');
    }

    const newRelation = new Program_User();
    newRelation.name = name;
    newRelation.program = parseInt(programId);
    newRelation.user = userId;

    await getConnection().manager.save(newRelation);

    // 새로 만들어진 프로그램을 찾아서 보내줘야 하나?

    res.status(200).json({ programId, name });

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
    const userId: Type.Id = 1; //TODO: session 값으로 교체
    const programId: Type.Id = req.params.programId;
    const { name }: { name: string } = req.body;

    const { affected } = await getRepository(Program_User)
      .createQueryBuilder()
      .update()
      .set({ name })
      .where('userId = :userId', { userId })
      .andWhere('programId = :programId', { programId })
      .execute();

    if (affected === 0) {
      res.status(400).send('스크랩한 프로그램이 아닙니다.');
      return;
    }

    res.status(400).json({ programId, name });
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};
