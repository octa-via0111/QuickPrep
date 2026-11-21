import api from './api.js';

const AUTH_USER_KEY = 'quickprep_auth_user';
const ADMIN_TOKEN_KEY = 'quickprep_admin_token';

export const authService = {
  // Login sebagai Administrator
  loginAdmin: async (username, password) => {
    const response = await api.post('/auth/admin/login', { username, password });
    if (response?.data?.token) {
      const userData = {
        role: 'admin',
        username: response.data.username || username,
        name: 'Administrator',
        token: response.data.token
      };
      sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
      sessionStorage.setItem(ADMIN_TOKEN_KEY, response.data.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
      window.dispatchEvent(new Event('auth-change'));
    }
    return response;
  },

  // Login / Registrasi sebagai Pengguna Reguler (Nama, Email, Sandi)
  loginUser: async ({ name, email, password }) => {
    const response = await api.post('/auth/user/login', { name, email, password });
    if (response?.data) {
      const userData = {
        role: 'user',
        name: response.data.name || name,
        email: response.data.email || email,
        token: response.data.token
      };
      sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));

      // Sinkronkan nama ke profil pengguna di localStorage agar terhubung ke ProfilPage
      try {
        const rawProfile = localStorage.getItem('quickprep_profile');
        const existingProfile = rawProfile ? JSON.parse(rawProfile) : {};
        localStorage.setItem('quickprep_profile', JSON.stringify({
          ...existingProfile,
          name: userData.name
        }));
      } catch (e) {}

      window.dispatchEvent(new Event('auth-change'));
    }
    return response;
  },

  // Dapatkan profil user yang sedang aktif
  getUser: () => {
    try {
      const stored = sessionStorage.getItem(AUTH_USER_KEY) || localStorage.getItem(AUTH_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  },

  // Cek autentikasi & peran
  isAuthenticated: () => {
    return Boolean(authService.getUser());
  },

  isAdmin: () => {
    const user = authService.getUser();
    return user?.role === 'admin';
  },

  isUser: () => {
    const user = authService.getUser();
    return user?.role === 'user';
  },

  getToken: () => {
    const user = authService.getUser();
    return user?.token || sessionStorage.getItem(ADMIN_TOKEN_KEY);
  },

  // Logout / Keluar
  logout: () => {
    sessionStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    window.dispatchEvent(new Event('auth-change'));
  }
};

export default authService;
