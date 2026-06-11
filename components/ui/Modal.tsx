'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { FiX, FiExternalLink } from 'react-icons/fi';
import type { PortfolioItem } from '@/lib/content';

function embedSrc(item: PortfolioItem): string {
  if (item.embedType === 'youtube') {
    return `https://www.youtube-nocookie.com/embed/${item.embedId}`;
  }
  // Instagram permalink embed — no external script needed.
  return `https://www.instagram.com/p/${item.embedId}/embed`;
}

export default function Modal({
  item,
  onClose,
}: {
  item: PortfolioItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
          <motion.div
            className="glass glass-strong relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-[var(--glass-border)] px-5 py-4">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-xs uppercase tracking-widest text-gradient">{item.category}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 place-items-center rounded-full text-[var(--text-muted)] transition hover:bg-[var(--glass-bg-strong)] hover:text-[var(--text)]"
              >
                <FiX size={20} />
              </button>
            </div>

            <div
              className={`relative w-full bg-black ${
                item.embedType === 'instagram' ? 'h-[70vh]' : 'aspect-video'
              }`}
            >
              <iframe
                key={item.id}
                src={embedSrc(item)}
                title={item.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <p className="hidden text-sm text-[var(--text-muted)] sm:block">{item.description}</p>
              <a
                href={item.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-gradient"
              >
                View original <FiExternalLink size={15} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
