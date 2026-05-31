'use client';

import { FiMoon, FiSun } from 'react-icons/fi';

import { useTheme } from '@/hooks/useTheme';

/**
 * Theme toggle button that switches between light and dark mode.
 * Displays a sun icon in light mode and a moon icon in dark mode.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      aria-pressed={isDark}
      className="relative flex items-center justify-center w-11 h-11 rounded-full
        text-gray-700 dark:text-gray-200
        hover:bg-gray-200/60 dark:hover:bg-gray-700/60
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-primary-red
        transition-colors duration-300 ease-in-out"
    >
      <span className="relative w-5 h-5">
        {/* Sun icon — visible in light mode */}
        <FiSun
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out ${
            isDark
              ? 'opacity-0 rotate-90 scale-0'
              : 'opacity-100 rotate-0 scale-100'
          }`}
          aria-hidden="true"
        />
        {/* Moon icon — visible in dark mode */}
        <FiMoon
          className={`absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          }`}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
