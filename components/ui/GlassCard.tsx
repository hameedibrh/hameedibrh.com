import type { ReactNode } from 'react';

/** Frosted-glass surface used everywhere. `interactive` adds the hover glow + lift. */
export default function GlassCard({
  children,
  className = '',
  interactive = false,
  strong = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className={[
        'glass rounded-3xl',
        strong ? 'glass-strong' : '',
        interactive ? 'glow-hover' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
