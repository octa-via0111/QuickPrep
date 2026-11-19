import { Router } from 'express';
import { getAllTools } from '../controllers/toolController.js';

const router = Router();
router.get('/', getAllTools);

export default router;
