import { Factory, Seeder } from 'typeorm-seeding';

import Post from '../entity/Post.entity';
import User from '../entity/User.entity';
import PostImage from '../entity/PostImage.entity';

export default class CreatePost implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Post)()
      .map(async (post: Post) => {
        const postImages = await factory(PostImage)().createMany(2);

        const writer = await factory(User)()
          .map(async (user: User) => {
            const posts = await factory(Post)().createMany(2);
            user.posts = posts;
            return user;
          })
          .create();
        const users = await factory(User)()
          .map(async (user: User) => {
            const posts = await factory(Post)().createMany(2);
            user.likes = posts;
            return user;
          })
          .createMany(2);

        post.postImages = postImages;
        post.writer = writer;
        post.likers = users;

        return post;
      })
      .createMany(4);
  }
}
