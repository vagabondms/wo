import Faker from 'faker';
import { define } from 'typeorm-seeding';

import Post from '../entity/Post.entity';

define(Post, (faker: typeof Faker) => {
  const post = new Post();
  post.content = faker.lorem.paragraph();
  return post;
});
