'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

/** Fades + lifts its children into view once, when scrolled to. */
export default function Reveal({
  children,
  delayIndex = 0,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delayIndex?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      className={className}
      custom={delayIndex}
      variants={variants}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </MotionTag>
  );
}
