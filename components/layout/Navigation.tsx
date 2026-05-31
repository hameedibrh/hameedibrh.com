'use client';

import { useState, useEffect, useCallback } from 'react';

import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '#resume' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Fixed top navigation bar with glassmorphism backdrop, smooth scroll links,
 * active section tracking via Intersection Observer, and responsive hamburger menu.
 */
export function Navigation() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollToSection } = useSmoothScroll();

  // Track active section via Intersection Observer
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (
      entries: IntersectionObserverEntry[],
      sectionId: string
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(sectionId);
        }
      });
    };

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => handleIntersect(entries, sectionId),
          {
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0,
          }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      scrollToSection(href);
      setIsMobileMenuOpen(false);
    },
    [scrollToSection]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>, href: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToSection(href);
        setIsMobileMenuOpen(false);
      }
    },
    [scrollToSection]
  );

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main"
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
    >
      <div className="mx-auto max-w-7xl px-4x sm:px-6x">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Site name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            onKeyDown={(e) => handleKeyDown(e, '#hero')}
            className="text-lg font-bold text-gray-900 dark:text-white
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-primary-red rounded"
          >
            HI
          </a>

          {/* Desktop nav links */}
          <ul className="hidden sm:flex items-center gap-1x">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    onKeyDown={(e) => handleKeyDown(e, item.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative px-3x py-1x text-sm font-medium rounded transition-colors duration-300 ease-in-out
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:outline-primary-red
                      ${
                        isActive
                          ? 'text-primary-red dark:text-primary-blue'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-red dark:hover:text-primary-blue'
                      }`}
                  >
                    {item.label}
                    {/* Active indicator underline */}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-3x right-3x h-0.5 bg-gradient-to-r from-primary-red to-primary-orange dark:from-primary-blue dark:to-primary-green rounded-full"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right side: ThemeToggle + Hamburger */}
          <div className="flex items-center gap-1x">
            <ThemeToggle />

            {/* Hamburger menu button (mobile only) */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="sm:hidden flex items-center justify-center w-11 h-11 rounded-full
                text-gray-700 dark:text-gray-200
                hover:bg-gray-200/60 dark:hover:bg-gray-700/60
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-primary-red
                transition-colors duration-300 ease-in-out"
            >
              <span className="sr-only">
                {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {/* Hamburger icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer (inline for now, MobileDrawer component will be separate) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="sm:hidden glass-nav border-t border-glass-border"
          role="menu"
        >
          <ul className="flex flex-col py-2x px-4x gap-1x">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;

              return (
                <li key={item.href} role="none">
                  <a
                    href={item.href}
                    role="menuitem"
                    onClick={(e) => handleNavClick(e, item.href)}
                    onKeyDown={(e) => handleKeyDown(e, item.href)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`block px-3x py-2x text-base font-medium rounded transition-colors duration-300 ease-in-out
                      focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                      focus-visible:outline-primary-red
                      ${
                        isActive
                          ? 'text-primary-red dark:text-primary-blue bg-primary-red/10 dark:bg-primary-blue/10'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-red dark:hover:text-primary-blue hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                      }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}
