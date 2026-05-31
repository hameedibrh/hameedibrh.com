'use client';

import { useContext } from 'react';

import { ThemeContext, ThemeContextValue } from '@/components/ThemeProvider';

/**
 * Hook to access the current theme state and toggle function.
 * Must be used within a ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
