import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import Exercise from './Exercise';
import User from './User';
import Post from './Post';

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

  @ManyToOne(() => User, user => user.records)
  user: User;

  @ManyToOne(() => Post, post => post.records)
  post!: Post;

  @ManyToOne(() => Exercise, exercise => exercise.records)
  exercise!: Exercise;

  constructor(w: number, r: number, u: User) {
    super();
    this.weight = w;
    this.reps = r;
    this.user = u;
  }
}
