import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Category from './Category.entity';
import Record from './Record.entity';
import ExerciseProgram from './ExerciseProgram.entity';

@Entity()
export default class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'varchar', length: 500, select: false })
  desc!: string;

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

  @OneToMany(() => Record, record => record.exercise)
  records!: Record[];

  @OneToMany(() => ExerciseProgram, exerciseProgram => exerciseProgram.exercise)
  program!: ExerciseProgram;
}
