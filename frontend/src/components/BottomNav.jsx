import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Compass, 
  Sparkles, 
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
      icon: Sparkles,
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
      height: '66px',
      background: 'rgba(255, 253, 249, 0.96)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 8px',
      zIndex: 90,
      boxShadow: '0 -4px 20px rgba(46, 35, 31, 0.05)'
    }}>
      {navItems.map((item) => {
        const IconComponent = item.icon;
        
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              padding: '6px 12px',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              position: 'relative'
            })}
          >
            {({ isActive }) => (
              <>
                {/* Special Spin Floating Center Style */}
                {item.isSpecial ? (
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: isActive 
                      ? 'linear-gradient(135deg, #E0623A, #C85228)' 
                      : 'linear-gradient(135deg, #E0623A, #F59E0B)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '-18px',
                    boxShadow: '0 4px 14px rgba(224, 98, 58, 0.35)',
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 0.2s ease'
                  }}>
                    <IconComponent size={20} />
                  </div>
                ) : (
                  <div style={{ position: 'relative' }}>
                    <IconComponent 
                      size={22} 
                      strokeWidth={isActive ? 2.4 : 1.9}
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
                  letterSpacing: '-0.1px'
                }}>
                  {item.label}
                </span>

                {/* Subtle active dot */}
                {isActive && !item.isSpecial && (
                  <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--primary)'
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
