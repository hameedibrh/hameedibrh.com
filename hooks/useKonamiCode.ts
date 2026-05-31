'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

interface UseKonamiCodeOptions {
  onActivate: () => void;
}

/**
 * Hook that listens for the Konami code key sequence.
 * Maintains a buffer of recent key presses and compares against the sequence.
 * Calls `onActivate` when the full sequence is matched.
 */
export function useKonamiCode({ onActivate }: UseKonamiCodeOptions) {
  const [isActive, setIsActive] = useState(false);
  const bufferRef = useRef<string[]>([]);
  const onActivateRef = useRef(onActivate);

  // Keep callback ref up to date
  useEffect(() => {
    onActivateRef.current = onActivate;
  }, [onActivate]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Use e.code for letter keys, e.key for arrow keys
    const key = e.key.startsWith('Arrow') ? e.key : `Key${e.key.toUpperCase()}`;

    bufferRef.current = [...bufferRef.current, key].slice(-KONAMI_SEQUENCE.length);

    if (
      bufferRef.current.length === KONAMI_SEQUENCE.length &&
      bufferRef.current.every((k, i) => k === KONAMI_SEQUENCE[i])
    ) {
      setIsActive(true);
      bufferRef.current = [];
      onActivateRef.current();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { isActive, setIsActive };
}
