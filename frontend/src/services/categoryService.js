import api from './api.js';

export const categoryService = {
  async getCategories() {
    return api.get('/categories');
  }
};

export default categoryService;
