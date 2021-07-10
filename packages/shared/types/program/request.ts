export interface CreateProgram {
  name: string;
  isShared: boolean;
  exerciseIds: number[];
}

export interface ScrapProgram {
  name: string;
}
export interface ChangeNameProgram {
  name: string;
}
