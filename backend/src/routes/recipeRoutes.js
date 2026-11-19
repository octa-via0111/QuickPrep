import { Router } from 'express';
import { getAllRecipes, getRecipeById, getRecipeSubstitutions } from '../controllers/recipeController.js';
import { validateRecipeQuery } from '../middleware/validator.js';

const router = Router();

router.get('/', validateRecipeQuery, getAllRecipes);
router.get('/:id', getRecipeById);
router.get('/:id/substitutions', getRecipeSubstitutions);

export default router;
