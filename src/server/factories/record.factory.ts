import Faker from 'faker';
import { define } from 'typeorm-seeding';

import Record from '../entity/Record.entity';

define(Record, (faker: typeof Faker) => {
  const record = new Record(faker.random.number(12), faker.random.number(100));
  return record;
});
