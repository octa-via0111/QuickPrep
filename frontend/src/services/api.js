import axios from 'axios';

// Gunakan environment variable VITE_API_URL jika di-deploy, atau fallback ke proxy /api
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Request interceptor to automatically attach admin bearer token if available
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('quickprep_admin_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error extraction
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let errorMessage = 'Gagal terhubung ke server QuickPrep';
    
    if (error.response) {
      // Server merespon dengan status code di luar 2xx
      errorMessage = error.response.data?.message || `Error ${error.response.status}: Terjadi kesalahan pada server`;
    } else if (error.request) {
      // Request terkirim namun tidak ada respon (misal server mati atau offline)
      errorMessage = 'Tidak dapat menghubungi server. Periksa koneksi internet atau status backend.';
    } else {
      errorMessage = error.message;
    }

    const enhancedError = new Error(errorMessage);
    enhancedError.originalError = error;
    enhancedError.isNetworkError = !error.response;
    return Promise.reject(enhancedError);
  }
);

export default api;
