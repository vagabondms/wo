import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import PostImage from './PostImage.entity';
import Record from './Record.entity';
import User from './User.entity';

@Entity()
export default class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 500, select: false })
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

  @ManyToOne(() => User, user => user.posts)
  writer!: User;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'like',
  })
  likers!: User[];

  constructor(content: string) {
    super();
    this.content = content;
  }
}
