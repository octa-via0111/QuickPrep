import { useState, useEffect } from 'react';
import { getStoredFavorites, toggleFavoriteStorage } from '../utils/storage.js';

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState(() => getStoredFavorites());

  // Listen to cross-window or internal storage changes
  useEffect(() => {
    const handleStorage = () => {
      setFavoriteIds(getStoredFavorites());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleFavorite = (recipeId) => {
    const updated = toggleFavoriteStorage(recipeId);
    setFavoriteIds(updated);
  };

  const isFavorite = (recipeId) => {
    return favoriteIds.includes(recipeId);
  };

  return {
    favoriteIds,
    toggleFavorite,
    isFavorite,
    count: favoriteIds.length
  };
};

export default useFavorites;
