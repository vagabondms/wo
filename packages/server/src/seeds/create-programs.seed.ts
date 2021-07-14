import { Factory, Seeder } from 'typeorm-seeding';

import Program from '../entity/Program.entity';

import User from '../entity/User.entity';

export default class CreatePrograms implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Program)()
      .map(async (program: Program): Promise<Program> => {
        const user = await factory(User)().create();

        program.owner = user;
        program.scrapedBy = user;
        program.isShared = false;
        return program;
      })
      .createMany(2);
  }
}
