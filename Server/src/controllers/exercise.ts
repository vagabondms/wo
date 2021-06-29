import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import Exercise from '../entity/Exercise.entity';

// * 운동 보기
export const getExercise = async (req: Request, res: Response): Promise<void> => {
  console.log(await getConnection().getRepository(Exercise).find());
  res.status(200).send('hi');
  return;
};
