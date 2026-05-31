'use client';

import { useState, useEffect, useCallback } from 'react';

import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TypingAnimationProps {
  words: string[];
  className?: string;
}

/**
 * Typing animation component that cycles through words with a typing/deleting effect.
 * Shows a blinking cursor during the animation.
 * When prefers-reduced-motion is active, shows static first word.
 */
export function TypingAnimation({ words, className = '' }: TypingAnimationProps) {
  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = words[wordIndex] || '';

  const tick = useCallback(() => {
    if (isDeleting) {
      setDisplayText((prev) => prev.slice(0, -1));
    } else {
      setDisplayText((prev) => currentWord.slice(0, prev.length + 1));
    }
  }, [currentWord, isDeleting]);

  useEffect(() => {
    if (reducedMotion || words.length === 0) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentWord) {
      // Pause at full word before deleting
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText === '') {
      // Move to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      // Typing or deleting speed
      const speed = isDeleting ? 50 : 100;
      timeout = setTimeout(tick, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWord, tick, reducedMotion, words]);

  // Reduced motion: show static first word
  if (reducedMotion) {
    return (
      <span className={className} aria-label={words[0]}>
        {words[0]}
      </span>
    );
  }

  return (
    <span className={`${className} inline-flex items-center`} aria-label={currentWord}>
      <span>{displayText}</span>
      <span
        className="inline-block w-0.5 h-[1.1em] ml-0.5 bg-current animate-pulse"
        aria-hidden="true"
      />
    </span>
  );
}
