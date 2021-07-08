import { Request, Response, NextFunction } from 'express';

// * 회원가입
export const signUp = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 로그인
export const signIn = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 로그아웃
export const signOut = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 유저 정보 가져오기
export const getProfile = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 수정
export const updateProfile = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * follow
export const follow = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * unfollow
export const unfollow = (req: Request, res: Response, next: NextFunction): void => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};
