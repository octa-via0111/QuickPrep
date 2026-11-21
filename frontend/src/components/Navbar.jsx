import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  UtensilsCrossed, 
  Download, 
  Heart,
  ShieldCheck,
  User,
  LogIn,
  LogOut,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import useOnlineStatus from '../hooks/useOnlineStatus.js';
import { subscribeToInstallPrompt, promptPWAInstall, isAppInstalled } from '../utils/pwa.js';
import { useFavorites } from '../hooks/useFavorites.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import InstallAppModal from './InstallAppModal.jsx';

export const Navbar = () => {
  const isOnline = useOnlineStatus();
  const location = useLocation();
  const { count: favoriteCount } = useFavorites();
  const { currentUser, isAdmin, isUser, openLogin, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  
  const [canInstall, setCanInstall] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(() => isAppInstalled());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeToInstallPrompt((supported) => {
      setCanInstall(supported);
    });
    
    // Check if app gets installed
    const handleInstalled = () => setIsStandalone(true);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      unsubscribe();
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      background: 'var(--bg-header)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      transition: 'background-color 0.25s ease, border-color 0.25s ease'
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
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '13px',
            background: '#260F3D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 14px rgba(38, 15, 61, 0.35)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
            flexShrink: 0
          }}>
            <UtensilsCrossed size={22} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{
              fontSize: '20px',
              fontWeight: '800',
              letterSpacing: '-0.4px',
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

        {/* Right Action: Menu Masuk / Profil User & PWA Install & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Tombol Night Mode / Dark Theme */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Ganti ke Mode Terang (Day Mode)' : 'Ganti ke Mode Malam (Night Mode)'}
            aria-label="Toggle Night Mode"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-secondary)',
              color: isDark ? '#F59E0B' : 'var(--purple-dark)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* 1. Belum Login: Tampilkan Tombol Masuk */}
          {!currentUser ? (
            <button
              onClick={() => openLogin()}
              title="Masuk ke Akun"
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '13.5px',
                fontWeight: '700',
                background: 'var(--primary)',
                color: '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                border: 'none',
                boxShadow: 'var(--shadow-warm)',
                transition: 'all 0.15s ease'
              }}
            >
              <LogIn size={15} />
              <span>Masuk</span>
            </button>
          ) : (
            /* 2. Sudah Login: Tampilkan Pill User / Admin dengan Menu Dropdown */
            <div style={{ position: 'relative' }} ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: '700',
                  background: isAdmin ? 'var(--purple-dark)' : 'var(--bg-secondary)',
                  color: isAdmin ? '#FFFFFF' : 'var(--purple-dark)',
                  border: isAdmin ? 'none' : '1px solid var(--border-subtle)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: isAdmin ? 'var(--shadow-purple)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {isAdmin ? (
                  <>
                    <ShieldCheck size={16} color="var(--primary)" />
                    <span>Admin</span>
                  </>
                ) : (
                  <>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: '800'
                    }}>
                      {(currentUser.name || 'U').charAt(0).toUpperCase()}
                    </div>
                    <span>{currentUser.name ? (currentUser.name.length > 12 ? currentUser.name.substring(0, 10) + '...' : currentUser.name) : 'Pengguna'}</span>
                  </>
                )}
                <ChevronDown size={14} style={{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.15s ease' }} />
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  background: '#FFFDF9',
                  borderRadius: '16px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: '0 10px 30px rgba(31, 14, 52, 0.18)',
                  minWidth: '190px',
                  padding: '8px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  animation: 'fadeIn 0.15s ease'
                }}>
                  {/* Info Header */}
                  <div style={{
                    padding: '8px 10px 8px',
                    borderBottom: '1px solid var(--border-subtle)',
                    marginBottom: '4px'
                  }}>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--purple-dark)' }}>
                      {currentUser.name || (isAdmin ? 'Administrator' : 'Pengguna')}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {isAdmin ? 'Peran: Administrator' : (currentUser.email || 'Akun Pengguna')}
                    </div>
                  </div>

                  {/* Menu Link Sesuai Peran */}
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: 'var(--purple-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none'
                      }}
                    >
                      <ShieldCheck size={16} color="var(--primary)" />
                      <span>Panel Admin</span>
                    </Link>
                  ) : (
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: 'var(--purple-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        textDecoration: 'none'
                      }}
                    >
                      <User size={16} color="var(--primary)" />
                      <span>Profil Saya</span>
                    </Link>
                  )}

                  {/* Tombol Keluar / Logout */}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: 'var(--alert-red)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%'
                    }}
                  >
                    <LogOut size={16} />
                    <span>Keluar (Logout)</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tombol Download / Install App */}
          {!isStandalone && (
            <button
              onClick={() => {
                if (canInstall) {
                  promptPWAInstall().then(accepted => {
                    if (!accepted) setIsInstallModalOpen(true);
                  });
                } else {
                  setIsInstallModalOpen(true);
                }
              }}
              title="Download / Instal Aplikasi QuickPrep"
              style={{
                padding: '7px 15px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '700',
                background: 'var(--purple-dark)',
                color: '#FFFFFF',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 12px rgba(38, 15, 61, 0.25)',
                transition: 'all 0.15s ease'
              }}
            >
              <Download size={14} />
              <span className="install-label">Download App</span>
            </button>
          )}
        </div>
      </div>

      {/* Modal Panduan Download & Instalasi Aplikasi */}
      <InstallAppModal 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
        canInstallNative={canInstall} 
      />

      <style>{`
        @media (max-width: 820px) {
          .desktop-nav {
            display: none !important;
          }
          .install-label {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
