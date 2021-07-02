import { Request, Response, NextFunction } from 'express';
import { getConnection, getRepository, getTreeRepository } from 'typeorm';

import Program from '../entity/Program.entity';
import User from '../entity/User.entity';

import { Id } from 'types/post';

// * 프로그램 목록 가져오기
export const getProgram = async (req: Request, res: Response, next: NextFunction): void => {
  try {
    const userId: Id = 31; //TODO: 추후 session에서 꺼내쓰는 것으로 대체

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

// * 프로그램
export const createProgram = (req: Request, res: Response, next: NextFunction): void => {};

// * 프로그램 삭제
export const deleteProgram = (req: Request, res: Response, next: NextFunction): void => {};

// * 프로그램 공유 설정
export const shareProgram = (req: Request, res: Response, next: NextFunction): void => {};

// * 프로그램 공유 취소
export const unshareProgram = (req: Request, res: Response, next: NextFunction): void => {};

// * 프로그램 가져오기
export const grabProgram = (req: Request, res: Response, next: NextFunction): void => {};
