import Faker from 'faker';
import { define } from 'typeorm-seeding';

import User from '../entity/User.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  user.nickname = faker.name.findName();
  return user;
});
