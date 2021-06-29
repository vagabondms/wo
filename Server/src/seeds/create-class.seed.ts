import { Factory, Seeder } from 'typeorm-seeding';

import Category from '../entity/Category.entity';
import Exercise from '../entity/Exercise.entity';

export default class CreateCategory implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Category)()
      .map(async (category: Category) => {
        const exercises: Exercise[] = await factory(Exercise)().createMany(
          Math.floor(5 * Math.random()), // 0~5개 사이 랜덤으로 생성한다.
        );
        category.exercises = exercises;
        return category;
      })
      .createMany(4);
  }
}
