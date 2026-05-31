'use client';

import React, { createContext, useCallback, useEffect, useState } from 'react';

export interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  systemPreference: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
}

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getStoredTheme(): 'light' | 'dark' | null {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage unavailable — graceful degradation
  }
  return null;
}

function storeTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // localStorage unavailable — graceful degradation
  }
}

function applyThemeClass(theme: 'light' | 'dark'): void {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
}

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  const [systemPreference, setSystemPreference] = useState<'light' | 'dark'>(
    () => getSystemPreference()
  );

  // Initialize theme from what's already on the HTML element (set by the
  // flash-prevention inline script), falling back to stored → system → default.
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return defaultTheme ?? 'light';

    // Sync with the class already applied by the inline script
    const root = document.documentElement;
    if (root.classList.contains('dark')) return 'dark';
    if (root.classList.contains('light')) return 'light';

    // Fallback chain
    return getStoredTheme() ?? defaultTheme ?? getSystemPreference();
  });

  // Enable CSS transitions for theme changes after initial mount
  useEffect(() => {
    const root = document.documentElement;
    // Add transition styles for smooth theme switching (≤300ms)
    root.style.setProperty(
      'transition',
      'background-color 300ms ease, color 300ms ease'
    );

    return () => {
      root.style.removeProperty('transition');
    };
  }, []);

  // Listen for OS color scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const newPreference = e.matches ? 'dark' : 'light';
      setSystemPreference(newPreference);

      // If no stored preference, follow the system
      if (getStoredTheme() === null) {
        setTheme(newPreference);
        applyThemeClass(newPreference);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Sync the HTML class whenever theme state changes
  useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    storeTheme(newTheme);
    applyThemeClass(newTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, systemPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}
