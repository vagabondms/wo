import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import Exercise from './Exercise.entity';
import User from './User.entity';
import Post from './Post.entity';

@Entity()
export default class Record extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  weight: number;

  @Column()
  reps: number;

  @CreateDateColumn()
  created_at!: Date;

  /* 
    associations 
  */
  @ManyToOne(() => User, user => user.records)
  user!: User;

  @ManyToOne(() => Post, post => post.records)
  post!: Post;

  @ManyToOne(() => Exercise, exercise => exercise.records)
  exercise!: Exercise;

  constructor(weight: number, reps: number) {
    super();
    this.weight = weight;
    this.reps = reps;
  }
}
