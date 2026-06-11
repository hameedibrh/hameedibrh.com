'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/** Animated skill bar that fills to `value`% when scrolled into view. */
export default function ProgressBar({ label, value }: { label: string; value: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-semibold text-[var(--text-muted)]">{value}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[var(--glass-bg-strong)]">
        <motion.div
          className="h-full rounded-full [background:var(--accent-grad)]"
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
