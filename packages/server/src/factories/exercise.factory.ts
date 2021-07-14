import Faker from 'faker';
import { define } from 'typeorm-seeding';

import Exercise from '../entity/Exercise.entity';

define(Exercise, (faker: typeof Faker) => {
  const exercise = new Exercise();
  exercise.name = faker.name.firstName();
  exercise.desc = faker.lorem.lines();
  return exercise;
});
