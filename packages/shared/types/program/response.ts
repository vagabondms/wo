import Program from '@model/Program.entity';
import User from '@model/User.entity';

export type GetProgram = User;
export type CreateProgram = Program;
export type DeleteProgram = number;
export type ShareProgram = number;
export type UnshareProgram = number;
export interface ScrapProgram {
  programId: number;
  name: string;
}
export interface ChangeNameProgram {
  programId: number;
  name: string;
}
