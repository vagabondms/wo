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
import PostImage from './PostImage.entity';
import Record from './Record.entity';
import User from './User.entity';

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

  constructor(content: string) {
    super();
    this.content = content;
  }
}
