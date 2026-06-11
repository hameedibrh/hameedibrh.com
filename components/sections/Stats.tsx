'use client';

import { content } from '@/lib/content';
import { getIcon } from '@/lib/icons';
import GlassCard from '../ui/GlassCard';
import Reveal from '../ui/Reveal';
import CountUp from '../ui/CountUp';

const { stats } = content;

export default function Stats() {
  return (
    <section className="section-pad pt-0">
      <div className="container-x">
        <Reveal>
          <GlassCard className="grid grid-cols-2 gap-6 p-8 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map((stat) => {
              const Icon = getIcon(stat.icon);
              return (
                <div key={stat.label} className="text-center">
                  <Icon className="mx-auto mb-3 text-2xl text-[var(--accent-1)]" />
                  <p className="text-3xl font-black sm:text-4xl">
                    <CountUp value={stat.value} />
                    {stat.value >= 1000 && '+'}
                  </p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
