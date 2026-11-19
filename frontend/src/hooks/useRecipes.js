import { useState, useEffect, useCallback } from 'react';
import recipeService from '../services/recipeService.js';
import { getCachedRecipes, setCachedRecipes } from '../utils/storage.js';

export const useRecipes = (filters = {}) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOfflineData, setIsOfflineData] = useState(false);

  // Convert filters object to stable dependency string
  const filterKey = JSON.stringify(filters);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await recipeService.getRecipes(filters);
      if (response && response.success) {
        setRecipes(response.data || []);
        setIsOfflineData(false);
        // Cache recipes locally for offline viewing
        if (!filters.search && !filters.category && !filters.maxBudget) {
          setCachedRecipes(response.data || []);
        }
      } else {
        throw new Error(response.message || 'Gagal memuat resep');
      }
    } catch (err) {
      console.warn('API error, checking cached recipes:', err.message);
      const cached = getCachedRecipes();
      if (cached && cached.length > 0) {
        // Filter cached recipes locally if filters applied
        let filtered = [...cached];
        if (filters.search) {
          const q = filters.search.toLowerCase();
          filtered = filtered.filter(r => 
            r.name.toLowerCase().includes(q) || 
            r.description.toLowerCase().includes(q)
          );
        }
        if (filters.category && filters.category !== 'semua') {
          filtered = filtered.filter(r => r.category_id === filters.category);
        }
        if (filters.maxBudget) {
          filtered = filtered.filter(r => r.estimated_cost <= Number(filters.maxBudget));
        }
        setRecipes(filtered);
        setIsOfflineData(true);
      } else {
        setError(err.message || 'Gagal memuat resep dari server');
      }
    } finally {
      setLoading(false);
    }
  }, [filterKey]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return { recipes, loading, error, isOfflineData, refetch: fetchRecipes };
};

export default useRecipes;
