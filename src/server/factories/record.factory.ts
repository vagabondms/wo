import Faker from 'faker';
import { define } from 'typeorm-seeding';

import Record from '../entity/Record.entity';

define(Record, (faker: typeof Faker) => {
  const record = new Record(faker.datatype.number(12), faker.datatype.number(100));
  return record;
});
