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

    res.status(200).send(programs);
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
      res.status(403).send('작성자가 없습니다.');
      return;
    }
    const newProgram = new Program(name, false || isShared);
    newProgram.exercises = exercises;
    newProgram.owner = owner;

    await getConnection().manager.save(newProgram);

    console.log(newProgram);
    res.send('hi');
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 프로그램 삭제
export const deleteProgram = async (
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

// * 프로그램 공유 설정
export const shareProgram = async (
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

// * 프로그램 공유 취소
export const unshareProgram = async (
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

// * 프로그램 가져오기
export const grabProgram = async (
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
