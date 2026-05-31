'use client';

import { FaGithub, FaBehance, FaInstagram, FaTwitter, FaYoutube, FaFacebook } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa6';
import socialLinks from '@/content/social.json';
import type { SocialLink } from '@/lib/types';

/**
 * Footer - Site footer component
 *
 * Displays copyright text, social media icon links, and a back-to-top button.
 * Uses semantic <footer> element with clean, minimal design.
 *
 * Validates: Requirements 13.3
 */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaGithub,
  FaBehance,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebook,
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function Footer() {
  const links = socialLinks as SocialLink[];

  return (
    <footer className="border-t border-glass-border bg-surface-light dark:bg-surface-dark py-10 px-6">
      <div className="mx-auto max-w-5xl flex flex-col items-center gap-6">
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-red dark:hover:text-primary-red transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red rounded-lg px-3 py-2 min-h-[44px] min-w-[44px]"
        >
          <FaArrowUp className="h-4 w-4" />
          Back to top
        </button>

        {/* Social media links */}
        <nav aria-label="Social media links" className="flex items-center gap-4">
          {links.map((link) => {
            const Icon = iconMap[link.icon];
            if (!Icon) return null;
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${link.platform} profile`}
                className="flex items-center justify-center h-11 w-11 rounded-full text-gray-600 dark:text-gray-400 hover:text-primary-red dark:hover:text-primary-red hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </nav>

        {/* Copyright text */}
        <p className="text-sm text-gray-500 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Hameed Ibrahim. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
