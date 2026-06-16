'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';
import { navLinks, content } from '@/lib/content';
import ThemeToggle from '../ui/ThemeToggle';

// Section links resolve to the home page so they work from any route.
const links = [
  ...navLinks.map((l) => ({ id: l.id, label: l.label, href: `/#${l.id}` })),
  { id: 'tools', label: 'Dev Tools', href: '/dev-tools/' },
];

export default function Navigation() {
  const pathname = usePathname();
  const onTools = pathname?.startsWith('/dev-tools');
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('intro');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the section currently in view (home page only).
  useEffect(() => {
    if (onTools) {
      setActive('tools');
      return;
    }
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onTools]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
            scrolled ? 'glass glass-strong' : 'bg-transparent'
          }`}
        >
          <a href="/" className="group flex items-center gap-2 font-bold tracking-tight">
            <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full [background:var(--accent-grad)]">
              <Image
                src="/images/logo.png"
                alt="HI logo"
                width={22}
                height={22}
                className="object-contain"
              />
            </span>
            <span className="hidden sm:inline">{content.personal.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active === link.id
                      ? 'text-[var(--text)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[var(--glass-bg-strong)]"
                      transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="glass grid h-10 w-10 place-items-center rounded-full md:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <FiMenu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              className="glass glass-strong absolute right-0 top-0 flex h-full w-72 flex-col gap-2 p-6 pt-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <button
                className="mb-4 grid h-10 w-10 place-items-center self-end rounded-full text-[var(--text-muted)]"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <FiX size={22} />
              </button>
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-lg font-medium transition-colors ${
                    active === link.id
                      ? 'bg-[var(--glass-bg-strong)] text-[var(--text)]'
                      : 'text-[var(--text-muted)]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
