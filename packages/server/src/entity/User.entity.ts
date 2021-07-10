import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Post from '@model/Post.entity';
import Program from '@model/Program.entity';
import Record from '@model/Record.entity';
import Program_User from './ProgramUser.entity';

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
  ownPrograms!: Program[];

  @OneToMany(() => Program_User, program_user => program_user.program)
  scrapedPrograms!: Program_User;

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
