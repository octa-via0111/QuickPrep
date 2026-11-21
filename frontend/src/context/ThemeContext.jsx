import React, { createContext, useContext, useState, useEffect } from 'react';

const THEME_KEY = 'quickprep_theme';

const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {}
    return 'light';
  });

  const applyTheme = (targetTheme) => {
    try {
      document.documentElement.setAttribute('data-theme', targetTheme);
      document.body.setAttribute('data-theme', targetTheme);
      localStorage.setItem(THEME_KEY, targetTheme);
    } catch (e) {}
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme) => {
    if (newTheme === 'dark' || newTheme === 'light') {
      setThemeState(newTheme);
    }
  };

  const value = {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;
