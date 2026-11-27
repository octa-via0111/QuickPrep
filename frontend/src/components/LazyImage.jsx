import React, { useState } from 'react';

/**
 * Komponen LazyImage dengan Shimmer Skeleton dan Smooth Fade-in Transition.
 * - Menggunakan native loading="lazy" untuk performa terbaik
 * - Menampilkan skeleton shimmer sampai gambar selesai terunduh (mencegah Layout Shift)
 * - Transisi halus (opacity 0 -> 1) begitu gambar selesai dimuat
 * - Fallback otomatis jika gambar gagal dimuat / URL rusak / offline
 */
export const LazyImage = ({
  src,
  alt = 'Resep masakan',
  fallbackSrc = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  className = '',
  style = {},
  imgStyle = {},
  aspectRatio = '62%', // 16:10 default
  onMouseEnter,
  onMouseLeave
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const finalSrc = error ? fallbackSrc : (src || fallbackSrc);

  return (
    <div
      className={`lazy-image-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: aspectRatio ? aspectRatio : undefined,
        backgroundColor: 'var(--bg-secondary, #F0ECE4)',
        overflow: 'hidden',
        ...style
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Skeleton Shimmer Placeholder saat gambar masih loading */}
      {!loaded && (
        <div
          className="skeleton"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1
          }}
        />
      )}

      {/* Gambar Asli dengan Native Lazy Loading */}
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!error) {
            setError(true);
            setLoaded(true);
          }
        }}
        style={{
          position: aspectRatio ? 'absolute' : 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: aspectRatio ? '100%' : 'auto',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.35s ease, transform 0.4s ease',
          ...imgStyle
        }}
      />
    </div>
  );
};

export default LazyImage;
