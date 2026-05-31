'use client';

import Image from 'next/image';
import React from 'react';

import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { PersonalInfo, SkillCategory } from '@/lib/types';

interface AboutSectionProps {
  personalInfo: PersonalInfo;
  skills: SkillCategory[];
}

/**
 * About section with profile image, bio text, and skill categories
 * displayed in GlassCard components with animated progress bars.
 */
export function AboutSection({ personalInfo, skills }: AboutSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const reducedMotion = useReducedMotion();

  const animationClasses = reducedMotion
    ? 'opacity-100 translate-y-0'
    : isInView
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-6';

  const transitionClasses = reducedMotion ? '' : 'transition-all duration-500 ease-out';

  return (
    <section id="about" aria-label="About" className="py-20 px-4">
      <div ref={ref} className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 ${animationClasses} ${transitionClasses}`}
        >
          About
        </h2>

        {/* Profile and Bio */}
        <div
          className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${animationClasses} ${transitionClasses}`}
          style={{ transitionDelay: reducedMotion ? '0ms' : '100ms' }}
        >
          <div className="flex-shrink-0">
            <Image
              src={personalInfo.profileImage}
              alt={personalInfo.profileImageAlt}
              width={300}
              height={300}
              className="rounded-2xl object-cover max-w-[300px] w-full h-auto"
              priority
            />
          </div>
          <div className="flex-1">
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category) => (
            <GlassCard
              key={category.category}
              className={`${animationClasses} ${transitionClasses}`}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <ProgressBar
                    key={skill.name}
                    label={skill.name}
                    value={skill.proficiency}
                    animate={isInView}
                  />
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
