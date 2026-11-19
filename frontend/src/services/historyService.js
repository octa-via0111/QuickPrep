import api from './api.js';

export const historyService = {
  async getHistory() {
    return api.get('/cooking-history');
  },

  async createHistory(historyData) {
    return api.post('/cooking-history', historyData);
  }
};

export default historyService;
