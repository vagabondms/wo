import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Program from './Program.entity';
import User from './User.entity';

@Entity({ name: 'program_user' })
export default class Program_User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, user => user.scrapedPrograms)
  @JoinColumn()
  user!: number;

  @ManyToOne(() => Program, program => program.programDetails)
  @JoinColumn()
  program!: number;

  @Column({ nullable: true })
  name!: string;

  @Column({ default: false })
  isShared!: boolean;
}
