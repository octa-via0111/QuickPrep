import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  Disc3, 
  Heart, 
  User 
} from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites.js';

export const BottomNav = () => {
  const { count: favoriteCount } = useFavorites();

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Compass },
    { 
      to: '/spin', 
      label: 'Spin', 
      icon: Disc3,
      isSpecial: true 
    },
    { 
      to: '/favorites', 
      label: 'Favorit', 
      icon: Heart,
      badge: favoriteCount > 0 ? favoriteCount : null
    },
    { to: '/profile', label: 'Profil', icon: User }
  ];

  return (
    <nav className="mobile-bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '64px',
      background: 'rgba(255, 253, 250, 0.97)',
      backdropFilter: 'blur(14px)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-around',
      padding: '0 4px',
      zIndex: 90,
      boxShadow: '0 -4px 20px rgba(38, 15, 61, 0.06)'
    }}>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className="bottom-nav-link"
            style={({ isActive }) => ({
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              padding: '6px 0 8px 0',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              position: 'relative',
              outline: 'none',
              border: 'none',
              WebkitTapHighlightColor: 'transparent',
              background: 'transparent'
            })}
          >
            {({ isActive }) => (
              <>
                {/* Special Spin Floating Center Style */}
                {item.isSpecial ? (
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: isActive 
                      ? 'linear-gradient(135deg, #260F3D 0%, #E0623A 100%)' 
                      : 'linear-gradient(135deg, #3B165E 0%, #E0623A 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '-22px',
                    boxShadow: '0 6px 18px rgba(38, 15, 61, 0.35)',
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    transition: 'all 0.25s ease',
                    border: '3px solid #FFFDF9'
                  }}>
                    <IconComponent size={23} strokeWidth={2.2} />
                  </div>
                ) : (
                  <div style={{ position: 'relative' }}>
                    <IconComponent 
                      size={22} 
                      strokeWidth={isActive ? 2.4 : 1.8}
                      fill={item.label === 'Favorit' && isActive ? 'var(--primary)' : 'none'}
                    />
                    {item.badge && (
                      <span style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-9px',
                        background: 'var(--primary)',
                        color: '#FFF',
                        fontSize: '10px',
                        fontWeight: '700',
                        minWidth: '16px',
                        height: '16px',
                        borderRadius: '999px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 3px'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
                
                <span style={{
                  fontSize: '11px',
                  fontWeight: isActive ? '700' : '500',
                  letterSpacing: '-0.1px',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)'
                }}>
                  {item.label}
                </span>

                {/* Garis Bawah Aktif (Underline Indicator, Tanpa Kotak) */}
                {isActive && !item.isSpecial && (
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '22%',
                    right: '22%',
                    height: '3px',
                    borderRadius: '3px 3px 0 0',
                    background: 'var(--primary)',
                    boxShadow: '0 -1px 6px rgba(224, 98, 58, 0.4)'
                  }} />
                )}
              </>
            )}
          </NavLink>
        );
      })}

      <style>{`
        @media (min-width: 821px) {
          .mobile-bottom-nav {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default BottomNav;
