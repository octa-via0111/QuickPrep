import { Router } from 'express';
import { 
  getAllRecipes, 
  getRecipeById, 
  getRecipeSubstitutions,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from '../controllers/recipeController.js';
import { validateRecipeQuery } from '../middleware/validator.js';

const router = Router();

router.get('/', validateRecipeQuery, getAllRecipes);
router.get('/:id', getRecipeById);
router.get('/:id/substitutions', getRecipeSubstitutions);

// Admin / CRUD Routes
router.post('/', createRecipe);
router.put('/:id', updateRecipe);
router.delete('/:id', deleteRecipe);

export default router;
