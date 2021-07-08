import { Factory, Seeder } from 'typeorm-seeding';

import Record from '../entity/Record.entity';
import User from '../entity/User.entity';
import Post from '../entity/Post.entity';

export default class CreateRecord implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Record)()
      .map(async (record: Record): Promise<Record> => {
        const user = await factory(User)().create();
        const post = await factory(Post)().create();
        record.user = user;
        record.post = post;
        return record;
      })
      .createMany(2);
  }
}
