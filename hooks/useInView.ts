'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

/**
 * A hook wrapping the Intersection Observer API for scroll-triggered animations.
 * Returns a callback ref to attach to elements and a boolean indicating visibility.
 *
 * @param options.threshold - Visibility ratio to trigger (default 0.2 for 20%)
 * @param options.triggerOnce - If true, stays triggered once visible (default true)
 * @param options.rootMargin - Root margin for the observer (default '0px')
 * @returns { ref, isInView } where ref is a callback ref and isInView is the visibility state
 */
export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.2, triggerOnce = true, rootMargin = '0px' } = options;
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (node) {
        observerRef.current = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              if (triggerOnce && observerRef.current) {
                observerRef.current.disconnect();
              }
            } else if (!triggerOnce) {
              setIsInView(false);
            }
          },
          { threshold, rootMargin }
        );
        observerRef.current.observe(node);
      }

      elementRef.current = node;
    },
    [threshold, triggerOnce, rootMargin]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { ref, isInView };
}
