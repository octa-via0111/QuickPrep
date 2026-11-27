import React from 'react';
import { ChefHat } from 'lucide-react';

/**
 * Komponen Skeleton Fallback saat halaman di-lazy load oleh React Suspense
 */
export const PageLoadingSkeleton = () => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '16px 0',
        animation: 'fadeIn 0.3s ease-in-out'
      }}
      aria-label="Memuat halaman..."
    >
      {/* Header bar shimmer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '50%' }}>
          <div className="skeleton" style={{ height: '28px', width: '70%', borderRadius: 'var(--radius-md)' }} />
          <div className="skeleton" style={{ height: '16px', width: '90%', borderRadius: 'var(--radius-sm)' }} />
        </div>
        <div 
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 1.5s infinite'
          }}
        >
          <ChefHat size={22} />
        </div>
      </div>

      {/* Banner / search bar skeleton */}
      <div className="skeleton" style={{ height: '52px', width: '100%', borderRadius: 'var(--radius-xl)' }} />

      {/* Hero card skeleton */}
      <div className="skeleton" style={{ height: '140px', width: '100%', borderRadius: 'var(--radius-xl)' }} />

      {/* Grid cards skeleton */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px'
        }}
      >
        {[1, 2, 3, 4].map(n => (
          <div 
            key={n} 
            className="card" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden',
              padding: 0
            }}
          >
            <div className="skeleton" style={{ width: '100%', paddingTop: '62%', borderRadius: 0 }} />
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="skeleton" style={{ height: '18px', width: '80%', borderRadius: 'var(--radius-sm)' }} />
              <div className="skeleton" style={{ height: '14px', width: '50%', borderRadius: 'var(--radius-sm)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                <div className="skeleton" style={{ height: '16px', width: '35%', borderRadius: 'var(--radius-sm)' }} />
                <div className="skeleton" style={{ height: '16px', width: '25%', borderRadius: 'var(--radius-sm)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageLoadingSkeleton;
