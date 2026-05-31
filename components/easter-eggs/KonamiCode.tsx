'use client';

import { useCallback, useEffect, useRef } from 'react';

import { useKonamiCode } from '@/hooks/useKonamiCode';

/**
 * KonamiCode - Easter egg component that renders a sparkle/confetti overlay
 * when the Konami code sequence is entered.
 *
 * The overlay is fixed position with pointer-events-none to avoid layout shift.
 * Auto-dismisses after 3 seconds.
 */
export function KonamiCode() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleActivate = useCallback(() => {
    // Timer is managed via the isActive state and effect below
  }, []);

  const { isActive, setIsActive } = useKonamiCode({ onActivate: handleActivate });

  useEffect(() => {
    if (isActive) {
      timerRef.current = setTimeout(() => {
        setIsActive(false);
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive, setIsActive]);

  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Sparkle particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={i}
          className="absolute animate-sparkle rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            backgroundColor: [
              '#8B5CF6',
              '#3B82F6',
              '#14B8A6',
              '#F59E0B',
              '#EF4444',
              '#EC4899',
            ][Math.floor(Math.random() * 6)],
            animationDelay: `${Math.random() * 1}s`,
            animationDuration: `${Math.random() * 1.5 + 1}s`,
          }}
        />
      ))}
    </div>
  );
}
