'use client';

import { FaBriefcase, FaGraduationCap } from 'react-icons/fa6';
import type { IconType } from 'react-icons';
import { content, type Experience, type Education } from '@/lib/content';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Reveal from '../ui/Reveal';

const { experience, education } = content;

type Entry = {
  title: string;
  org: string;
  orgUrl?: string;
  dates: string;
  description: string;
};

function toEntry(e: Experience | Education): Entry {
  if ('role' in e) {
    return {
      title: e.role,
      org: e.organization,
      orgUrl: 'organizationUrl' in e ? e.organizationUrl : undefined,
      dates: `${e.startDate} – ${e.endDate}`,
      description: e.description,
    };
  }
  return {
    title: e.degree,
    org: e.institution,
    orgUrl: e.institutionUrl,
    dates: `${e.startDate} – ${e.endDate}`,
    description: e.description,
  };
}

function Timeline({ items, Icon }: { items: Entry[]; Icon: IconType }) {
  return (
    <div className="relative ml-2 mt-8 space-y-6 border-l border-[var(--glass-border)] pl-8">
      {items.map((item, i) => (
        <Reveal key={`${item.title}-${i}`} delayIndex={i} as="div" className="relative">
          <span className="absolute -left-[2.85rem] top-1 grid h-9 w-9 place-items-center rounded-full text-white [background:var(--accent-grad)]">
            <Icon size={14} />
          </span>
          <GlassCard interactive className="p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-lg font-bold">{item.title}</h4>
              <span className="rounded-full bg-[var(--glass-bg-strong)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]">
                {item.dates}
              </span>
            </div>
            <p className="mt-1 font-semibold text-gradient">
              {item.orgUrl ? (
                <a href={item.orgUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {item.org}
                </a>
              ) : (
                item.org
              )}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
          </GlassCard>
        </Reveal>
      ))}
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="Resume"
          title="My professional journey."
          subtitle="Enterprise software development across banking, payments, and fintech — plus the leadership experience that shapes how I work."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <h3 className="text-2xl font-bold">Work Experience</h3>
            </Reveal>
            <Timeline items={experience.map(toEntry)} Icon={FaBriefcase} />
          </div>
          <div>
            <Reveal>
              <h3 className="text-2xl font-bold">Education</h3>
            </Reveal>
            <Timeline items={education.map(toEntry)} Icon={FaGraduationCap} />
          </div>
        </div>
      </div>
    </section>
  );
}
