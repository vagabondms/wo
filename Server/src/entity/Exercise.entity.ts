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
import Class1 from './Class1.entity';
import Class2 from './Class2.entity';
import Program from './Program.entity';
import Record from './Record.entity';

@Entity()
export default class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @Column({ nullable: true })
  vid!: string;

  @Column({ nullable: true })
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

  constructor(name: string, desc: string) {
    super();
    this.name = name;
    this.desc = desc;
  }
}
