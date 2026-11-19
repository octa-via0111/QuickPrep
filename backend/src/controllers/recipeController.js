import { recipeService, substitutionService } from '../services/supabaseService.js';

export const getAllRecipes = async (req, res, next) => {
  try {
    const { search, category, maxBudget, tool, maxCookingTime, difficulty, sort, isKosFriendly } = req.query;
    
    const recipes = await recipeService.getAllRecipes({
      search,
      category,
      maxBudget,
      tool,
      maxCookingTime,
      difficulty,
      sort,
      isKosFriendly
    });

    return res.status(200).json({
      success: true,
      message: 'Data resep berhasil diambil',
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Parameter ID resep wajib disertakan'
      });
    }

    const recipe = await recipeService.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Resep tidak ditemukan'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Detail resep berhasil diambil',
      data: recipe
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipeSubstitutions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const substitutions = await substitutionService.getSubstitutionsForRecipe(id);

    return res.status(200).json({
      success: true,
      message: 'Substitusi bahan resep berhasil diambil',
      count: substitutions.length,
      data: substitutions
    });
  } catch (error) {
    next(error);
  }
};
