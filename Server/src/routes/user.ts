import express from 'express';
import { getUser } from '../controllers/users';
const router = express.Router();

router.get('/', getUser);

export default router;
