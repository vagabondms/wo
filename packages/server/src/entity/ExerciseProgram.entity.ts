import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import Program from './Program.entity';
import Exercise from './Exercise.entity';

@Entity()
export default class ExerciseProgram extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  programId!: number;

  @Column()
  exerciseId!: number;

  @Column()
  order!: number;

  @ManyToOne(() => Exercise, exercise => exercise.program)
  exercise!: Exercise;

  @ManyToOne(() => Program, program => program.exercises)
  program!: Program;
}
