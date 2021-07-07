import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import * as Type from 'types/post';
import Record from '../entity/Record.entity';

// * record 보기
export const getRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId: Type.Id = 1; //TODO: 추후 session에서 꺼내쓰는 것으로 대체
    const exerciseId: Type.Id = req.params.exerciseId;

    const records: Record[] = await getRepository(Record)
      .createQueryBuilder()
      .where('userId = :userId', { userId })
      .andWhere('exerciseId = :exerciseId', { exerciseId })
      .getMany();

    res.status(200).send(records);

    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * record 생성
export const createRecord = async (
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

// * record 삭제
export const deleteRecord = async (
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
