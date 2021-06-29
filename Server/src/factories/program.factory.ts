import Faker from 'faker';
import { define } from 'typeorm-seeding';
import Program from '../entity/Program.entity';

define(Program, (faker: typeof Faker) => {
  const program = new Program(faker.name.lastName(), faker.datatype.boolean());
  return program;
});
