import api from './api.js';

export const toolService = {
  async getTools() {
    return api.get('/tools');
  }
};

export default toolService;
