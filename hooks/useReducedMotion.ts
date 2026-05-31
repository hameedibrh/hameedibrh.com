'use client';

import { useState, useEffect } from 'react';

/**
 * Detects the user's prefers-reduced-motion system preference.
 * Listens for changes to the media query and returns a boolean
 * indicating if reduced motion is preferred.
 *
 * @returns true if the user prefers reduced motion, false otherwise
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}
