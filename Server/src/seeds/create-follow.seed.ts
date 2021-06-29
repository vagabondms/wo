import { Factory, Seeder } from 'typeorm-seeding';

import User from '../entity/User.entity';

export default class CreateFollow implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)()
      .map(async (user: User) => {
        const users: User[] = await factory(User)()
          // upper User의 user 카테고리를 달았는데, 그 달리는 user의 users에도 user를 단 것
          .map(async (user: User) => {
            const users: User[] = await factory(User)().createMany(2);
            user.users = users;
            return user;
          })
          .createMany(2);
        user.users = users;
        return user;
      })
      .createMany(2);
  }
}
