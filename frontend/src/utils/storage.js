// Storage Keys
const FAVORITES_KEY = 'quickprep_favorites';
const PROFILE_KEY = 'quickprep_profile';
const HISTORY_KEY = 'quickprep_cooking_history';
const CACHE_RECIPES_KEY = 'quickprep_cached_recipes';
const CACHE_CATEGORIES_KEY = 'quickprep_cached_categories';
const CACHE_TOOLS_KEY = 'quickprep_cached_tools';
const SETTINGS_KEY = 'quickprep_settings';

// Default Profile
export const DEFAULT_PROFILE = {
  name: 'Anak Kos Hebat',
  email: '',
  avatarColor: '#E0623A',
  avatarUrl: '',
  defaultBudget: 15000,
  ownedTools: ['rice-cooker', 'wajan', 'teflon', 'kompor'],
  voiceSpeed: 1.0,
  dietaryPreference: 'Semua Makanan'
};

/**
 * Favorites Operations
 */
export const getStoredFavorites = () => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading favorites from localStorage', e);
    return [];
  }
};

export const saveFavorites = (favoriteIds) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
  } catch (e) {
    console.error('Error saving favorites to localStorage', e);
  }
};

export const toggleFavoriteStorage = (recipeId) => {
  const current = getStoredFavorites();
  let updated;
  if (current.includes(recipeId)) {
    updated = current.filter(id => id !== recipeId);
  } else {
    updated = [...current, recipeId];
  }
  saveFavorites(updated);
  return updated;
};

/**
 * User Profile Operations
 */
export const getStoredProfile = () => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
  } catch (e) {
    return DEFAULT_PROFILE;
  }
};

export const saveStoredProfile = (profile) => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Error saving profile', e);
  }
};

/**
 * Cooking History Operations
 */
export const getStoredHistory = () => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const addStoredHistory = (historyItem) => {
  try {
    const current = getStoredHistory();
    const updated = [
      {
        id: Date.now(),
        cooked_at: new Date().toISOString(),
        ...historyItem
      },
      ...current
    ];
    // Keep max 50 items
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated.slice(0, 50)));
    return updated;
  } catch (e) {
    console.error('Error adding history', e);
    return getStoredHistory();
  }
};

/**
 * Recipe Offline Cache Store (Penyimpanan Cache Data Offline)
 * Memastikan resep yang pernah diakses tetap bisa dibuka secara offline
 */
export const getCachedRecipes = () => {
  try {
    const raw = localStorage.getItem(CACHE_RECIPES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const setCachedRecipes = (recipes) => {
  try {
    if (Array.isArray(recipes) && recipes.length > 0) {
      localStorage.setItem(CACHE_RECIPES_KEY, JSON.stringify(recipes));
    }
  } catch (e) {
    console.warn('LocalStorage quota or write error for cache', e);
  }
};

/**
 * Simpan atau perbarui satu resep lengkap (termasuk bahan dan langkah) ke cache
 */
export const saveOrUpdateCachedRecipe = (recipe) => {
  if (!recipe || !recipe.id) return;
  try {
    const cached = getCachedRecipes();
    const existingIndex = cached.findIndex(r => String(r.id) === String(recipe.id) || (r.slug && r.slug === recipe.slug));
    
    let updated;
    if (existingIndex >= 0) {
      // Gabungkan data lama dengan data baru agar data lengkap (bahan & langkah) tidak tertimpa data ringkas
      updated = [...cached];
      const prev = cached[existingIndex];
      updated[existingIndex] = {
        ...prev,
        ...recipe,
        ingredients: (recipe.ingredients && recipe.ingredients.length > 0) ? recipe.ingredients : prev.ingredients,
        instructions: (recipe.instructions && recipe.instructions.length > 0) ? recipe.instructions : prev.instructions,
        tools: (recipe.tools && recipe.tools.length > 0) ? recipe.tools : prev.tools,
        substitutions: (recipe.substitutions && recipe.substitutions.length > 0) ? recipe.substitutions : prev.substitutions
      };
    } else {
      updated = [recipe, ...cached];
    }
    
    // Batasi maksimum 120 resep terakhir agar memori browser tetap hemat & cepat
    if (updated.length > 120) {
      updated = updated.slice(0, 120);
    }
    localStorage.setItem(CACHE_RECIPES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('LocalStorage error while caching recipe:', e);
  }
};

/**
 * Simpan atau perbarui daftar resep ke cache
 */
export const saveOrUpdateCachedRecipes = (recipesList) => {
  if (!Array.isArray(recipesList) || recipesList.length === 0) return;
  try {
    const cached = getCachedRecipes();
    const map = new Map();
    
    // Masukkan data cache lama dulu
    cached.forEach(r => {
      if (r && r.id) map.set(String(r.id), r);
    });
    
    // Perbarui / tambahkan dengan data baru
    recipesList.forEach(r => {
      if (r && r.id) {
        const idKey = String(r.id);
        const existing = map.get(idKey);
        map.set(idKey, {
          ...(existing || {}),
          ...r,
          ingredients: (r.ingredients && r.ingredients.length > 0) ? r.ingredients : existing?.ingredients,
          instructions: (r.instructions && r.instructions.length > 0) ? r.instructions : existing?.instructions,
          tools: (r.tools && r.tools.length > 0) ? r.tools : existing?.tools
        });
      }
    });
    
    const merged = Array.from(map.values()).slice(0, 120);
    localStorage.setItem(CACHE_RECIPES_KEY, JSON.stringify(merged));
  } catch (e) {
    console.warn('LocalStorage error while caching recipes list:', e);
  }
};

/**
 * Mengambil satu resep dari cache offline berdasarkan ID atau slug
 */
export const getCachedRecipeById = (id) => {
  if (!id) return null;
  const cached = getCachedRecipes();
  return cached.find(r => String(r.id) === String(id) || r.slug === id) || null;
};

/**
 * Operasi Cache Kategori Masakan
 */
export const getCachedCategories = () => {
  try {
    const raw = localStorage.getItem(CACHE_CATEGORIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const setCachedCategories = (categories) => {
  try {
    if (Array.isArray(categories) && categories.length > 0) {
      localStorage.setItem(CACHE_CATEGORIES_KEY, JSON.stringify(categories));
    }
  } catch (e) {}
};

/**
 * Operasi Cache Peralatan Dapur
 */
export const getCachedTools = () => {
  try {
    const raw = localStorage.getItem(CACHE_TOOLS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const setCachedTools = (tools) => {
  try {
    if (Array.isArray(tools) && tools.length > 0) {
      localStorage.setItem(CACHE_TOOLS_KEY, JSON.stringify(tools));
    }
  } catch (e) {}
};
