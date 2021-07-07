export type Id = number | string;

export type Ids = Id[];

export interface NewPostInfo {
  recordIds: Ids;
  userId: Id;
  postImagesIds: Ids;
  content: string;
}

export interface LikeUnlikePost {
  userId: Id;
  postId: Id;
}

export interface createProgram {
  name: string;
  isShared: boolean;
  exerciseIds: Ids;
}

export interface scrapProgram {
  name: string;
  programId: Id;
}

export interface newRecord {
  weight: number;
  reps: number;
}
