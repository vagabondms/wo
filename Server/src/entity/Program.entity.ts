import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import Exercise from './Exercise.entity';
import User from './User.entity';

@Entity()
export default class Program extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  isShared: boolean;

  /* 
    associations 
  */
  @ManyToOne(() => User, user => user.programs)
  @JoinColumn()
  owner!: User;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'program_user',
  })
  users!: User[];

  @ManyToMany(() => Exercise)
  @JoinTable({
    name: 'exercise_program',
  })
  exercises!: Exercise[];

  constructor(name: string, isShared: boolean) {
    super();
    this.name = name;
    this.isShared = isShared;
  }
}
