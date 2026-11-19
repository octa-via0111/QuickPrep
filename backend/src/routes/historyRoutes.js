import { Router } from 'express';
import { createCookingHistory, getCookingHistory } from '../controllers/historyController.js';

const router = Router();
router.get('/', getCookingHistory);
router.post('/', createCookingHistory);

export default router;
