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
import Class1 from './Class1';
import Class2 from './Class2';
import Program from './Program';
import Record from './Record';

@Entity()
export default class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column()
  vid!: string;

  @Column()
  img!: string;

  /* 
    associations 
  */
  @ManyToOne(() => Class1, class1 => class1.exercises)
  @JoinColumn({ name: 'cl1' })
  class1!: Class1;

  @ManyToOne(() => Class2, class2 => class2.exercises)
  @JoinColumn({ name: 'cl2' })
  class2!: Class2;

  @ManyToMany(() => Program)
  @JoinTable({
    name: 'exercise_program',
  })
  programs!: Program[];

  @OneToMany(() => Record, record => record.exercise)
  records!: Record[];

  constructor(n: string, d: string) {
    super();
    this.name = n;
    this.desc = d;
  }
}
