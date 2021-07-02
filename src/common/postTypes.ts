export type Id = number;

export interface NewPostInfo {
  recordIds: number[];
  userId: number;
  postImagesIds: number[];
  content: string;
}

export interface LikePost {
  userId: number;
  postId: number;
}
