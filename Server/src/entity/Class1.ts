import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Exercise from './Exercise';

@Entity()
export default class Class1 extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category: string;

  @OneToMany(() => Exercise, exercise => exercise.class1)
  exercises!: Exercise[];

  constructor(c: string) {
    super();
    this.category = c;
  }
}
