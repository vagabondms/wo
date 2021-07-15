import Faker from 'faker';
import { define } from 'typeorm-seeding';

import Record from '../entity/Record.entity';

define(Record, (faker: typeof Faker) => {
  const record = new Record();
  record.weight = faker.random.number(100);
  record.reps = faker.random.number(12);
  return record;
});
