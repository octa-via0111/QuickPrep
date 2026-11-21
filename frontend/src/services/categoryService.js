import api from './api.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { categories as seedCategories } from '../data/seedData.js';

export const categoryService = {
  async getCategories() {
    try {
      const res = await api.get('/categories');
      if (res && res.data && res.data.length > 0) return res;
    } catch (apiErr) {}

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('categories').select('*').order('name');
        if (!error && Array.isArray(data) && data.length > 0) {
          return { success: true, count: data.length, data };
        }
      } catch (sbErr) {}
    }

    return { success: true, count: seedCategories.length, data: seedCategories };
  }
};

export default categoryService;
