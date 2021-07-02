import express from 'express';

import { getProgram } from '../controllers/program';

const router = express.Router();

router.get('/', getProgram);

export default router;
