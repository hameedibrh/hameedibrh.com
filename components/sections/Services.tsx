'use client';

import { content } from '@/lib/content';
import { getIcon } from '@/lib/icons';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Reveal from '../ui/Reveal';

const { services } = content;

export default function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          title="What can I do for you?"
          subtitle="I do a lot of things — here are a few I genuinely do great."
          center
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <Reveal key={s.title} delayIndex={i % 3} as="div">
                <GlassCard interactive className="h-full p-7">
                  <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl text-2xl text-white [background:var(--accent-grad)]">
                    <Icon />
                  </span>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                    {s.description}
                  </p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
