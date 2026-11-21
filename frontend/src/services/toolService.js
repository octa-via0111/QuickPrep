import api from './api.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { tools as seedTools } from '../data/seedData.js';

export const toolService = {
  async getTools() {
    try {
      const res = await api.get('/tools');
      if (res && res.data && res.data.length > 0) return res;
    } catch (apiErr) {}

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('tools').select('*').order('name');
        if (!error && Array.isArray(data) && data.length > 0) {
          return { success: true, count: data.length, data };
        }
      } catch (sbErr) {}
    }

    return { success: true, count: seedTools.length, data: seedTools };
  }
};

export default toolService;
