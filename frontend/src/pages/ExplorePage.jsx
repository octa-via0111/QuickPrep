import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Clock, 
  Wallet, 
  Utensils, 
  RotateCcw,
  Globe,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import useRecipes from '../hooks/useRecipes.js';
import useCategories from '../hooks/useCategories.js';
import RecipeCard from '../components/RecipeCard.jsx';
import toolService from '../services/toolService.js';
import { goBackOneStep } from '../utils/navigation.js';

export const ExplorePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleBack = () => {
    goBackOneStep(navigate, location.pathname);
  };

  // Filters state initialized from URL search params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'semua');
  const [maxBudget, setMaxBudget] = useState(searchParams.get('maxBudget') || '');
  const [tool, setTool] = useState(searchParams.get('tool') || 'semua');
  const [maxCookingTime, setMaxCookingTime] = useState(searchParams.get('maxCookingTime') || '');
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || 'semua');
  const [sort, setSort] = useState(searchParams.get('sort') || 'popular');
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const [toolsList, setToolsList] = useState([]);
  const { categories } = useCategories();

  useEffect(() => {
    toolService.getTools()
      .then(res => {
        if (res && res.success) setToolsList(res.data);
      })
      .catch(() => {});
  }, []);

  // Sync state if URL search query changes
  useEffect(() => {
    if (searchParams.get('search') !== null) setSearch(searchParams.get('search') || '');
    if (searchParams.get('category') !== null) setCategory(searchParams.get('category') || 'semua');
    if (searchParams.get('tool') !== null) setTool(searchParams.get('tool') || 'semua');
    if (searchParams.get('maxCookingTime') !== null) setMaxCookingTime(searchParams.get('maxCookingTime') || '');
    if (searchParams.get('maxBudget') !== null) setMaxBudget(searchParams.get('maxBudget') || '');
    if (searchParams.get('sort') !== null) setSort(searchParams.get('sort') || 'popular');
  }, [searchParams]);

  // Construct active filter object for API call
  const activeFilters = {
    search: search.trim() || undefined,
    category: category !== 'semua' ? category : undefined,
    maxBudget: maxBudget || undefined,
    tool: tool !== 'semua' ? tool : undefined,
    maxCookingTime: maxCookingTime || undefined,
    difficulty: difficulty !== 'semua' ? difficulty : undefined,
    sort: sort || undefined
  };

  const { recipes, loading, error, refetch } = useRecipes(activeFilters);

  // Lazy loading pagination: Muat resep secara bertahap (8 resep pertama)
  const PAGE_SIZE = 8;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Reset pagination setiap kali filter berubah
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, category, maxBudget, tool, maxCookingTime, difficulty, sort]);

  const displayedRecipes = recipes.slice(0, visibleCount);
  const hasMore = visibleCount < recipes.length;

  const handleResetFilters = () => {
    setSearch('');
    setCategory('semua');
    setMaxBudget('');
    setTool('semua');
    setMaxCookingTime('');
    setDifficulty('semua');
    setSort('popular');
    setSearchParams({}, { replace: true });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Back button */}
      <div>
        <button
          onClick={handleBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13.5px',
            fontWeight: '600',
            color: 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <ChevronLeft size={18} />
          <span>Kembali</span>
        </button>
      </div>

      {/* Page Title & Search Header */}
      <div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '6px' }}>
          Jelajahi <span style={{ color: 'var(--primary)' }}>Resep</span>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Temukan aneka masakan praktis sesuai bahan, alat masak, budget, dan seleramu.
        </p>
      </div>

      {/* Search Input Bar */}
      <div style={{ position: 'relative', width: '100%' }}>
        <Search 
          size={20} 
          color="var(--text-light)" 
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
        />
        <input
          type="text"
          className="input-field"
          placeholder="Cari nama masakan, bahan (contoh: tahu, tempe, telur, ayam)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: '48px', height: '50px', borderRadius: 'var(--radius-xl)' }}
        />
      </div>

      {/* Category Horizontal Filter Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '6px',
        scrollbarWidth: 'none'
      }}>
        <button
          onClick={() => setCategory('semua')}
          style={{
            padding: '8px 16px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            background: category === 'semua' ? 'var(--primary)' : 'var(--bg-card)',
            color: category === 'semua' ? '#FFF' : 'var(--text-muted)',
            border: '1px solid var(--border-subtle)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
        >
          Semua Kategori
        </button>

        {categories.map((cat) => {
          const isActive = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                background: isActive ? 'var(--primary)' : 'var(--bg-card)',
                color: isActive ? '#FFF' : 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Filter Row: Tool, Budget, Time, Sort */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'var(--bg-card)',
        padding: '14px 18px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Tool Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Alat:</span>
            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontSize: '13px',
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="semua">Semua Alat</option>
              {toolsList.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Tingkat:</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontSize: '13px',
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="semua">Semua</option>
              <option value="Mudah">Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Sulit">Sulit</option>
            </select>
          </div>

          {/* Cooking Time Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Durasi:</span>
            <select
              value={maxCookingTime}
              onChange={(e) => setMaxCookingTime(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontSize: '13px',
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">Semua Durasi</option>
              <option value="12">Maks. 12 Menit (Kilat)</option>
              <option value="15">Maks. 15 Menit</option>
              <option value="20">Maks. 20 Menit</option>
              <option value="30">Maks. 30 Menit</option>
            </select>
          </div>
        </div>

        {/* Sort & Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Urutkan:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontSize: '13px',
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                fontWeight: '600',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="popular">Terpopuler</option>
              <option value="cost_asc">Biaya Termurah</option>
              <option value="cost_desc">Biaya Termahal</option>
              <option value="time_asc">Masak Tercepat</option>
              <option value="name_asc">Nama (A - Z)</option>
            </select>
          </div>

          {(search || category !== 'semua' || tool !== 'semua' || maxCookingTime || maxBudget || difficulty !== 'semua') && (
            <button
              onClick={handleResetFilters}
              title="Reset Semua Filter"
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-muted)',
                fontSize: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Result Status Count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-muted)' }}>
          {hasMore ? (
            <span>
              Menampilkan <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{displayedRecipes.length}</span> dari {recipes.length} resep masakan
            </span>
          ) : (
            <span>
              Menampilkan <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{recipes.length}</span> resep masakan
            </span>
          )}
        </div>
      </div>

      {/* External Recipe Search Suggestions */}
      {search.trim() && (
        <div className="card" style={{
          padding: '14px 18px',
          background: 'var(--bg-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="var(--primary)" />
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>
              Cari variasi resep "{search.trim()}" di link website luar:
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <a
              href={`https://cookpad.com/id/cari/${encodeURIComponent(search.trim())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="badge"
              style={{
                background: 'var(--bg-card)',
                color: 'var(--primary)',
                border: '1px solid var(--border-subtle)',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>Cookpad</span>
              <ExternalLink size={12} />
            </a>

            <a
              href={`https://www.youtube.com/results?search_query=resep+${encodeURIComponent(search.trim())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="badge"
              style={{
                background: 'var(--bg-card)',
                color: '#DC2626',
                border: '1px solid var(--border-subtle)',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>YouTube</span>
              <ExternalLink size={12} />
            </a>

            <a
              href={`https://www.google.com/search?q=resep+${encodeURIComponent(search.trim())}`}
              target="_blank"
              rel="noopener noreferrer"
              className="badge"
              style={{
                background: 'var(--bg-card)',
                color: '#2563EB',
                border: '1px solid var(--border-subtle)',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>Google</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      )}

      {/* Recipes Grid */}
      {loading ? (
        <div className="grid-recipes">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="card skeleton" style={{ height: '300px' }} />
          ))}
        </div>
      ) : recipes.length === 0 ? (
        <div className="card" style={{ padding: '48px 20px', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Utensils size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>
            Tidak ada resep yang sesuai
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto 20px' }}>
            Coba ubah kata kunci pencarian, kurangi filter alat masak, atau atur batasan budget yang lebih fleksibel.
          </p>
          <button onClick={handleResetFilters} className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Hapus Semua Filter
          </button>
        </div>
      ) : (
        <>
          <div className="grid-recipes">
            {displayedRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* Tombol Lazy Load: Muat Lebih Banyak Resep */}
          {hasMore && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 0 24px'
            }}>
              <button
                onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                className="btn-primary"
                style={{
                  padding: '12px 28px',
                  fontSize: '14px',
                  borderRadius: '999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={16} />
                <span>Muat Lebih Banyak Resep ({recipes.length - displayedRecipes.length} lagi)</span>
              </button>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Menampilkan {displayedRecipes.length} dari {recipes.length} resep
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ExplorePage;
