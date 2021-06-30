import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import Exercise from '../entity/Exercise.entity';

// * 운동 보기
export const getExercise = async (req: Request, res: Response): Promise<void> => {
  const exercises: Exercise[] = await getConnection().getRepository(Exercise).find();
  res.status(200).send(exercises);
  return;
};
