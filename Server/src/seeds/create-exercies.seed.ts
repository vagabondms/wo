import { Factory, Seeder } from 'typeorm-seeding';

import Exercise from '../entity/Exercise.entity';

export default class CreateExercises implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Exercise)().createMany(2);
  }
}
