import express from 'express';

import {
  createProgram,
  deleteProgram,
  getProgram,
  shareProgram,
  unshareProgram,
  changeNameProgram,
  scrapProgram,
} from '../controllers/program.controller';

const router = express.Router();

router.get('/', getProgram);
router.post('/create', createProgram);
router.delete('/:programId', deleteProgram);
router.patch('/share/:programId', shareProgram);
router.patch('/unshare/:programId', unshareProgram);
router.put('/scrap/:programId', scrapProgram);
router.patch('/:programId', changeNameProgram);

export default router;
