import api from './api.js';

const TOKEN_KEY = 'quickprep_admin_token';
const USER_KEY = 'quickprep_admin_user';

export const authService = {
  // Login dengan username & password
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      if (response?.data?.token) {
        sessionStorage.setItem(TOKEN_KEY, response.data.token);
        sessionStorage.setItem(USER_KEY, JSON.stringify(response.data.user || { username, role: 'Administrator' }));
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Cek apakah admin sedang login
  isAuthenticated: () => {
    return Boolean(sessionStorage.getItem(TOKEN_KEY));
  },

  // Ambil token saat ini
  getToken: () => {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  // Ambil profil admin yang tersimpan
  getUser: () => {
    try {
      const stored = sessionStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  },

  // Keluar / Logout
  logout: () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  }
};

export default authService;
