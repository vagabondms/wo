import type { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import type { GetExercise, GetExercises } from '@shared/exercise/response';

import Exercise from '../entity/Exercise.entity';

export const getExercises = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const exercises: Exercise[] = await getRepository(Exercise)
      .createQueryBuilder('exercise')
      .select(['exercise.name', 'exercise.id', 'exercise.img'])
      .getMany();

    const response: GetExercises = exercises;

    res.status(200).json(response);
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// * 개별 운동 보기
export const getExercise = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { exerciseId } = req.params;

    const exercise: Exercise | undefined = await getRepository(Exercise)
      .createQueryBuilder('exercise')
      .where('exercise.id = :exerciseId', { exerciseId })
      .getOne();

    if (!exercise) {
      // TODO: 번호는 나중에 한 번에 통일시키자.
      res.status(204).json('없는 운동');
      return;
    }

    const response: GetExercise = exercise;

    res.status(200).json(response);
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};
