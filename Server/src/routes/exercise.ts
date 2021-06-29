import express from 'express';

import { getExercise } from '../controllers/exercise';

const router = express.Router();

router.get('/', getExercise);

export default router;
