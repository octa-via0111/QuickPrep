import api from './api.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { tools as seedTools } from '../data/seedData.js';
import { getCachedTools, setCachedTools } from '../utils/storage.js';

export const toolService = {
  async getTools() {
    // 1. Coba lewat backend API
    try {
      const res = await api.get('/tools');
      if (res && res.data && res.data.length > 0) {
        setCachedTools(res.data);
        return res;
      }
    } catch (apiErr) {}

    // 2. Query langsung ke Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('tools').select('*').order('name');
        if (!error && Array.isArray(data) && data.length > 0) {
          setCachedTools(data);
          return { success: true, count: data.length, data };
        }
      } catch (sbErr) {}
    }

    // 3. Fallback: Ambil dari cache lokal yang pernah diakses
    const cached = getCachedTools();
    if (cached && cached.length > 0) {
      return { success: true, count: cached.length, data: cached, isOffline: true };
    }

    // 4. Fallback: Seed data
    return { success: true, count: seedTools.length, data: seedTools, isOffline: true };
  }
};

export default toolService;
