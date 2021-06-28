import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Exercise from './Exercise';

@Entity()
export default class Class2 extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category: string;

  /* 
    associations 
  */
  @OneToMany(() => Exercise, exercise => exercise.class2)
  exercises!: Exercise[];

  constructor(c: string) {
    super();
    this.category = c;
  }
}
