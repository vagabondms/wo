import { Request, Response } from 'express';

// * 게시글 보기
export const getPost = (req: Request, res: Response): void => {};

// * 게시글 생성
export const createPost = (req: Request, res: Response): void => {};

// * 게시글 삭제
export const deletePost = (req: Request, res: Response): void => {};

// * 좋아요
export const like = (req: Request, res: Response): void => {};

// * 좋아요 취소
export const unlike = (req: Request, res: Response): void => {};
