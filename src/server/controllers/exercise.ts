import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Exercise from '../entity/Exercise.entity';

// * 운동 보기
export const getExercises = async (req: Request, res: Response): Promise<void> => {
  const exercises: Exercise[] = await getRepository(Exercise)
    .createQueryBuilder('exercise')
    .select(['exercise.name', 'exercise.id', 'exercise.img'])
    .getMany();
  res.status(200).send(exercises);
  return;
};

// * 개별 운동 보기
export const getExercise = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const exercise: Exercise | undefined = await getRepository(Exercise)
      .createQueryBuilder('exercise')
      .where('exercise.id = :id', { id: req.params.id })
      .getOne();

    if (!exercise) {
      // TODO: 번호는 나중에 한 번에 통일시키자.
      res.status(204).send('없는 운동');
      return;
    }
    res.status(200).send(exercise);
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};