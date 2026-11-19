// Storage Keys
const FAVORITES_KEY = 'quickprep_favorites';
const PROFILE_KEY = 'quickprep_profile';
const HISTORY_KEY = 'quickprep_cooking_history';
const CACHE_RECIPES_KEY = 'quickprep_cached_recipes';
const SETTINGS_KEY = 'quickprep_settings';

// Default Profile
export const DEFAULT_PROFILE = {
  name: 'Anak Kos Hebat',
  avatarColor: '#E0623A',
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
 * Recipe Offline Cache Store
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
