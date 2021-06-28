import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import Program from './Program';
import Record from './Record';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  /* 
    associations 
  */
  @OneToMany(() => Record, record => record.user)
  records!: Record[];

  @OneToMany(() => Program, program => program.owner)
  programs!: Program[];

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

  constructor(a: string, b: string, c: string) {
    super();
    this.email = a;
    this.password = b;
    this.nickname = c;
  }
}
