'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi';
import { useHelenaChat } from './useHelenaChat';

/** Floating chat launcher + panel for Helena, the site's guide assistant. */
export default function HelenaChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, pending, error, send } = useHelenaChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || pending) return;
    send(input);
    setInput('');
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat with Helena' : 'Chat with Helena'}
        className="fixed bottom-6 right-6 z-[90] grid h-14 w-14 place-items-center rounded-full text-white shadow-lg shadow-[rgba(79,140,255,0.35)] [background:var(--accent-grad)] transition-shadow hover:shadow-xl hover:shadow-[rgba(168,85,247,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Chat with Helena"
            className="glass helena-panel fixed bottom-24 right-4 z-[90] flex h-[min(70vh,560px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          >
            <div className="flex items-center gap-3 border-b border-[var(--glass-border)] px-4 py-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white [background:var(--accent-grad)]">
                H
              </div>
              <div>
                <p className="text-sm font-semibold">Helena</p>
                <p className="text-xs text-[var(--text-muted)]">Ask about Hameed&apos;s work</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'ml-auto text-white [background:var(--accent-grad)]'
                      : 'bg-[var(--glass-bg-strong)] text-[var(--text)]'
                  }`}
                >
                  {m.content || (pending && i === messages.length - 1 ? '···' : '')}
                </div>
              ))}
              {error && <p className="text-xs text-red-400">{error}</p>}
            </div>

            <form
              onSubmit={submit}
              className="flex items-center gap-2 border-t border-[var(--glass-border)] p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Helena anything…"
                disabled={pending}
                className="flex-1 rounded-full bg-[var(--glass-bg-strong)] px-4 py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-faint)] focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              />
              <button
                type="submit"
                disabled={pending || !input.trim()}
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white [background:var(--accent-grad)] disabled:opacity-40"
              >
                <FiSend size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
