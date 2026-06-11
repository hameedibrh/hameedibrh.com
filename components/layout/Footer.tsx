'use client';

import { FiArrowUp } from 'react-icons/fi';
import { content } from '@/lib/content';
import { getIcon } from '@/lib/icons';

const { social, personal } = content;
const year = 2026;

export default function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] py-10">
      <div className="container-x flex flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-[var(--text-muted)]">
          © {year} {personal.name} · HI Studios. All rights reserved.
        </p>

        <ul className="flex items-center gap-2">
          {social.map((s) => {
            const Icon = getIcon(s.icon);
            return (
              <li key={s.platform}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="glass grid h-10 w-10 place-items-center rounded-full text-[var(--text-muted)] transition-all hover:-translate-y-1 hover:text-[var(--text)]"
                >
                  <Icon size={16} />
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#intro"
          aria-label="Back to top"
          className="glass grid h-10 w-10 place-items-center rounded-full text-[var(--text-muted)] transition-all hover:-translate-y-1 hover:text-[var(--text)]"
        >
          <FiArrowUp size={18} />
        </a>
      </div>
    </footer>
  );
}
