import express from 'express';

import { createProgram, deleteProgram, getProgram } from '../controllers/program';

const router = express.Router();

router.get('/', getProgram);
router.post('/create', createProgram);
router.delete('/:programId', deleteProgram);
export default router;
