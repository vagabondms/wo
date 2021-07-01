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
import Category from './Category.entity';

import Program from './Program.entity';
import Record from './Record.entity';

@Entity()
export default class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column('varchar', { length: 500 })
  desc: string;

  @Column({ nullable: true })
  vid!: string;

  @Column({ nullable: true })
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

  @ManyToMany(() => Record, record => record.exercises)
  records!: Record[];

  constructor(name: string, desc: string) {
    super();
    this.name = name;
    this.desc = desc;
  }
}
