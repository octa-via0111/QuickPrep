import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles } from 'lucide-react';

/**
 * Splash Screen / App Loading Screen saat baru masuk aplikasi.
 * - Menampilkan logo QuickPrep dengan animasi bernafas / pulsing
 * - Progress bar memuat aplikasi selama 1.8 detik
 * - Transisi fade-out halus saat masuk ke halaman utama aplikasi
 */
export const SplashScreen = ({ onFinish }) => {
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Jalankan animasi progress bar
    const p1 = setTimeout(() => setProgress(55), 400);
    const p2 = setTimeout(() => setProgress(88), 1000);
    const p3 = setTimeout(() => setProgress(100), 1500);

    // Mulai fade-out setelah 1.8 detik
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1800);

    // Hapus total dari DOM setelah animasi fade-out selesai
    const removeTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2300);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        background: 'linear-gradient(145deg, #260F3D 0%, #150724 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: fading ? 'none' : 'auto',
        userSelect: 'none'
      }}
    >
      {/* Decorative ambient background glows */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(224, 98, 58, 0.22) 0%, transparent 70%)',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(40px)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          zIndex: 2,
          padding: '0 24px',
          textAlign: 'center'
        }}
      >
        {/* Logo Container with Glow & Pulse */}
        <div
          style={{
            position: 'relative',
            width: '96px',
            height: '96px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #E0623A 0%, #B84725 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 12px 32px rgba(224, 98, 58, 0.45)',
            marginBottom: '8px'
          }}
        >
          <ChefHat size={52} color="#FFFFFF" strokeWidth={2.2} />
          
          {/* Floating sparkle badge */}
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)'
            }}
          >
            <Sparkles size={16} color="#FFFFFF" />
          </div>
        </div>

        {/* App Title */}
        <div>
          <h1
            style={{
              fontSize: '34px',
              fontWeight: '900',
              letterSpacing: '-0.5px',
              margin: '0 0 4px 0',
              color: '#FFFFFF'
            }}
          >
            Quick<span style={{ color: '#E0623A' }}>Prep</span>
          </h1>
          <p
            style={{
              fontSize: '13.5px',
              color: 'rgba(255, 255, 255, 0.72)',
              margin: 0,
              fontWeight: '500',
              letterSpacing: '0.3px'
            }}
          >
            Solusi Masak Praktis & Hemat Anak Kos
          </p>
        </div>

        {/* Loading Progress Bar Container */}
        <div
          style={{
            width: '200px',
            height: '6px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.15)',
            overflow: 'hidden',
            marginTop: '20px',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: '999px',
              background: 'linear-gradient(90deg, #E0623A, #F59E0B)',
              transition: 'width 0.4s ease-out'
            }}
          />
        </div>

        {/* Loading status text */}
        <span
          style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.55)',
            marginTop: '4px',
            fontWeight: '500'
          }}
        >
          {progress < 60 ? 'Menyiapkan resep lezat...' : progress < 100 ? 'Memuat panduan memasak...' : 'Siap memasak!'}
        </span>
      </div>

      {/* Footer Branding */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.4)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontWeight: '700'
        }}
      >
        QuickPrep PWA App v1.0
      </div>
    </div>
  );
};

export default SplashScreen;
