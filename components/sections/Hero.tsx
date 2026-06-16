'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiArrowDown } from 'react-icons/fi';
import { content } from '@/lib/content';
import { getIcon } from '@/lib/icons';
import Button from '../ui/Button';

const { personal, social } = content;

/** Cycles through the roles with a typewriter effect. */
function TypingRoles() {
  const roles = personal.roles;
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[index];
    if (!deleting && sub === full) {
      const t = setTimeout(() => setDeleting(true), 1400);
      return () => clearTimeout(t);
    }
    if (deleting && sub === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
      return;
    }
    const t = setTimeout(
      () => setSub(full.substring(0, sub.length + (deleting ? -1 : 1))),
      deleting ? 45 : 85,
    );
    return () => clearTimeout(t);
  }, [sub, deleting, index, roles]);

  return (
    <span className="text-gradient">
      {sub}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-[var(--accent-2)] align-middle" style={{ height: '1em' }} />
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { damping: 20 });

  // "Cursor magnet" — a soft accent orb that trails the pointer across the hero.
  const orbX = useSpring(0, { damping: 30, stiffness: 120 });
  const orbY = useSpring(0, { damping: 30, stiffness: 120 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
    orbX.set(e.clientX - rect.left);
    orbY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="intro"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-28"
    >
      <motion.div
        className="pointer-events-none absolute hidden h-72 w-72 rounded-full md:block"
        style={{
          left: orbX,
          top: orbY,
          x: '-50%',
          y: '-50%',
          background: 'radial-gradient(circle, var(--aurora-2), transparent 70%)',
          filter: 'blur(40px)',
          opacity: 0.6,
        }}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col-reverse items-center gap-12 lg:flex-row lg:items-center lg:justify-between">
        {/* Text column */}
        <motion.div
          className="flex-1 text-center [transform-style:preserve-3d] lg:text-left"
          style={{ rotateX, rotateY }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 font-mono text-sm tracking-widest text-[var(--text-muted)]"
          >
            {personal.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-balance text-5xl font-black sm:text-7xl lg:text-8xl"
          >
            I&apos;m {personal.name.split(' ')[0]}
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> </span>
            {personal.name.split(' ').slice(1).join(' ')}.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 flex min-h-[2.5rem] items-center justify-center text-2xl font-semibold sm:text-3xl lg:justify-start"
          >
            <TypingRoles />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-[var(--text-muted)] lg:mx-0"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Button href={personal.ctaTarget}>{personal.ctaLabel}</Button>
            <Button href="#contact" variant="ghost">
              Let&apos;s talk
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex items-center justify-center gap-3 lg:justify-start"
          >
            {social.map((s) => {
              const Icon = getIcon(s.icon);
              return (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="glass grid h-11 w-11 place-items-center rounded-full text-[var(--text-muted)] transition-all hover:-translate-y-1 hover:text-[var(--text)]"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* Portrait column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-shrink-0"
        >
          {/* Gradient glow behind card */}
          <div
            className="absolute inset-0 -z-10 scale-110 rounded-3xl blur-3xl"
            style={{ background: 'var(--accent-grad)', opacity: 0.3 }}
          />
          <div className="glass overflow-hidden rounded-3xl p-1" style={{ boxShadow: '0 0 40px var(--aurora-1)' }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              width={320}
              height={420}
              className="rounded-[1.25rem] object-cover"
            >
              <source src="/images/compcrop.webm" type="video/webm" />
              <source src="/images/compcrop.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-faint)]"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <FiArrowDown size={22} />
      </motion.a>
    </section>
  );
}
