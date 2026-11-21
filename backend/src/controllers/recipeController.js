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

export const createRecipe = async (req, res, next) => {
  try {
    const { name, estimated_cost } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Nama resep wajib diisi'
      });
    }

    const created = await recipeService.createRecipe(req.body);
    return res.status(201).json({
      success: true,
      message: 'Resep baru berhasil ditambahkan',
      data: created
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Parameter ID resep wajib disertakan'
      });
    }

    const updated = await recipeService.updateRecipe(id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Resep tidak ditemukan untuk diperbarui'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Resep berhasil diperbarui',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Parameter ID resep wajib disertakan'
      });
    }

    const success = await recipeService.deleteRecipe(id);
    if (!success) {
      return res.status(404).json({
        success: false,
        message: 'Resep tidak ditemukan untuk dihapus'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Resep berhasil dihapus'
    });
  } catch (error) {
    next(error);
  }
};
