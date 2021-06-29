import Faker from 'faker';
import { define } from 'typeorm-seeding';
import Exercise from '../entity/Exercise.entity';

define(Exercise, (faker: typeof Faker) => {
  const exercise = new Exercise(faker.name.firstName(), faker.lorem.lines());
  return exercise;
});
