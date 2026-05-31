'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: 'button';
    href?: never;
  };

type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: 'a';
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary-red via-primary-orange to-primary-yellow text-white hover:shadow-lg hover:shadow-primary-red/30 dark:hover:shadow-primary-red/40',
  secondary:
    'glass border border-glass-border text-primary-red dark:text-primary-orange hover:bg-white/20 dark:hover:bg-white/10',
  ghost:
    'bg-transparent text-gray-700 dark:text-gray-200 hover:text-primary-red dark:hover:text-primary-orange hover:bg-gray-100/50 dark:hover:bg-gray-800/50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[44px] min-w-[44px]',
  md: 'px-6 py-3 text-base min-h-[44px] min-w-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[44px] min-w-[44px]',
};

/**
 * Button component with primary, secondary, and ghost variants.
 * Supports rendering as `<button>` or `<a>` via the `as` prop.
 * Ensures minimum 44x44px touch target on mobile.
 * Visible focus indicator with ≥3:1 contrast.
 */
export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    ...rest
  } = props;

  const classes = [
    'inline-flex items-center justify-center rounded-xl font-medium',
    'transition-all duration-300 ease-in-out',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (props.as === 'a') {
    const { as: _as, variant: _v, size: _s, ...anchorProps } = props;
    return (
      <a className={classes} {...(anchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  const { as: _as, variant: _v, size: _s, ...buttonProps } = props;
  return (
    <button className={classes} {...(buttonProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
