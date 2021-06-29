import { Factory, Seeder } from 'typeorm-seeding';

import Category from '../entity/Category.entity';

import Exercise from '../entity/Exercise.entity';

export default class CreateExercises implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Exercise)()
      .map(async (exercise: Exercise) => {
        const category: Category = await factory(Category)().create(); // class 생성
        exercise.category = category;
        return exercise;
      })
      .createMany(3);
  }
}
