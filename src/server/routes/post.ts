import express from 'express';

import { getPosts, getPost, createPost } from '../controllers/post';

const router = express.Router();

router.post('/', getPosts);
router.get('/:id', getPost);
router.post('/create', createPost);

export default router;
