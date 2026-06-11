'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { tools, categories } from '@/lib/devtools/registry';
import GlassCard from '@/components/ui/GlassCard';

export default function DevToolsApp() {
  const [activeId, setActiveId] = useState(tools[0].id);
  const [query, setQuery] = useState('');

  // Deep-link via hash (#json-formatter) so a tool can be shared/bookmarked.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (tools.some((t) => t.id === id)) setActiveId(id);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const select = (id: string) => {
    setActiveId(id);
    history.replaceState(null, '', `#${id}`);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return tools;
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q)),
    );
  }, [query]);

  const active = tools.find((t) => t.id === activeId)!;
  const ActiveComponent = active.Component;

  return (
    <div className="container-x pt-28">
      <header className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gradient">Dev Tools</p>
        <h1 className="text-balance text-4xl font-bold sm:text-5xl">The developer toolbox.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-[var(--text-muted)]">
          {tools.length} fast, private, client-side tools — nothing you type ever leaves your browser.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[290px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative mb-4">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-faint)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools…"
              className="w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] py-3 pl-11 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-[var(--ring)]"
            />
          </div>

          <nav className="max-h-[60vh] space-y-4 overflow-y-auto pr-1 lg:max-h-[70vh]">
            {categories.map((cat) => {
              const items = filtered.filter((t) => t.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat}>
                  <p className="mb-1.5 px-2 text-xs font-bold uppercase tracking-wider text-[var(--text-faint)]">{cat}</p>
                  <ul className="space-y-1">
                    {items.map((t) => {
                      const Icon = t.icon;
                      const on = t.id === activeId;
                      return (
                        <li key={t.id}>
                          <button
                            onClick={() => select(t.id)}
                            className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition ${
                              on ? 'glass glass-strong font-semibold text-[var(--text)]' : 'text-[var(--text-muted)] hover:bg-[var(--glass-bg)]'
                            }`}
                          >
                            <Icon className={on ? 'text-[var(--accent-1)]' : ''} size={16} />
                            {t.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            {!filtered.length && <p className="px-2 text-sm text-[var(--text-faint)]">No tools match “{query}”.</p>}
          </nav>
        </aside>

        {/* Active tool */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <GlassCard className="p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl text-white [background:var(--accent-grad)]">
                  <active.icon />
                </span>
                <div>
                  <h2 className="text-xl font-bold">{active.name}</h2>
                  <p className="text-sm text-[var(--text-muted)]">{active.description}</p>
                </div>
              </div>
              <ActiveComponent />
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
