import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import User from './User';

@Entity()
export default class Program extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  isShared: boolean;

  @ManyToOne(() => User, user => user.programs)
  @JoinColumn()
  owner: User;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'program_user',
  })
  users!: User[];

  constructor(n: string, i: boolean, o: User) {
    super();
    this.name = n;
    this.isShared = i;
    this.owner = o;
  }
}
