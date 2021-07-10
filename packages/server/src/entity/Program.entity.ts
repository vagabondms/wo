import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';

import Exercise from '@model/Exercise.entity';
import User from '@model/User.entity';
import Program_User from '@model/ProgramUser.entity';

@Entity()
export default class Program extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  // @Column()
  // name: string;

  // @Column()
  // isShared: boolean;

  /* 
    associations 
  */

  @ManyToOne(() => User, user => user.ownPrograms)
  @JoinColumn()
  owner!: User;

  @OneToMany(() => Program_User, program_user => program_user.program)
  programDetails!: Program_User;

  @ManyToMany(() => Exercise)
  @JoinTable({
    name: 'exercise_program',
  })
  exercises!: Exercise[];
}
