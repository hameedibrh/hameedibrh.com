'use client';

import { useCallback, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

/** Navigation items matching the desktop Navigation component */
const NAV_ITEMS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

/**
 * Slide-out mobile navigation drawer that appears from the right side.
 * Visible only on viewports below 640px. Includes nav links, theme toggle,
 * and glassmorphism styling with smooth slide animation.
 */
export function MobileDrawer({ isOpen, onClose, activeSection }: MobileDrawerProps) {
  const { scrollToSection } = useSmoothScroll();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the close button when drawer opens
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      scrollToSection(href);
      onClose();
    },
    [scrollToSection, onClose]
  );

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 sm:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={handleBackdropClick}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[80vw] sm:hidden
          backdrop-blur-glass bg-white/80 dark:bg-black/60 border-l border-glass-border
          shadow-xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Close button */}
        <div className="flex items-center justify-end p-4">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="flex items-center justify-center w-11 h-11 rounded-full
              text-gray-700 dark:text-gray-200
              hover:bg-gray-200/60 dark:hover:bg-gray-700/60
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-primary-red
              transition-colors duration-200 ease-in-out"
          >
            <FiX className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation links */}
        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col px-4 space-y-1">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center w-full min-h-[44px] px-4 py-3 rounded-xl
                      text-base font-medium
                      transition-colors duration-200 ease-in-out
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:outline-primary-red
                      ${
                        isActive
                          ? 'text-primary-red bg-primary-red/10 dark:bg-primary-red/20'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200/60 dark:hover:bg-gray-700/60'
                      }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Theme toggle */}
        <div className="px-8 pt-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

/**
 * Hamburger menu button that triggers the mobile drawer.
 * Only visible below 640px viewport width.
 * Meets 44x44px minimum touch target requirement.
 */
export function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      aria-controls="mobile-nav-drawer"
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      className="flex items-center justify-center w-11 h-11 rounded-full sm:hidden
        text-gray-700 dark:text-gray-200
        hover:bg-gray-200/60 dark:hover:bg-gray-700/60
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-primary-red
        transition-colors duration-200 ease-in-out"
    >
      <FiMenu className="w-6 h-6" aria-hidden="true" />
    </button>
  );
}
