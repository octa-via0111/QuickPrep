import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { recipes as seedRecipes, categories as seedCategories, tools as seedTools, substitutions as seedSubstitutions } from '../data/seedData.js';

// In-memory cooking history store for fallback
let memoryHistory = [];

/**
 * Normalizes a recipe from raw data or DB to full structure
 */
function enrichRecipe(recipe) {
  if (!recipe) return null;
  
  // Find category details
  const cat = seedCategories.find(c => c.id === recipe.category_id);
  
  // Resolve tools details
  let recipeTools = [];
  if (Array.isArray(recipe.tools)) {
    recipeTools = recipe.tools.map(t => {
      if (typeof t === 'string') {
        const found = seedTools.find(st => st.id === t);
        return found || { id: t, name: t };
      }
      return t;
    });
  }

  // Find relevant substitutions for recipe ingredients
  const relevantSubstitutions = [];
  if (Array.isArray(recipe.ingredients)) {
    recipe.ingredients.forEach(ing => {
      const ingName = (ing.name || '').toLowerCase();
      seedSubstitutions.forEach(sub => {
        if (ingName.includes(sub.original_ingredient.toLowerCase()) || 
            sub.original_ingredient.toLowerCase().includes(ingName.split(' ')[0])) {
          if (!relevantSubstitutions.some(s => s.id === sub.id)) {
            relevantSubstitutions.push(sub);
          }
        }
      });
    });
  }

  return {
    ...recipe,
    category: cat || { id: recipe.category_id, name: recipe.category_id },
    tools: recipeTools,
    substitutions: relevantSubstitutions
  };
}

export const recipeService = {
  async getAllRecipes(filters = {}) {
    const { search, category, maxBudget, tool, maxCookingTime, difficulty, sort, isKosFriendly } = filters;

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

        if (category && category !== 'semua') {
          query = query.eq('category_id', category);
        }

        if (maxBudget) {
          query = query.lte('estimated_cost', Number(maxBudget));
        }

        if (maxCookingTime) {
          query = query.lte('cooking_time', Number(maxCookingTime));
        }

        if (difficulty && difficulty !== 'semua') {
          query = query.eq('difficulty', difficulty);
        }

        if (isKosFriendly === 'true') {
          query = query.eq('is_kos_friendly', true);
        }

        if (search) {
          query = query.ilike('name', `%${search}%`);
        }

        // Sorting
        if (sort === 'cost_asc') {
          query = query.order('estimated_cost', { ascending: true });
        } else if (sort === 'cost_desc') {
          query = query.order('estimated_cost', { ascending: false });
        } else if (sort === 'time_asc') {
          query = query.order('cooking_time', { ascending: true });
        } else if (sort === 'popular') {
          query = query.order('is_popular', { ascending: false });
        } else {
          query = query.order('created_at', { ascending: false });
        }

        const { data, error } = await query;
        if (error) throw error;

        // Transform Supabase data
        let formatted = data.map(r => ({
          ...r,
          tools: r.recipe_tools ? r.recipe_tools.map(rt => rt.tool).filter(Boolean) : [],
          ingredients: r.recipe_ingredients ? r.recipe_ingredients.map(ri => ({
            name: ri.ingredient?.name || 'Bahan',
            quantity: Number(ri.quantity),
            unit: ri.unit,
            is_optional: ri.is_optional,
            notes: ri.notes
          })) : []
        }));

        // Filter by tool if specified (many-to-many filter)
        if (tool && tool !== 'semua') {
          formatted = formatted.filter(r => 
            r.tools && r.tools.some(t => t.id === tool || t.slug === tool)
          );
        }

        return formatted.map(enrichRecipe);
      } catch (err) {
        console.warn('[SupabaseService] Gagal query Supabase, beralih ke data fallback lokal:', err.message);
      }
    }

    // Fallback: in-memory filtering from seedRecipes
    let results = [...seedRecipes].map(enrichRecipe);

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some(t => t.toLowerCase().includes(q)) ||
        r.ingredients.some(i => i.name.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'semua') {
      results = results.filter(r => r.category_id === category);
    }

    if (maxBudget) {
      const budgetNum = Number(maxBudget);
      results = results.filter(r => r.estimated_cost <= budgetNum);
    }

    if (maxCookingTime) {
      const maxTime = Number(maxCookingTime);
      results = results.filter(r => r.cooking_time <= maxTime);
    }

    if (difficulty && difficulty !== 'semua') {
      results = results.filter(r => r.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (tool && tool !== 'semua') {
      results = results.filter(r => 
        r.tools.some(t => (t.id || t).toLowerCase() === tool.toLowerCase())
      );
    }

    if (isKosFriendly === 'true') {
      results = results.filter(r => r.is_kos_friendly);
    }

    // Sorting
    if (sort === 'cost_asc') {
      results.sort((a, b) => a.estimated_cost - b.estimated_cost);
    } else if (sort === 'cost_desc') {
      results.sort((a, b) => b.estimated_cost - a.estimated_cost);
    } else if (sort === 'time_asc') {
      results.sort((a, b) => a.cooking_time - b.cooking_time);
    } else if (sort === 'popular') {
      results.sort((a, b) => (b.is_popular ? 1 : 0) - (a.is_popular ? 1 : 0));
    } else if (sort === 'name_asc') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    return results;
  },

  async getRecipeById(id) {
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
          const formatted = {
            ...data,
            tools: data.recipe_tools ? data.recipe_tools.map(rt => rt.tool).filter(Boolean) : [],
            ingredients: data.recipe_ingredients ? data.recipe_ingredients.map(ri => ({
              name: ri.ingredient?.name || 'Bahan',
              quantity: Number(ri.quantity),
              unit: ri.unit,
              is_optional: ri.is_optional,
              notes: ri.notes
            })) : []
          };
          return enrichRecipe(formatted);
        }
      } catch (err) {
        console.warn('[SupabaseService] Gagal fetch detail dari Supabase:', err.message);
      }
    }

    // Fallback: search in seedRecipes
    const found = seedRecipes.find(r => r.id === id || r.slug === id);
    return found ? enrichRecipe(found) : null;
  }
};

export const categoryService = {
  async getAllCategories() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('categories').select('*').order('name');
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('[SupabaseService] Gagal fetch kategori dari Supabase:', err.message);
      }
    }
    return seedCategories;
  }
};

export const toolService = {
  async getAllTools() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('tools').select('*').order('name');
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('[SupabaseService] Gagal fetch tools dari Supabase:', err.message);
      }
    }
    return seedTools;
  }
};

export const substitutionService = {
  async getAllSubstitutions(ingredientQuery) {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('substitutions').select('*');
        if (ingredientQuery) {
          query = query.ilike('original_ingredient', `%${ingredientQuery}%`);
        }
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('[SupabaseService] Gagal fetch substitusi dari Supabase:', err.message);
      }
    }

    if (ingredientQuery) {
      const q = ingredientQuery.toLowerCase();
      return seedSubstitutions.filter(s => 
        s.original_ingredient.toLowerCase().includes(q) || 
        s.substitute_ingredient.toLowerCase().includes(q)
      );
    }
    return seedSubstitutions;
  },

  async getSubstitutionsForRecipe(recipeId) {
    const recipe = await recipeService.getRecipeById(recipeId);
    if (!recipe || !recipe.ingredients) return [];

    const result = [];
    const subs = await this.getAllSubstitutions();

    recipe.ingredients.forEach(ing => {
      const ingName = (ing.name || '').toLowerCase();
      subs.forEach(s => {
        if (ingName.includes(s.original_ingredient.toLowerCase()) || 
            s.original_ingredient.toLowerCase().includes(ingName.split(' ')[0])) {
          if (!result.some(r => r.id === s.id)) {
            result.push({
              ...s,
              recipe_ingredient: ing.name
            });
          }
        }
      });
    });

    return result;
  }
};

export const historyService = {
  async recordCooking(historyData) {
    const entry = {
      id: Date.now(),
      recipe_id: historyData.recipe_id,
      recipe_name: historyData.recipe_name,
      servings_cooked: historyData.servings_cooked || 1,
      duration_minutes: historyData.duration_minutes || 0,
      cooked_at: new Date().toISOString(),
      rating: historyData.rating || 5,
      notes: historyData.notes || ''
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('cooking_history').insert([entry]).select().single();
        if (!error && data) return data;
      } catch (err) {
        console.warn('[SupabaseService] Gagal insert cooking history ke Supabase:', err.message);
      }
    }

    memoryHistory.unshift(entry);
    return entry;
  },

  async getHistory() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('cooking_history').select('*').order('cooked_at', { ascending: false });
        if (!error && data) return data;
      } catch (err) {
        console.warn('[SupabaseService] Gagal fetch cooking history dari Supabase:', err.message);
      }
    }
    return memoryHistory;
  }
};
