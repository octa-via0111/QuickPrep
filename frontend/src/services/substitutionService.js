import api from './api.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { substitutions as seedSubstitutions } from '../data/seedData.js';

export const substitutionService = {
  async getSubstitutions(ingredient) {
    try {
      const params = ingredient ? { ingredient } : {};
      const res = await api.get('/substitutions', { params });
      if (res && res.data && res.data.length > 0) return res;
    } catch (apiErr) {}

    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('substitutions').select('*');
        if (ingredient) {
          query = query.ilike('original_ingredient', `%${ingredient}%`);
        }
        const { data, error } = await query;
        if (!error && Array.isArray(data) && data.length > 0) {
          return { success: true, count: data.length, data };
        }
      } catch (sbErr) {}
    }

    let results = seedSubstitutions;
    if (ingredient) {
      const q = ingredient.toLowerCase();
      results = seedSubstitutions.filter(s => s.original_ingredient.toLowerCase().includes(q));
    }
    return { success: true, count: results.length, data: results };
  }
};

export default substitutionService;
