import api from './api.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { 
  recipes as seedRecipes, 
  categories as seedCategories, 
  tools as seedTools, 
  substitutions as seedSubstitutions 
} from '../data/seedData.js';

// Normalisasi URL gambar Supabase jika user menyalin link dashboard
function normalizeImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  
  const dashboardRegex = /supabase\.com\/dashboard\/project\/([^\/]+)\/storage\/files\/buckets\/([^\/?#]+).*?[?&]preview=([^&]+)/i;
  const match = url.match(dashboardRegex);
  if (match) {
    const projectRef = match[1];
    const bucket = match[2];
    const fileName = decodeURIComponent(match[3]);
    return `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${encodeURIComponent(fileName)}`;
  }
  
  return url;
}

// Format item resep dari Supabase / DB ke format frontend
function formatRecipeItem(item) {
  if (!item) return null;

  const tools = Array.isArray(item.recipe_tools)
    ? item.recipe_tools.map(rt => rt.tool).filter(Boolean)
    : (Array.isArray(item.tools) 
        ? item.tools.map(t => typeof t === 'string' ? (seedTools.find(st => st.id === t) || { id: t, name: t }) : t) 
        : []);

  const ingredients = Array.isArray(item.recipe_ingredients)
    ? item.recipe_ingredients.map(ri => ({
        name: ri.ingredient?.name || 'Bahan Masakan',
        quantity: Number(ri.quantity) || 1,
        unit: ri.unit || '',
        is_optional: Boolean(ri.is_optional),
        notes: ri.notes || ''
      }))
    : (Array.isArray(item.ingredients) ? item.ingredients : []);

  // Hubungkan dengan substitusi bahan jika ada
  const relevantSubs = [];
  ingredients.forEach(ing => {
    const nameLower = (ing.name || '').toLowerCase();
    seedSubstitutions.forEach(sub => {
      if (nameLower.includes(sub.original_ingredient.toLowerCase()) || 
          sub.original_ingredient.toLowerCase().includes(nameLower.split(' ')[0])) {
        if (!relevantSubs.some(s => s.id === sub.id)) {
          relevantSubs.push(sub);
        }
      }
    });
  });

  return {
    ...item,
    name: item.name || item.title || 'Resep Masakan',
    title: item.name || item.title || 'Resep Masakan',
    image_url: normalizeImageUrl(item.image_url),
    category: item.category || seedCategories.find(c => c.id === item.category_id) || { id: item.category_id, name: item.category_id },
    tools,
    ingredients,
    instructions: Array.isArray(item.instructions) ? item.instructions : [],
    substitutions: relevantSubs
  };
}

export const recipeService = {
  /**
   * Mengambil daftar resep dengan berbagai filter
   * Mendukung koneksi API server lokal & otomatis fallback langsung ke Supabase Cloud
   */
  async getRecipes(params = {}) {
    const cleanParams = {};
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '' && params[key] !== null) {
        cleanParams[key] = params[key];
      }
    });

    const budgetLimit = cleanParams.maxBudget || cleanParams.max_budget;
    const cookingTimeLimit = cleanParams.maxCookingTime || cleanParams.max_cooking_time;
    const isKos = cleanParams.isKosFriendly !== undefined ? cleanParams.isKosFriendly : cleanParams.is_kos_friendly;
    const isPop = cleanParams.isPopular !== undefined ? cleanParams.isPopular : cleanParams.is_popular;
    const sortOrder = cleanParams.sort;

    // 1. Coba lewat API backend jika ada
    try {
      const response = await api.get('/recipes', { params: cleanParams });
      if (response && response.data) {
        let resultData = response.data;
        if (budgetLimit && Array.isArray(resultData)) {
          resultData = resultData.filter(r => (Number(r.estimated_cost) || 0) <= Number(budgetLimit));
        }
        return { ...response, data: resultData, count: resultData?.length };
      }
    } catch (apiErr) {
      // Backend offline atau 404 (misal saat dideploy di Vercel frontend)
      // Lanjutkan ke direct Supabase query di bawah
    }

    // 2. Query langsung ke Supabase Cloud
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('recipes').select(`
          *,
          category:categories(*),
          recipe_tools(tool:tools(*)),
          recipe_ingredients(
            quantity,
            unit,
            is_optional,
            notes,
            ingredient:ingredients(id, name)
          )
        `);

        if (cleanParams.category && cleanParams.category !== 'semua') {
          query = query.eq('category_id', cleanParams.category);
        }
        if (budgetLimit) {
          query = query.lte('estimated_cost', Number(budgetLimit));
        }
        if (cookingTimeLimit) {
          query = query.lte('cooking_time', Number(cookingTimeLimit));
        }
        if (cleanParams.difficulty && cleanParams.difficulty !== 'semua') {
          query = query.eq('difficulty', cleanParams.difficulty);
        }
        if (isPop === 'true' || isPop === true) {
          query = query.eq('is_popular', true);
        }
        if (isKos === 'true' || isKos === true) {
          query = query.eq('is_kos_friendly', true);
        }
        if (cleanParams.search) {
          query = query.ilike('name', `%${cleanParams.search}%`);
        }

        // Sorting
        if (sortOrder === 'cost_asc') {
          query = query.order('estimated_cost', { ascending: true });
        } else if (sortOrder === 'cost_desc') {
          query = query.order('estimated_cost', { ascending: false });
        } else if (sortOrder === 'time_asc') {
          query = query.order('cooking_time', { ascending: true });
        } else if (sortOrder === 'popular') {
          query = query.order('is_popular', { ascending: false });
        } else {
          query = query.order('created_at', { ascending: false });
        }

        const { data, error } = await query;
        if (!error && Array.isArray(data)) {
          let formatted = data.map(formatRecipeItem);

          // Filter tools jika ada
          if (cleanParams.tools) {
            const toolList = Array.isArray(cleanParams.tools) ? cleanParams.tools : cleanParams.tools.split(',');
            formatted = formatted.filter(r => {
              const recipeToolIds = (r.tools || []).map(t => t.id || t);
              return recipeToolIds.some(tid => toolList.includes(tid));
            });
          }

          // Safety filter: pastikan ketat tidak melebihi budgetLimit
          if (budgetLimit) {
            formatted = formatted.filter(r => (Number(r.estimated_cost) || 0) <= Number(budgetLimit));
          }

          return {
            success: true,
            count: formatted.length,
            data: formatted
          };
        }
      } catch (sbErr) {
        console.warn('[RecipeService] Direct Supabase query error:', sbErr);
      }
    }

    // 3. Fallback: Data lokal seedData jika offline
    let localData = seedRecipes.map(formatRecipeItem);
    if (cleanParams.category && cleanParams.category !== 'semua') {
      localData = localData.filter(r => r.category_id === cleanParams.category);
    }
    if (budgetLimit) {
      localData = localData.filter(r => (Number(r.estimated_cost) || 0) <= Number(budgetLimit));
    }
    if (cookingTimeLimit) {
      localData = localData.filter(r => (Number(r.cooking_time) || 0) <= Number(cookingTimeLimit));
    }
    if (cleanParams.search) {
      const q = cleanParams.search.toLowerCase();
      localData = localData.filter(r => (r.name || '').toLowerCase().includes(q));
    }
    if (sortOrder === 'cost_asc') {
      localData.sort((a, b) => (Number(a.estimated_cost) || 0) - (Number(b.estimated_cost) || 0));
    } else if (sortOrder === 'cost_desc') {
      localData.sort((a, b) => (Number(b.estimated_cost) || 0) - (Number(a.estimated_cost) || 0));
    }

    return {
      success: true,
      count: localData.length,
      data: localData,
      isOffline: true
    };
  },

  /**
   * Mengambil detail satu resep berdasarkan ID
   */
  async getRecipeById(id) {
    // 1. Coba lewat API backend
    try {
      const response = await api.get(`/recipes/${id}`);
      if (response && response.data) {
        return response;
      }
    } catch (apiErr) {}

    // 2. Query langsung ke Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('recipes')
          .select(`
            *,
            category:categories(*),
            recipe_tools(tool:tools(*)),
            recipe_ingredients(
              quantity,
              unit,
              is_optional,
              notes,
              ingredient:ingredients(id, name)
            )
          `)
          .eq('id', id)
          .single();

        if (!error && data) {
          return {
            success: true,
            data: formatRecipeItem(data)
          };
        }
      } catch (err) {}
    }

    // 3. Fallback: Cari di seedData
    const found = seedRecipes.find(r => r.id === id);
    if (found) {
      return {
        success: true,
        data: formatRecipeItem(found)
      };
    }

    throw new Error('Resep tidak ditemukan');
  },

  /**
   * Mengambil alternatif substitusi bahan khusus untuk resep tertentu
   */
  async getRecipeSubstitutions(id) {
    try {
      return await api.get(`/recipes/${id}/substitutions`);
    } catch (apiErr) {
      const recipeRes = await this.getRecipeById(id);
      return {
        success: true,
        data: recipeRes.data?.substitutions || []
      };
    }
  },

  /**
   * Tambah resep baru (Admin)
   */
  async createRecipe(recipeData) {
    try {
      return await api.post('/recipes', recipeData);
    } catch (apiErr) {
      if (isSupabaseConfigured && supabase) {
        const record = {
          id: `rec-${Date.now()}`,
          name: recipeData.name,
          slug: recipeData.slug || recipeData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          description: recipeData.description || '',
          image_url: normalizeImageUrl(recipeData.image_url),
          category_id: recipeData.category_id || 'utama',
          cooking_time: Number(recipeData.cooking_time) || 15,
          preparation_time: Number(recipeData.preparation_time) || 10,
          estimated_cost: Number(recipeData.estimated_cost) || 10000,
          cost_per_serving: Number(recipeData.cost_per_serving) || Number(recipeData.estimated_cost) || 10000,
          servings: Number(recipeData.servings) || 1,
          difficulty: recipeData.difficulty || 'Mudah',
          instructions: recipeData.instructions || [],
          tips: recipeData.tips || '',
          tags: recipeData.tags || [],
          is_popular: Boolean(recipeData.is_popular),
          is_kos_friendly: Boolean(recipeData.is_kos_friendly),
          source_url: recipeData.source_url || null,
          source_name: recipeData.source_name || null
        };

        const { data, error } = await supabase.from('recipes').insert([record]).select().single();
        if (error) throw error;
        return { success: true, message: 'Resep berhasil ditambahkan ke Supabase', data: formatRecipeItem(data) };
      }
      throw apiErr;
    }
  },

  /**
   * Upload foto resep (Admin)
   */
  async uploadRecipeImage({ filename, base64Data }) {
    try {
      return await api.post('/recipes/upload-image', { filename, base64Data });
    } catch (apiErr) {
      if (isSupabaseConfigured && supabase) {
        try {
          const ext = filename.split('.').pop() || 'jpg';
          const cleanName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
          
          // Konversi base64 ke Uint8Array untuk Supabase Storage
          const base64Clean = base64Data.replace(/^data:image\/\w+;base64,/, '');
          const byteCharacters = atob(base64Clean);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);

          const { error: uploadError } = await supabase.storage
            .from('recipe-images')
            .upload(cleanName, byteArray, {
              contentType: `image/${ext === 'png' ? 'png' : 'jpeg'}`,
              upsert: true
            });

          if (!uploadError) {
            const { data: publicData } = supabase.storage.from('recipe-images').getPublicUrl(cleanName);
            if (publicData?.publicUrl) {
              return {
                success: true,
                message: 'Foto berhasil diunggah ke Supabase Storage',
                data: { imageUrl: publicData.publicUrl }
              };
            }
          }
        } catch (stErr) {
          console.warn('[Storage] Upload direct Supabase error:', stErr);
        }
      }

      // Fallback: Gunakan Data URL base64 langsung
      return {
        success: true,
        message: 'Foto disimpan sebagai data URL',
        data: { imageUrl: base64Data }
      };
    }
  },

  /**
   * Update resep yang ada (Admin)
   */
  async updateRecipe(id, recipeData) {
    try {
      return await api.put(`/recipes/${id}`, recipeData);
    } catch (apiErr) {
      if (isSupabaseConfigured && supabase) {
        const cost = Number(recipeData.estimated_cost) || 10000;
        const srv = Number(recipeData.servings) || 1;
        const updates = {
          name: recipeData.name,
          description: recipeData.description,
          image_url: normalizeImageUrl(recipeData.image_url),
          category_id: recipeData.category_id,
          cooking_time: Number(recipeData.cooking_time),
          preparation_time: Number(recipeData.preparation_time),
          estimated_cost: cost,
          cost_per_serving: Math.round(cost / srv),
          servings: srv,
          difficulty: recipeData.difficulty,
          instructions: Array.isArray(recipeData.instructions) ? recipeData.instructions : [],
          tips: recipeData.tips,
          is_popular: Boolean(recipeData.is_popular),
          is_kos_friendly: Boolean(recipeData.is_kos_friendly),
          source_url: recipeData.source_url ? recipeData.source_url.trim() : null,
          source_name: recipeData.source_name ? recipeData.source_name.trim() : null
        };

        const { data, error } = await supabase
          .from('recipes')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return { success: true, message: 'Resep berhasil diperbarui di Supabase', data: formatRecipeItem(data) };
      }
      throw apiErr;
    }
  },

  /**
   * Hapus resep (Admin)
   */
  async deleteRecipe(id) {
    try {
      return await api.delete(`/recipes/${id}`);
    } catch (apiErr) {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('recipes').delete().eq('id', id);
        if (error) throw error;
        return { success: true, message: 'Resep berhasil dihapus dari Supabase' };
      }
      throw apiErr;
    }
  }
};

export default recipeService;
