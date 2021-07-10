import Post from '@model/Post.entity';

export type GetPosts = Post[];
export type GetPost = Post;
export type CreatePost = Post;
export type DeletePost = number;
export interface LikePost {
  userId: number;
  postId: number;
}
export type UnlikePost = LikePost;
