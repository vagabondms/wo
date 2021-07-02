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
router.get('/:id', getPost);
router.post('/create', createPost);
router.delete('/delete', deletePost);
router.put('/like', likePost);
router.put('/unlike', unlikePost);
export default router;
