import Faker from 'faker';
import { define } from 'typeorm-seeding';
import Class2 from '../entity/Class2.entity';

define(Class2, (faker: typeof Faker) => {
  const class2 = new Class2(faker.commerce.product());
  return class2;
});
