import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Post from '../entity/Post.entity';
import Record from '../entity/Record.entity';

import * as PostTypes from 'types/post';
import User from '../entity/User.entity';
import PostImage from '../entity/PostImage.entity';

// TODO: 중요!!
// TODO: 리펙토링 하기 전에 typeORM에서 제공하는 캐싱기능을 한번 살펴봐야한다.
// TODO: 현재 접속한 사람을 지속적으로 레포지토리에서 가져오기 때문이다.

// * 게시글 전체 보기
export const getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lastId: PostTypes.Id = req.body.lastId;

    const posts: Post[] | undefined = await getRepository(Post)
      .createQueryBuilder('post')
      .orderBy('post.created_at', 'DESC')
      .where(`post.id < :lastId`, { lastId })
      .limit(10)
      .leftJoinAndSelect('post.records', 'record')
      .leftJoinAndSelect('post.writer', 'writer')
      .leftJoinAndSelect('post.likers', 'liker')
      .leftJoinAndSelect('record.exercise', 'exercise')
      .addSelect('writer.nickname') // writer.nickname은 hidden column임.
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
      .where('post.id = :id', { id: req.params.id })
      .leftJoinAndSelect('post.postImages', 'postImage')
      .leftJoinAndSelect('post.writer', 'writer')
      .leftJoinAndSelect('post.likers', 'liker')
      .leftJoinAndSelect('post.records', 'record')
      .addSelect(['post.content', 'writer.nickname']) // 히든칼럼 추가해주기
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
    const { recordIds, userId, postImagesIds, content }: PostTypes.NewPostInfo = req.body;

    //* recordIds에 따른 records 생성

    const records: Record[] | undefined = await getRepository(Record)
      .createQueryBuilder('record')
      .where('record.id IN (:...ids)', { ids: recordIds })
      .getMany();

    const user: User | undefined = await getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .getOne();

    const postImages: PostImage[] | undefined = await getRepository(PostImage)
      .createQueryBuilder('postImage')
      .where('postImage.id In (:...ids)', { ids: postImagesIds })
      .getMany();

    //TODO: 다른 아이들과 이어 붙여야 함.
    const {
      raw: { insertId },
    } = await getRepository(Post)
      .createQueryBuilder()
      .insert()
      .values({ content, postImages: postImages, records, writer: user })
      .execute();

    const newPost: Post | undefined = await getRepository(Post)
      .createQueryBuilder('post')
      .where('post.id = :id', { id: insertId })
      .leftJoinAndSelect('post.postImages', 'postImage')
      .leftJoinAndSelect('post.writer', 'writer')
      .leftJoinAndSelect('post.likers', 'liker')
      .leftJoinAndSelect('post.records', 'record')
      .addSelect('post.content')
      .getOne();

    res.status(200).send(newPost);
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
export const likePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, postId }: PostTypes.LikePost = req.body;

    const user = await getRepository(User)
      .createQueryBuilder()
      .relation(User, 'likes')
      .of(userId)
      .add(postId);

    res.status(200).send(user);
    return;
  } catch (err) {
    console.error(err);
    next(err);
    return;
  }
};

// * 좋아요 취소
export const unlikePost = async (
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
