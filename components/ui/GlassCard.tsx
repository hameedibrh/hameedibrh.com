'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  animate?: boolean;
  as?: React.ElementType;
}

/**
 * Reusable glassmorphism container component.
 * Applies backdrop-filter blur with translucent background using the `.glass` utility class.
 * Supports optional hover lift+glow effect and entrance animation via Framer Motion.
 * Polymorphic via the `as` prop for semantic element choice.
 */
export function GlassCard({
  children,
  className = '',
  hover = false,
  animate = false,
  as: Component = 'div',
}: GlassCardProps) {
  const reducedMotion = useReducedMotion();

  const hoverClasses = hover
    ? 'transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-lg hover:shadow-primary-red/20 dark:hover:shadow-primary-red/30'
    : '';

  const baseClasses = `glass p-6 ${hoverClasses} ${className}`.trim();

  if (animate && !reducedMotion) {
    const MotionComponent = motion(Component);
    return (
      <MotionComponent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={baseClasses}
      >
        {children}
      </MotionComponent>
    );
  }

  return <Component className={baseClasses}>{children}</Component>;
}
