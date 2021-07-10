import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';

import Category from '@model/Category.entity';

import Program from '@model/Program.entity';
import Record from '@model/Record.entity';

@Entity()
export default class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 500, select: false })
  desc: string;

  @Column({ nullable: true, select: false })
  vid!: string;

  @Column({ nullable: true, select: false })
  img!: string;

  /* 
    associations 
  */
  @ManyToOne(() => Category, category => category.exercises)
  @JoinColumn({ name: 'cl1' })
  category!: Category;

  @ManyToMany(() => Program)
  @JoinTable({
    name: 'exercise_program',
  })
  programs!: Program[];

  @OneToMany(() => Record, record => record.exercise)
  records!: Record[];

  constructor(name: string, desc: string) {
    super();
    this.name = name;
    this.desc = desc;
  }
}
