export interface CreatePost {
  recordIds: number;
  userId: number;
  postImagesIds: number;
  content: string;
}

export interface LikePost {
  userId: number;
  postId: number;
}

export type UnlikePost = LikePost;
