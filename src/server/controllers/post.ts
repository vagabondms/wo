import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Post from '../entity/Post.entity';

// * 게시글 전체 보기
export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lastId: number = req.body.lastId;

    const posts: Post[] | undefined = await getRepository(Post)
      .createQueryBuilder('post')
      .orderBy('post.created_at', 'DESC')
      .where(`post.id < :lastId`, { lastId })
      .limit(10)
      .leftJoinAndSelect('post.records', 'record')
      .leftJoinAndSelect('record.exercise', 'exercise')
      .select(['post', 'record', 'exercise.id', 'exercise.name', 'exercise.img'])
      .getMany();

    if (!posts) {
      //TODO: 메시지 수정 필요
      res.status(404).send('오류!');
      return;
    }
    res.status(200).send(posts);
    return;
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// * 게시글 한개 보기
export const getPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post: Post | undefined = await getRepository(Post)
      .createQueryBuilder('post')
      .addSelect('post.content') // hidden column으로 설정되어 있음.
      .where('post.id = :id', { id: req.params.id })
      .getOne();

    if (!post) {
      res.status(404).send('없음');
      return;
    }
    res.status(200).send(post);
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 게시글 생성
export const createPost = async (
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

// * 게시글 삭제
export const deletePost = async (
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

// * 좋아요
export const like = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 좋아요 취소
export const unlike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};
