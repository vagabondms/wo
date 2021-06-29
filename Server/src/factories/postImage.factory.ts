import Faker from 'faker';
import { define } from 'typeorm-seeding';
import PostImage from '../entity/PostImage.entity';

define(PostImage, (faker: typeof Faker) => {
  const postImage = new PostImage(faker.internet.url());
  return postImage;
});
