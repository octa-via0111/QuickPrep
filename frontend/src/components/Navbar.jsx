import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  Wifi, 
  WifiOff, 
  Download, 
  Search, 
  Heart,
  Sparkles
} from 'lucide-react';
import useOnlineStatus from '../hooks/useOnlineStatus.js';
import { subscribeToInstallPrompt, promptPWAInstall } from '../utils/pwa.js';
import { useFavorites } from '../hooks/useFavorites.js';

export const Navbar = () => {
  const isOnline = useOnlineStatus();
  const location = useLocation();
  const { count: favoriteCount } = useFavorites();
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToInstallPrompt((supported) => {
      setCanInstall(supported);
    });
    return unsubscribe;
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore' },
    { to: '/budget', label: 'Budget' },
    { to: '/spin', label: 'Spin' },
    { to: '/favorites', label: 'Favorit', count: favoriteCount },
    { to: '/profile', label: 'Profil' },
    { to: '/about', label: 'About' }
  ];

  return (
    <header style={{
      background: 'rgba(255, 253, 249, 0.94)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1120px',
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #E0623A, #C85228)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(224, 98, 58, 0.28)'
          }}>
            <UtensilsCrossed size={20} />
          </div>
          <div>
            <div style={{
              fontSize: '19px',
              fontWeight: '800',
              letterSpacing: '-0.3px',
              color: 'var(--text-main)',
              lineHeight: 1.1
            }}>
              Quick<span style={{ color: 'var(--primary)' }}>Prep</span>
            </div>
            <div style={{
              fontSize: '10.5px',
              color: 'var(--text-muted)',
              fontWeight: '500'
            }}>
              Cook what you have. Spend what you can.
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '600',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  background: isActive ? 'var(--primary-light)' : 'transparent',
                  transition: 'all 0.15s ease',
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {link.label}
                {link.count !== undefined && link.count > 0 && (
                  <span style={{
                    background: 'var(--primary)',
                    color: '#FFF',
                    fontSize: '11px',
                    padding: '1px 6px',
                    borderRadius: '999px',
                    fontWeight: '700'
                  }}>
                    {link.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Online/Offline indicator & PWA Install */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Online/Offline Badge */}
          <div 
            title={isOnline ? 'Online - Terhubung ke API' : 'Offline - Mode Memori Cache'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: '600',
              background: isOnline ? 'var(--success-green-light)' : 'var(--alert-red-light)',
              color: isOnline ? 'var(--success-green)' : 'var(--alert-red)'
            }}
          >
            {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
            <span className="online-label">{isOnline ? 'Online' : 'Offline'}</span>
          </div>

          {/* PWA Install Button if available */}
          {canInstall && (
            <button
              onClick={promptPWAInstall}
              className="btn-primary"
              style={{ padding: '7px 14px', fontSize: '13px' }}
            >
              <Download size={14} />
              <span>Install App</span>
            </button>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .desktop-nav {
            display: none !important;
          }
          .online-label {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
