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
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', validateRecipeQuery, getAllRecipes);
router.get('/:id', getRecipeById);
router.get('/:id/substitutions', getRecipeSubstitutions);

// Admin Protected Routes (Hanya Administrator Resmi yang Berhasil Login)
router.post('/', requireAdminAuth, createRecipe);
router.put('/:id', requireAdminAuth, updateRecipe);
router.delete('/:id', requireAdminAuth, deleteRecipe);

export default router;
