import api from './api.js';

export const recipeService = {
  /**
   * Mengambil daftar resep dengan berbagai filter
   */
  async getRecipes(params = {}) {
    const cleanParams = {};
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '' && params[key] !== null) {
        cleanParams[key] = params[key];
      }
    });
    return api.get('/recipes', { params: cleanParams });
  },

  /**
   * Mengambil detail satu resep berdasarkan ID
   */
  async getRecipeById(id) {
    return api.get(`/recipes/${id}`);
  },

  /**
   * Mengambil alternatif substitusi bahan khusus untuk resep tertentu
   */
  async getRecipeSubstitutions(id) {
    return api.get(`/recipes/${id}/substitutions`);
  },

  /**
   * Tambah resep baru (Admin)
   */
  async createRecipe(recipeData) {
    return api.post('/recipes', recipeData);
  },

  /**
   * Upload foto resep (Admin)
   */
  async uploadRecipeImage({ filename, base64Data }) {
    return api.post('/recipes/upload-image', { filename, base64Data });
  },

  /**
   * Update resep yang ada (Admin)
   */
  async updateRecipe(id, recipeData) {
    return api.put(`/recipes/${id}`, recipeData);
  },

  /**
   * Hapus resep (Admin)
   */
  async deleteRecipe(id) {
    return api.delete(`/recipes/${id}`);
  }
};

export default recipeService;
