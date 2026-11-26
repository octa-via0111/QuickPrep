import { useState, useEffect, useCallback } from 'react';
import recipeService from '../services/recipeService.js';
import { getCachedRecipeById, saveOrUpdateCachedRecipe } from '../utils/storage.js';

export const useRecipeDetail = (id) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOfflineData, setIsOfflineData] = useState(false);

  const fetchDetail = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const response = await recipeService.getRecipeById(id);
      if (response && response.success) {
        setRecipe(response.data);
        // Simpan otomatis ke cache lokal agar bisa dibuka offline di masa mendatang
        saveOrUpdateCachedRecipe(response.data);
        setIsOfflineData(Boolean(response.isOffline));
      } else {
        throw new Error(response.message || 'Resep tidak ditemukan');
      }
    } catch (err) {
      console.warn('Detail API error, looking in cache:', err.message);
      const found = getCachedRecipeById(id);
      if (found) {
        setRecipe(found);
        setIsOfflineData(true);
      } else {
        setError(err.message || 'Gagal memuat detail resep');
      }
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { recipe, loading, error, isOfflineData, refetch: fetchDetail };
};

export default useRecipeDetail;
