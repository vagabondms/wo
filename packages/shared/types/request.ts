export type Id = number | string;

export type Ids = Id[];

export interface LikeUnlikePost {
  userId: Id;
  postId: boolean;
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
