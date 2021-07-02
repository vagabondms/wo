import express from 'express';

import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
} from '../controllers/post';

const router = express.Router();

router.post('/', getPosts);
router.get('/:postId', getPost);
router.post('/create', createPost);
router.delete('/delete/:postId', deletePost);

//TODO: passport나 session을 이용하게 되면 아래 두개는 uri param으로 받을 수 있다.
//TODO: 예를들어 /like/:id
router.put('/like', likePost);
router.put('/unlike', unlikePost);

export default router;
