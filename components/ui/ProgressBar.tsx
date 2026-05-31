'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number;
  label: string;
  animate?: boolean;
}

/**
 * Animated progress bar component for skill proficiency display.
 * Fills from 0 to value over 800-1200ms when `animate` is true.
 * Respects reduced motion preference (instant fill).
 * Includes proper ARIA attributes for accessibility.
 */
export function ProgressBar({ value, label, animate = false }: ProgressBarProps) {
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(animate && !reducedMotion ? 0 : value);

  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));

  useEffect(() => {
    if (animate && !reducedMotion) {
      // Small delay to ensure the initial 0 width renders first
      const timer = setTimeout(() => {
        setDisplayValue(clampedValue);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(clampedValue);
    }
  }, [animate, reducedMotion, clampedValue]);

  const transitionStyle =
    animate && !reducedMotion
      ? { transition: 'width 1000ms ease-out' }
      : {};

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {clampedValue}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-red via-primary-orange to-primary-green"
          style={{
            width: `${displayValue}%`,
            ...transitionStyle,
          }}
        />
      </div>
    </div>
  );
}
