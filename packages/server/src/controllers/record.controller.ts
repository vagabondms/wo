import { Request, Response, NextFunction } from 'express';
import { getConnection, getRepository } from 'typeorm';

import type * as Req from '@shared/record/request';
import type * as Res from '@shared/record/response';

import Record from '@model/Record.entity';
import User from '@model/User.entity';
import Exercise from '@model/Exercise.entity';

// * record 보기
export const getRecord = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = 1; // TODO: 추후 session에서 꺼내쓰는 것으로 대체
    const exerciseId = Number(req.params.exerciseId);

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
  }
};

// * record 생성
export const createRecord = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = 1; // TODO: 추후 session에서 꺼내쓰는 것으로 대체
    const exerciseId = Number(req.params.exerciseId);
    const { weight, reps } = <Req.CreateRecord>req.body;

    const user: User | undefined = await getRepository(User).findOne(userId);

    if (!user) {
      res.status(400).json('존재하지 않는 유저입니다.');
      return;
    }

    const exercise: Exercise | undefined = await getRepository(Exercise).findOne(exerciseId);

    if (!exercise) {
      res.status(40).json('해당 운동은 존재하지 않습니다.');
      return;
    }

    const newRecord = new Record(weight, reps);
    newRecord.user = user;
    newRecord.exercise = exercise;

    const savedRecord = await getConnection().manager.save(newRecord);

    const response: Res.CreateRecord = savedRecord;

    res.status(200).json(response);
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// * record 삭제
export const deleteRecord = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = 1; // TODO: 추후 session에서 꺼내쓰는 것으로 대체
    const recordId = Number(req.params.recordId);

    const user: User | undefined = await getRepository(User).findOne(userId);

    if (!user) {
      res.status(400).json('존재하지 않는 유저입니다.');
      return;
    }

    const { affected } = await getRepository(Record)
      .createQueryBuilder()
      .delete()
      .where('userId = :userId', { userId })
      .andWhere('id = :recordId', { recordId })
      .execute();

    if (affected === 0) {
      res.status(400).json('보유하고 있지 않은 기록입니다.');
      return;
    }

    const response: Res.DeleteRecord = recordId;
    res.status(200).json(response);
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};
