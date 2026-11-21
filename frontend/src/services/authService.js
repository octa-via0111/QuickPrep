import api from './api.js';

const AUTH_USER_KEY = 'quickprep_auth_user';
const ADMIN_TOKEN_KEY = 'quickprep_admin_token';

export const authService = {
  // Login Tersatu: Otomatis mendeteksi Administrator atau Pengguna
  unifiedLogin: async ({ name, identifier, password }) => {
    const response = await api.post('/auth/login', {
      name: name ? name.trim() : undefined,
      username: identifier.trim(),
      email: identifier.trim(),
      password
    });

    if (response?.data) {
      const userData = response.data;
      
      // Simpan data sesi
      sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));

      if (userData.role === 'admin' && userData.token) {
        sessionStorage.setItem(ADMIN_TOKEN_KEY, userData.token);
      } else {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      }

      // Sinkronkan nama ke profil lokal jika user
      if (userData.name) {
        try {
          const rawProfile = localStorage.getItem('quickprep_profile');
          const existingProfile = rawProfile ? JSON.parse(rawProfile) : {};
          localStorage.setItem('quickprep_profile', JSON.stringify({
            ...existingProfile,
            name: userData.name
          }));
        } catch (e) {}
      }

      window.dispatchEvent(new Event('auth-change'));
    }

    return response;
  },

  // Helper kompatibilitas
  loginAdmin: async (username, password) => {
    return authService.unifiedLogin({ identifier: username, password });
  },

  loginUser: async ({ name, email, password }) => {
    return authService.unifiedLogin({ name, identifier: email, password });
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
