import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Exercise from './Exercise.entity';

@Entity()
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category!: string;

  /* 
    associations 
  */
  @OneToMany(() => Exercise, exercise => exercise.category)
  exercises!: Exercise[];
}
