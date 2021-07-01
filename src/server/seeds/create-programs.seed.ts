import { Factory, Seeder } from 'typeorm-seeding';

import Program from '../entity/Program.entity';
import Exercise from '../entity/Exercise.entity';
import User from '../entity/User.entity';

export default class CreatePrograms implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Program)()
      .map(async (program: Program): Promise<Program> => {
        const user = await factory(User)().create();
        const users = await factory(User)().createMany(2);
        const exercises = await factory(Exercise)().createMany(2);
        program.owner = user;
        program.users = users;
        program.exercises = exercises;

        return program;
      })
      .createMany(2);
  }
}
