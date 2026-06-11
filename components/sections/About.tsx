'use client';

import Image from 'next/image';
import { FaGithub } from 'react-icons/fa6';
import { content } from '@/lib/content';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Reveal from '../ui/Reveal';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';

const { personal, about } = content;

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-x">
        <SectionHeading eyebrow="About" title="Let me introduce myself." />

        <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
          <Reveal>
            <GlassCard className="overflow-hidden p-0">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={personal.profileImage}
                  alt={personal.profileImageAlt}
                  fill
                  sizes="320px"
                  className="object-cover"
                  priority
                />
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delayIndex={1}>
            <p className="text-lg leading-relaxed text-[var(--text-muted)]">{personal.bio}</p>
            <p className="mt-4 leading-relaxed text-[var(--text-muted)]">{about.profileText}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <GlassCard className="h-full p-7">
              <h3 className="mb-5 text-xl font-bold">Profile</h3>
              <ul className="space-y-4">
                {about.info.map((row) => (
                  <li key={row.label}>
                    <p className="text-sm font-semibold text-gradient">{row.label}</p>
                    <p className="text-[var(--text-muted)]">{row.value}</p>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delayIndex={1}>
            <GlassCard className="h-full p-7">
              <h3 className="mb-2 text-xl font-bold">Skills</h3>
              <p className="mb-6 text-sm text-[var(--text-muted)]">{about.skillsText}</p>
              <div className="space-y-5">
                {about.bars.map((bar) => (
                  <ProgressBar key={bar.label} label={bar.label} value={bar.value} />
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>

        <Reveal className="mt-12 text-center">
          <h3 className="mb-5 text-xl font-semibold">{personal.githubBlurb}</h3>
          <Button href={personal.githubUrl} external>
            <FaGithub size={18} /> GitHub
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
