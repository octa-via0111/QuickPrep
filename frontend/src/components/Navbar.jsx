import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  Wifi, 
  WifiOff, 
  Download, 
  Search, 
  Heart
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
    { to: '/admin', label: 'Admin' }
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
            background: 'var(--purple-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 14px rgba(38, 15, 61, 0.25)'
          }}>
            <UtensilsCrossed size={20} />
          </div>
          <div>
            <div style={{
              fontSize: '19px',
              fontWeight: '800',
              letterSpacing: '-0.3px',
              color: 'var(--purple-dark)',
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
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  padding: '7px 14px',
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

        {/* Right Action Icons: PWA Install (Online text removed) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* PWA Install Button if available */}
          {canInstall && (
            <button
              onClick={promptPWAInstall}
              className="btn-primary"
              style={{
                padding: '7px 15px',
                fontSize: '13px',
                background: 'var(--primary)',
                boxShadow: 'var(--shadow-warm)'
              }}
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
        }
      `}</style>
    </header>
  );
};

export default Navbar;
