import express from 'express';

import { getPosts, getPost } from '../controllers/post';

const router = express.Router();

router.post('/', getPosts);
router.get('/:id', getPost);

export default router;
