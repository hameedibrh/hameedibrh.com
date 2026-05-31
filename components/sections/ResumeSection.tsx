'use client';

import React from 'react';

import { Timeline } from '@/components/ui/Timeline';
import type { ExperienceEntry, EducationEntry } from '@/lib/types';

interface ResumeSectionProps {
  experience: ExperienceEntry[];
  education: EducationEntry[];
}

/**
 * Resume section with work experience and education timelines.
 * Hides a category if it has zero entries.
 */
export function ResumeSection({ experience, education }: ResumeSectionProps) {
  const experienceEntries = experience.map((entry) => ({
    title: entry.role,
    subtitle: entry.organization,
    date: `${entry.startDate} – ${entry.endDate}`,
    description: entry.description,
    url: entry.organizationUrl,
  }));

  const educationEntries = education.map((entry) => ({
    title: entry.degree,
    subtitle: entry.institution,
    date: `${entry.startDate} – ${entry.endDate}`,
    description: entry.description,
    url: entry.institutionUrl,
  }));

  return (
    <section id="resume" aria-label="Resume" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Resume
        </h2>

        {experience.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Work Experience
            </h3>
            <Timeline entries={experienceEntries} />
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Education
            </h3>
            <Timeline entries={educationEntries} />
          </div>
        )}
      </div>
    </section>
  );
}
