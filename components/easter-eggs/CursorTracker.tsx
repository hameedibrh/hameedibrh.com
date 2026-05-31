'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CursorTrackerProps {
  children: React.ReactNode;
}

/**
 * CursorTracker - Parallax cursor effect component.
 *
 * Tracks mousemove events within its bounds and applies a CSS transform
 * (translate) with max 20px offset via Framer Motion spring animation.
 *
 * Disables on touch-only devices and when prefers-reduced-motion is active.
 */
export function CursorTracker({ children }: CursorTrackerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  useEffect(() => {
    // Check if the device has a fine pointer (mouse)
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(pointer: fine)');
      setIsPointerFine(mq.matches);

      const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || reducedMotion || !isPointerFine) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate offset proportional to cursor distance from center, max 20px
      const maxOffset = 20;
      const offsetX = ((e.clientX - centerX) / (rect.width / 2)) * maxOffset;
      const offsetY = ((e.clientY - centerY) / (rect.height / 2)) * maxOffset;

      x.set(Math.max(-maxOffset, Math.min(maxOffset, offsetX)));
      y.set(Math.max(-maxOffset, Math.min(maxOffset, offsetY)));
    },
    [reducedMotion, isPointerFine, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  // If reduced motion or touch-only, render children without effect
  if (reducedMotion || !isPointerFine) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <motion.div style={{ x: springX, y: springY }}>{children}</motion.div>
    </div>
  );
}
