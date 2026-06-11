'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

const ACCENTS = ['#4f8cff', '#a855f7', '#38bdf8', '#f472b6'];

export default function KonamiCode() {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === SEQUENCE[pos] ? pos + 1 : key === SEQUENCE[0] ? 1 : 0;
      if (pos === SEQUENCE.length) {
        pos = 0;
        fire();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function fire() {
    const end = Date.now() + 1200;
    (function frame() {
      confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0 }, colors: ACCENTS });
      confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1 }, colors: ACCENTS });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    setToast(true);
    setTimeout(() => setToast(false), 3500);
  }

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          className="glass glass-strong fixed bottom-6 left-1/2 z-[120] -translate-x-1/2 rounded-2xl px-6 py-4 text-center"
        >
          <p className="text-lg font-bold text-gradient">🎮 Konami Code unlocked!</p>
          <p className="text-sm text-[var(--text-muted)]">You found a secret. You&apos;re officially a geek. 🤝</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
