'use client';

import React from 'react';

import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TimelineEntry {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  url?: string;
}

interface TimelineProps {
  entries: TimelineEntry[];
  icon?: React.ReactNode;
}

/**
 * Vertical timeline layout component for resume entries.
 * Each entry fades in + slides on scroll into view.
 * Respects reduced motion preference.
 */
export function Timeline({ entries, icon }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-red via-primary-green to-primary-blue" />

      <div className="space-y-8">
        {entries.map((entry, index) => (
          <TimelineItem key={index} entry={entry} icon={icon} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ entry, icon }: { entry: TimelineEntry; icon?: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });

  const animationClasses = reducedMotion
    ? 'opacity-100 translate-y-0'
    : isInView
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-4';

  const transitionClasses = reducedMotion
    ? ''
    : 'transition-all duration-300 ease-out';

  return (
    <div
      ref={ref}
      className={`relative pl-10 ${animationClasses} ${transitionClasses}`}
    >
      {/* Timeline dot/icon */}
      <div className="absolute left-2 top-1 w-5 h-5 flex items-center justify-center rounded-full bg-primary-red text-white text-xs">
        {icon || (
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
        )}
      </div>

      {/* Entry content */}
      <div className="glass p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
          <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {entry.title}
          </h4>
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {entry.date}
          </span>
        </div>
        {entry.url ? (
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary-red dark:text-primary-blue hover:underline"
          >
            {entry.subtitle}
          </a>
        ) : (
          <p className="text-sm font-medium text-primary-red dark:text-primary-blue">
            {entry.subtitle}
          </p>
        )}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {entry.description}
        </p>
      </div>
    </div>
  );
}
