'use client';

import { useCallback, useState } from 'react';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

const API_URL = process.env.NEXT_PUBLIC_HELENA_API_URL ?? '';

const GREETING: ChatMessage = {
  role: 'assistant',
  content: "Hi, I'm Helena. Ask me about Hameed's experience, skills, projects, or how to get in touch.",
};

function dropTrailingPlaceholder(messages: ChatMessage[]): ChatMessage[] {
  const last = messages[messages.length - 1];
  if (last && last.role === 'assistant' && last.content === '') {
    return messages.slice(0, -1);
  }
  return messages;
}

/** Drives the Helena chat panel: message history + streaming send. */
export function useHelenaChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || pending) return;

      if (!API_URL) {
        setError('Helena is not configured yet.');
        return;
      }

      const history = [...messages, { role: 'user' as const, content: trimmed }];
      setMessages([...history, { role: 'assistant', content: '' }]);
      setPending(true);
      setError(null);

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        });

        if (res.status === 429) {
          setError('My boss Hameed has ordered me to take rest for a while. Please come back after a while.');
          setMessages((prev) => dropTrailingPlaceholder(prev));
          return;
        }

        if (!res.ok || !res.body) {
          throw new Error(`Request failed (${res.status})`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            next[next.length - 1] = { ...last, content: last.content + chunk };
            return next;
          });
        }
      } catch {
        setError("Couldn't reach Helena right now — try again in a moment.");
        setMessages((prev) => dropTrailingPlaceholder(prev));
      } finally {
        setPending(false);
      }
    },
    [messages, pending],
  );

  return { messages, pending, error, send };
}
