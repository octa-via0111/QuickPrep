import { Router } from 'express';
import { getAllSubstitutions } from '../controllers/substitutionController.js';

const router = Router();
router.get('/', getAllSubstitutions);

export default router;
