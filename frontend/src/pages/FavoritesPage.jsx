import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Utensils, ArrowRight, ChevronLeft } from 'lucide-react';
import useRecipes from '../hooks/useRecipes.js';
import { useFavorites } from '../hooks/useFavorites.js';
import RecipeCard from '../components/RecipeCard.jsx';

export const FavoritesPage = () => {
  const navigate = useNavigate();
  const { favoriteIds } = useFavorites();
  const { recipes, loading } = useRecipes();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  // Filter recipes matching favorite IDs
  const favoriteRecipes = recipes.filter(r => favoriteIds.includes(r.id));

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

      {/* Header */}
      <div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--alert-red-light)',
          color: 'var(--alert-red)',
          padding: '4px 12px',
          borderRadius: '999px',
          fontSize: '12.5px',
          fontWeight: '700',
          marginBottom: '8px'
        }}>
          <Heart size={14} fill="currentColor" /> Resep Favorit
        </div>
        <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '6px' }}>
          Koleksi Resep <span style={{ color: 'var(--primary)' }}>Tersimpan</span>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
          Resep yang kamu sukai tersimpan aman di perangkatmu dan bisa dibuka kapan saja, bahkan saat offline.
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <div className="grid-recipes">
          {[1, 2, 3].map(n => (
            <div key={n} className="card skeleton" style={{ height: '280px' }} />
          ))}
        </div>
      ) : favoriteRecipes.length === 0 ? (
        <div className="card" style={{ padding: '48px 24px', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--alert-red-light)',
            color: 'var(--alert-red)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Heart size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>
            Belum ada resep favorit
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '420px', margin: '0 auto 20px' }}>
            Saat melihat resep yang menarik, tekan tombol ikon hati untuk menyimpannya ke daftar favorit ini.
          </p>
          <Link to="/explore" className="btn-primary" style={{ padding: '10px 22px', fontSize: '14px' }}>
            <span>Jelajahi Resep Sekarang</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '13.5px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '16px' }}>
            Kamu memiliki <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{favoriteRecipes.length}</span> resep andalan:
          </div>
          <div className="grid-recipes">
            {favoriteRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
