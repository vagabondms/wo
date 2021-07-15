import Faker from 'faker';
import { define } from 'typeorm-seeding';

import Category from '../entity/Category.entity';

define(Category, (faker: typeof Faker) => {
  const category = new Category();
  category.category = faker.commerce.product();
  return category;
});
