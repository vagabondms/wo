import { Request, Response } from 'express';

// * 회원가입
export const signUp = (req: Request, res: Response): void => {};

// * 로그인
export const signIn = (req: Request, res: Response): void => {};

// * 로그아웃
export const signOut = (req: Request, res: Response): void => {};

// * 유저 정보 가져오기
export const getProfile = (req: Request, res: Response): void => {};

// * 수정
export const updateProfile = (req: Request, res: Response): void => {};

// * follow
export const follow = (req: Request, res: Response): void => {};

// * unfollow
export const unfollow = (req: Request, res: Response): void => {};
