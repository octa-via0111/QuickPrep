import { useState, useEffect } from 'react';
import categoryService from '../services/categoryService.js';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    categoryService.getCategories()
      .then(res => {
        if (mounted && res && res.success) {
          setCategories(res.data);
        }
      })
      .catch(err => {
        console.warn('Error fetching categories:', err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  return { categories, loading };
};

export default useCategories;
