import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import Post from './Post.entity';

@Entity()
export default class PostImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  src!: string;

  /* 
    associations 
  */
  @ManyToOne(() => Post, post => post.postImages)
  post!: Post;
}
