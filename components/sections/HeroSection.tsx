'use client';

import React from 'react';
import {
  FaGithub,
  FaBehance,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebook,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

import { Button } from '@/components/ui/Button';
import { TypingAnimation } from '@/components/ui/TypingAnimation';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { PersonalInfo, SocialLink } from '@/lib/types';

const iconMap: Record<string, IconType> = {
  FaGithub,
  FaBehance,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaFacebook,
};

interface HeroSectionProps {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
}

/**
 * Full-viewport hero section with typing animation, social links, CTA,
 * and animated gradient mesh background.
 */
export function HeroSection({ personalInfo, socialLinks }: HeroSectionProps) {
  const { scrollToSection } = useSmoothScroll();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div
        className={`absolute inset-0 -z-10 ${reducedMotion ? '' : 'animate-gradient-mesh'}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-pink/15 via-primary-red/10 to-primary-blue/15 dark:from-primary-pink/25 dark:via-primary-red/15 dark:to-primary-blue/20" />
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-pink/12 dark:bg-primary-pink/20 blur-3xl ${reducedMotion ? '' : 'animate-blob'}`}
        />
        <div
          className={`absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-primary-yellow/12 dark:bg-primary-orange/18 blur-3xl ${reducedMotion ? '' : 'animate-blob animation-delay-2000'}`}
        />
        <div
          className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-primary-green/10 dark:bg-primary-green/18 blur-3xl ${reducedMotion ? '' : 'animate-blob animation-delay-4000'}`}
        />
        <div
          className={`absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-primary-blue/10 dark:bg-primary-blue/18 blur-3xl ${reducedMotion ? '' : 'animate-blob animation-delay-2000'}`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4">
          {personalInfo.greeting}
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
          {personalInfo.name}
        </h1>

        <div className="text-xl md:text-2xl text-primary-red dark:text-primary-orange mb-8">
          <TypingAnimation words={personalInfo.roles} />
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${link.platform} profile`}
                className="flex items-center justify-center w-11 h-11 rounded-full
                  text-gray-600 dark:text-gray-400
                  hover:text-primary-red dark:hover:text-primary-orange
                  hover:bg-red-50/50 dark:hover:bg-gray-800/50
                  transition-colors duration-300
                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-primary-red"
              >
                {Icon && <Icon size={22} aria-hidden="true" />}
              </a>
            );
          })}
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={() => scrollToSection(personalInfo.ctaTarget)}
        >
          {personalInfo.ctaLabel}
        </Button>
      </div>
    </section>
  );
}
