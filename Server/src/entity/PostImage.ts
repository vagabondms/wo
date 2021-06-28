import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import Post from './Post';

@Entity()
export default class PostImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  src: string;

  @ManyToOne(() => Post, post => post.postImages)
  post!: Post;

  constructor(s: string) {
    super();
    this.src = s;
  }
}
