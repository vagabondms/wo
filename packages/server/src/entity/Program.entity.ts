import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';

import ExerciseProgram from './ExerciseProgram.entity';
import User from './User.entity';

@Entity()
export default class Program extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  isShared!: boolean;

  @Column()
  name!: string;

  @ManyToOne(() => User, user => user.ownPrograms)
  @JoinColumn()
  owner!: User;

  @ManyToOne(() => User, user => user.scrapedPrograms)
  scrapedBy!: User;

  @OneToMany(() => ExerciseProgram, exerciseProgram => exerciseProgram.program)
  exercises!: ExerciseProgram;
}
