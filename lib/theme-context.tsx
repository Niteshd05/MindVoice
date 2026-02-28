'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeType = 'warm-earth' | 'cool-slate' | 'soft-lavender' | 'sage-green';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('warm-earth');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted flag immediately
    setIsMounted(true);

    // Retrieve saved theme from localStorage
    const savedTheme = localStorage.getItem('mindvoice-theme') as ThemeType | null;
    if (savedTheme && ['warm-earth', 'cool-slate', 'soft-lavender', 'sage-green'].includes(savedTheme)) {
      setTheme(savedTheme);
      // Update document class immediately
      document.documentElement.setAttribute('class', `theme-${savedTheme}`);
    } else {
      document.documentElement.setAttribute('class', 'theme-warm-earth');
    }
  }, []);

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem('mindvoice-theme', newTheme);
    document.documentElement.setAttribute('class', `theme-${newTheme}`);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {isMounted ? children : null}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
