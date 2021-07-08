import express from 'express';
import { getRecord, createRecord, deleteRecord } from '../controllers/record';

const router = express.Router();

router.get('/:exerciseId', getRecord);
router.post('/', createRecord);
router.delete('/:recordId', deleteRecord);

export default router;
