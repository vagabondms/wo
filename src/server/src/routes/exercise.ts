import express from 'express';

import { getExercises, getExercise } from '../controllers/exercise';

const router = express.Router();

router.get('/', getExercises); // 전체 운동리스트
router.get('/:exerciseId', getExercise); // 특정 운동리스트

export default router;
