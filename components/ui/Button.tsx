import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  href?: string;
  variant?: 'solid' | 'ghost';
  className?: string;
  external?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]';

const styles = {
  solid:
    'text-white shadow-lg shadow-[rgba(79,140,255,0.35)] [background:var(--accent-grad)] hover:shadow-xl hover:shadow-[rgba(168,85,247,0.45)] hover:-translate-y-0.5',
  ghost:
    'glass text-[var(--text)] hover:bg-[var(--glass-bg-strong)] hover:-translate-y-0.5',
};

export default function Button({
  children,
  href,
  variant = 'solid',
  className = '',
  external,
  onClick,
  type = 'button',
}: Props) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
