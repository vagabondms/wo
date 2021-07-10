import express from 'express';

import exercise from './exercise.route';
import post from './post.route';
import program from './program.route';
import record from './record.route';
import user from './user.route';

const router = express.Router();

router.use('/exercise', exercise);
router.use('/post', post);
router.use('/program', program);
router.use('/record', record);
router.use('/user', user);

export default router;
