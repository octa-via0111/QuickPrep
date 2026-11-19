import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, Users, Sparkles, ChefHat } from 'lucide-react';
import { formatRupiah, formatTime, getDifficultyColor } from '../utils/formatter.js';
import { useFavorites } from '../hooks/useFavorites.js';

export const RecipeCard = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(recipe.id);
  const diffStyle = getDifficultyColor(recipe.difficulty);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.id);
  };

  return (
    <Link 
      to={`/recipe/${recipe.id}`} 
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        position: 'relative',
        height: '100%'
      }}
    >
      {/* Image Container with Badges */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '62%', /* 16:10 Aspect Ratio */
        backgroundColor: '#F0ECE4',
        overflow: 'hidden'
      }}>
        <img
          src={recipe.image_url}
          alt={recipe.name}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          onError={(e) => {
            // Fallback food placeholder
            e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Gradient shadow for contrast */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 100%)'
        }} />

        {/* Difficulty Badge Top Left */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px'
        }}>
          <span 
            className="badge"
            style={{
              background: diffStyle.bg,
              color: diffStyle.text,
              border: `1px solid ${diffStyle.border}`
            }}
          >
            {recipe.difficulty}
          </span>

          {recipe.is_kos_friendly && (
            <span 
              className="badge" 
              style={{ background: 'rgba(255,255,255,0.92)', color: 'var(--text-main)' }}
            >
              Anak Kos
            </span>
          )}
        </div>

        {/* Favorite Button Top Right */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
            color: isFav ? 'var(--alert-red)' : 'var(--text-muted)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Heart 
            size={18} 
            fill={isFav ? 'currentColor' : 'none'} 
            strokeWidth={isFav ? 0 : 2.2} 
          />
        </button>
      </div>

      {/* Content Section */}
      <div style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Category Tag */}
          <div style={{
            fontSize: '11.5px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: 'var(--primary)',
            marginBottom: '4px'
          }}>
            {recipe.category?.name || 'Resep Praktis'}
          </div>

          {/* Recipe Name */}
          <h3 style={{
            fontSize: '16.5px',
            fontWeight: '700',
            color: 'var(--text-main)',
            marginBottom: '6px',
            lineHeight: 1.3
          }}>
            {recipe.name}
          </h3>

          {/* Short description */}
          <p style={{
            fontSize: '13px',
            color: 'var(--text-muted)',
            lineHeight: 1.45,
            marginBottom: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {recipe.description}
          </p>
        </div>

        {/* Card Footer: Cost & Duration Meta */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '500' }}>
              Estimasi Biaya
            </div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary)' }}>
              {formatRupiah(recipe.estimated_cost)}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '12.5px',
            color: 'var(--text-muted)',
            fontWeight: '600',
            background: 'var(--bg-secondary)',
            padding: '5px 10px',
            borderRadius: '999px'
          }}>
            <Clock size={13} color="var(--primary)" />
            <span>{formatTime(recipe.cooking_time)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
