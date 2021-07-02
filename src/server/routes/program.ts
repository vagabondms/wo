import express from 'express';

import { createProgram, getProgram } from '../controllers/program';

const router = express.Router();

router.get('/', getProgram);
router.post('/create', createProgram);

export default router;
