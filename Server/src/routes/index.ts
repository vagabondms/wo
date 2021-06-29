import express from 'express';

import exercise from './exercise';
import post from './post';
import program from './program';
import record from './record';
import user from './user';

const router = express.Router();

router.use('/exercise', exercise);
router.use('/post', post);
router.use('/program', program);
router.use('/record', record);
router.use('/user', user);

export default router;
