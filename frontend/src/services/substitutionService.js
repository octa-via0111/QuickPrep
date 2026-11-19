import api from './api.js';

export const substitutionService = {
  async getSubstitutions(ingredient) {
    const params = ingredient ? { ingredient } : {};
    return api.get('/substitutions', { params });
  }
};

export default substitutionService;
