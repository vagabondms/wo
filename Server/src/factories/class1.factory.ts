import Faker from 'faker';
import { define } from 'typeorm-seeding';
import Class1 from '../entity/Class1.entity';

define(Class1, (faker: typeof Faker) => {
  const class1 = new Class1(faker.commerce.product());
  return class1;
});
