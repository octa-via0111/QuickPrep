import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, Users, ChefHat } from 'lucide-react';
import { formatRupiah, formatTime, getDifficultyColor, formatImageUrl } from '../utils/formatter.js';
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
          src={formatImageUrl(recipe.image_url)}
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

        {/* Difficulty Badge Top Left */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          maxWidth: 'calc(100% - 44px)'
        }}>
          <span 
            className="badge"
            style={{
              background: diffStyle.bg,
              color: diffStyle.text,
              border: `1px solid ${diffStyle.border}`,
              fontSize: '10.5px',
              padding: '2px 7px'
            }}
          >
            {recipe.difficulty}
          </span>

          {recipe.is_kos_friendly && (
            <span 
              className="badge" 
              style={{
                background: 'rgba(255,255,255,0.92)',
                color: 'var(--text-main)',
                fontSize: '10px',
                padding: '2px 6px'
              }}
            >
              Anak Kos
            </span>
          )}

          {recipe.source_name && (
            <span 
              className="badge" 
              style={{
                background: 'rgba(38, 15, 61, 0.85)',
                color: '#FFFFFF',
                fontSize: '10px',
                padding: '2px 7px',
                backdropFilter: 'blur(4px)'
              }}
            >
              🌐 {recipe.source_name}
            </span>
          )}
        </div>

        {/* Favorite Button Top Right */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
            color: isFav ? 'var(--alert-red)' : 'var(--text-muted)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Heart 
            size={16} 
            fill={isFav ? 'currentColor' : 'none'} 
            strokeWidth={isFav ? 0 : 2.2} 
          />
        </button>
      </div>

      {/* Content Section */}
      <div style={{
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Category Tag */}
          <div style={{
            fontSize: '10.5px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.4px',
            color: 'var(--purple-main)',
            marginBottom: '3px'
          }}>
            {recipe.category?.name || 'Resep Praktis'}
          </div>

          {/* Recipe Name */}
          <h3 className="recipe-card-title">
            {recipe.name}
          </h3>

          {/* Short description */}
          <p className="recipe-card-desc">
            {recipe.description}
          </p>
        </div>

        {/* Card Footer: Cost & Duration Meta */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '8px',
          marginTop: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '6px'
        }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: '500' }}>
              Estimasi Biaya
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--primary)' }}>
              {formatRupiah(recipe.estimated_cost)}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            color: 'var(--text-muted)',
            fontWeight: '600',
            background: 'var(--bg-secondary)',
            padding: '4px 8px',
            borderRadius: '999px',
            whiteSpace: 'nowrap'
          }}>
            <Clock size={12} color="var(--primary)" />
            <span>{formatTime(recipe.cooking_time)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
