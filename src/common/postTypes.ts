export type Id = number;

export interface NewPostInfo {
  recordIds: Id[];
  userId: Id;
  postImagesIds: Id[];
  content: string;
}

export interface LikeUnlikePost {
  userId: number;
  postId: number;
}
