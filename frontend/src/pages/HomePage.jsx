import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Wallet, 
  Wrench, 
  ArrowRight, 
  Flame, 
  Clock, 
  TrendingUp, 
  ChefHat,
  RotateCw,
  RefreshCw
} from 'lucide-react';
import useRecipes from '../hooks/useRecipes.js';
import RecipeCard from '../components/RecipeCard.jsx';
import { getStoredProfile, getStoredHistory } from '../utils/storage.js';

export const HomePage = () => {
  const navigate = useNavigate();
  const profile = getStoredProfile();
  const history = getStoredHistory();

  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all recipes from API
  const { recipes, loading, error, isOfflineData, refetch } = useRecipes();

  // Filter subsets for home sections
  const popularRecipes = recipes.filter(r => r.is_popular).slice(0, 4);
  const kosQuickRecipes = recipes.filter(r => r.is_kos_friendly && r.cooking_time <= 15).slice(0, 4);
  const budgetUnder10k = recipes.filter(r => r.estimated_cost <= 10000).slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Warm Greeting & Search Header */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>
              Selamat datang kembali,
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-main)', marginTop: '2px' }}>
              Halo, <span style={{ color: 'var(--primary)' }}>{profile.name}</span>!
            </h1>
          </div>

          <Link
            to="/spin"
            className="btn-primary"
            style={{ padding: '10px 18px', fontSize: '13.5px' }}
          >
            <Sparkles size={16} />
            <span>Spin Menu Bingung</span>
          </Link>
        </div>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '100%' }}>
          <Search 
            size={20} 
            color="var(--text-light)" 
            style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
          />
          <input
            type="text"
            className="input-field"
            placeholder="Cari resep praktis, telur, tahu, nasi goreng, atau bahan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '48px', height: '52px', borderRadius: 'var(--radius-xl)' }}
          />
        </form>
      </section>

      {/* 2. Hero Cozy Banner QuickPrep */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #E0623A 0%, #C85228 100%)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 24px',
        color: '#FFFFFF',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-warm)'
      }}>
        {/* Background decorative pattern circles */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          right: '80px',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.06)'
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '580px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(4px)',
            padding: '4px 12px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: '700',
            marginBottom: '12px'
          }}>
            <ChefHat size={14} /> Solusi Masak Anak Kos & Pemula
          </span>

          <h2 style={{ fontSize: '24px', fontWeight: '800', lineHeight: 1.25, color: '#FFF', marginBottom: '8px' }}>
            Masak apa yang ada. Hemat apa yang bisa.
          </h2>

          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.5, marginBottom: '20px' }}>
            Tentukan masakan lezat hanya berdasarkan alat masak di kosanmu, uang di dompet, atau bahan yang tersisa di kulkas.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              to="/budget"
              style={{
                background: '#FFFFFF',
                color: 'var(--primary)',
                fontWeight: '700',
                fontSize: '13.5px',
                padding: '10px 18px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <Wallet size={16} />
              <span>Pilih Sesuai Budget</span>
            </Link>

            <Link
              to="/explore"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontWeight: '600',
                fontSize: '13.5px',
                padding: '10px 18px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Jelajahi Resep</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Feature Shortcuts Grid */}
      <section>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {/* Shortcut 1: Budget */}
          <Link
            to="/budget"
            className="card"
            style={{
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              borderLeft: '4px solid #E0623A'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Wallet size={22} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
                Masak Sesuai Budget
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Mulai dari Rp5.000 saja
              </div>
            </div>
          </Link>

          {/* Shortcut 2: Cook with My Tools */}
          <Link
            to="/explore?tool=rice-cooker"
            className="card"
            style={{
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              borderLeft: '4px solid #5B8266'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--sage-light)',
              color: 'var(--sage)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Wrench size={22} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
                Alat yang Tersedia
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Rice cooker, teflon, & wajan
              </div>
            </div>
          </Link>

          {/* Shortcut 3: Spin Wheel */}
          <Link
            to="/spin"
            className="card"
            style={{
              padding: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              borderLeft: '4px solid #F59E0B'
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#FEF3C7',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <RotateCw size={22} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
                Recipe Spin
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Roulette penentu menu hari ini
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. Resep Populer Teratas */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '19px', fontWeight: '800' }}>Resep Terpopuler</h2>
          </div>
          <Link to="/explore?sort=popular" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Lihat Semua</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid-recipes">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="card skeleton" style={{ height: '260px' }} />
            ))}
          </div>
        ) : error ? (
          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <p style={{ color: 'var(--alert-red)', marginBottom: '12px' }}>{error}</p>
            <button onClick={refetch} className="btn-secondary" style={{ fontSize: '13px' }}>
              <RefreshCw size={14} /> Coba Muat Ulang
            </button>
          </div>
        ) : (
          <div className="grid-recipes">
            {popularRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Menu Super Cepat Anak Kos (<= 15 Menit) */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} color="var(--sage)" />
            <h2 style={{ fontSize: '19px', fontWeight: '800' }}>Cepat Matang & Ramah Kos</h2>
          </div>
          <Link to="/explore?maxCookingTime=15" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Lihat Semua</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid-recipes">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="card skeleton" style={{ height: '260px' }} />
            ))}
          </div>
        ) : (
          <div className="grid-recipes">
            {kosQuickRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* 6. Hemat Maksimal: Resep di bawah Rp10.000 */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wallet size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '19px', fontWeight: '800' }}>Hemat di Bawah Rp10.000</h2>
          </div>
          <Link to="/budget?maxBudget=10000" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>Lihat Semua</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid-recipes">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="card skeleton" style={{ height: '260px' }} />
            ))}
          </div>
        ) : (
          <div className="grid-recipes">
            {budgetUnder10k.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      {/* 7. Terakhir Dimasak (Cooking History Banner) */}
      {history.length > 0 && (
        <section className="card" style={{ padding: '20px', background: 'var(--bg-card-warm)', border: '1.5px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={18} color="var(--primary)" />
              <h3 style={{ fontSize: '16px', fontWeight: '800' }}>Terakhir Kamu Masak</h3>
            </div>
            <Link to="/profile" style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: '600' }}>
              Lihat Riwayat
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)' }}>
                {history[0].recipe_name}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Dimasak: {new Date(history[0].cooked_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })} | {history[0].servings_cooked} porsi
              </div>
            </div>

            {history[0].recipe_id && (
              <Link
                to={`/recipe/${history[0].recipe_id}`}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '13px' }}
              >
                Masak Lagi
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
