import { Request, Response, NextFunction } from 'express';

// * record 보기
export const getRecord = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * record 생성
export const createRecord = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * record 삭제
export const deleteRecord = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};
