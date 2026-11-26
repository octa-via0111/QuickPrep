import api from './api.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { categories as seedCategories } from '../data/seedData.js';
import { getCachedCategories, setCachedCategories } from '../utils/storage.js';

export const categoryService = {
  async getCategories() {
    // 1. Coba lewat backend API
    try {
      const res = await api.get('/categories');
      if (res && res.data && res.data.length > 0) {
        setCachedCategories(res.data);
        return res;
      }
    } catch (apiErr) {}

    // 2. Query langsung ke Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('categories').select('*').order('name');
        if (!error && Array.isArray(data) && data.length > 0) {
          setCachedCategories(data);
          return { success: true, count: data.length, data };
        }
      } catch (sbErr) {}
    }

    // 3. Fallback: Ambil dari cache lokal yang pernah diakses
    const cached = getCachedCategories();
    if (cached && cached.length > 0) {
      return { success: true, count: cached.length, data: cached, isOffline: true };
    }

    // 4. Fallback: Seed data
    return { success: true, count: seedCategories.length, data: seedCategories, isOffline: true };
  }
};

export default categoryService;
