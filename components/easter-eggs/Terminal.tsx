'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiTerminal, FiX } from 'react-icons/fi';
import { content } from '@/lib/content';

const { personal, social, contact } = content;

type Line = { type: 'in' | 'out'; text: string };

const BANNER = [
  "Hameed Ibrahim — interactive shell  (type 'help')",
];

function run(cmd: string): string[] {
  const [name, ...args] = cmd.trim().split(/\s+/);
  switch (name.toLowerCase()) {
    case '':
      return [];
    case 'help':
      return [
        'available commands:',
        '  whoami      who is this guy',
        '  skills      what i work with',
        '  social      find me online',
        '  contact     how to reach me',
        '  sudo        nice try',
        '  theme       toggle dark / light',
        '  coffee      ☕',
        '  clear       wipe the screen',
        '  exit        close terminal',
      ];
    case 'whoami':
      return [`${personal.name} — ${personal.roles.join(', ')}.`, personal.tagline];
    case 'skills':
      return ['Java • JavaScript • Python • C++ • React • Node • Flutter • Figma • Adobe CC'];
    case 'social':
      return social.map((s) => `  ${s.platform.padEnd(10)} ${s.url}`);
    case 'contact':
      return [`email   ${contact.email}`, `phone   ${contact.phone}`, `where   ${contact.location.join(', ')}`];
    case 'sudo':
      return ['🔒 nice try. you have no power here. (this is a static site 😉)'];
    case 'coffee':
      return ['☕ brewing... done. +1 crazy idea.'];
    case 'theme': {
      const el = document.documentElement;
      const next = el.dataset.theme === 'light' ? 'dark' : 'light';
      el.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch {}
      return [`theme → ${next}`];
    }
    case 'echo':
      return [args.join(' ')];
    case 'ls':
      return ['about/  resume/  artworks/  services/  contact/  secrets.txt'];
    case 'cat':
      return args[0] === 'secrets.txt'
        ? ['try the ↑ ↑ ↓ ↓ ← → ← → B A combo somewhere on this page 👀']
        : [`cat: ${args[0] || ''}: use 'ls' to see what's here`];
    case 'date':
      return [new Date().toString()];
    default:
      return [`command not found: ${name}. type 'help'.`];
  }
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER.map((t) => ({ type: 'out', text: t })));
  const [value, setValue] = useState('');
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, lines]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = value;
    if (cmd.trim().toLowerCase() === 'clear') {
      setLines([]);
      setValue('');
      return;
    }
    if (cmd.trim().toLowerCase() === 'exit') {
      setOpen(false);
      setValue('');
      return;
    }
    const out = run(cmd).map((text): Line => ({ type: 'out', text }));
    setLines((prev) => [...prev, { type: 'in', text: cmd }, ...out]);
    setValue('');
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open terminal"
        className="glass glass-strong fixed bottom-5 left-5 z-[80] grid h-12 w-12 place-items-center rounded-full text-[var(--text)] shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        <FiTerminal size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="glass glass-strong fixed bottom-20 left-5 z-[80] flex h-80 w-[min(420px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl font-mono text-[13px]"
          >
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] px-4 py-2">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-[var(--text-muted)]">hameed@portfolio:~</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close terminal" className="text-[var(--text-muted)] hover:text-[var(--text)]">
                <FiX size={16} />
              </button>
            </div>

            <div ref={bodyRef} className="flex-1 space-y-0.5 overflow-y-auto px-4 py-3 leading-relaxed" onClick={() => inputRef.current?.focus()}>
              {lines.map((l, i) => (
                <div key={i} className={l.type === 'in' ? 'text-[var(--accent-1)]' : 'whitespace-pre-wrap text-[var(--text-muted)]'}>
                  {l.type === 'in' ? <span className="text-gradient">~$ </span> : null}
                  {l.text}
                </div>
              ))}
              <form onSubmit={submit} className="flex items-center gap-1">
                <span className="text-gradient">~$</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 bg-transparent text-[var(--text)] outline-none"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
