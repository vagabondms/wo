import Faker from 'faker';
import { define } from 'typeorm-seeding';

import User from '../entity/User.entity';

define(User, (faker: typeof Faker) => {
  const user = new User(faker.internet.email(), faker.internet.password(), faker.name.findName());
  return user;
});
