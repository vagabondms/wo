import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Post from './Post.entity';
import Program from './Program.entity';
import Record from './Record.entity';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ select: false })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  nickname: string;

  /* 
    associations 
  */
  @OneToMany(() => Record, record => record.user)
  records!: Record[];

  @OneToMany(() => Post, post => post.writer)
  posts!: Post[];

  @OneToMany(() => Program, program => program.owner)
  programs!: Program[];

  @ManyToMany(() => Post)
  @JoinTable({
    name: 'like',
  })
  likes!: Post[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'follow',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'followerId',
      referencedColumnName: 'id',
    },
  })
  users!: User[];

  constructor(email: string, password: string, nickname: string) {
    super();
    this.email = email;
    this.password = password;
    this.nickname = nickname;
  }
}
