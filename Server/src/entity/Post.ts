import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import PostImage from './PostImage';
import Record from './Record';
import User from './User';

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at!: Date;

  /* 
    associations 
  */
  @OneToMany(() => PostImage, postImages => postImages.post)
  postImages!: PostImage[];

  @OneToMany(() => Record, record => record.post)
  records!: Record[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'like',
  })
  users!: User[];

  constructor(c: string) {
    super();
    this.content = c;
  }
}
