'use client';

import { useEffect } from 'react';

/** Prints a friendly ASCII greeting for any dev who opens the console. */
export default function ConsoleGreeting() {
  useEffect(() => {
    const title = 'color:#a855f7;font-size:14px;font-weight:bold';
    const muted = 'color:#a2a4b5;font-size:12px';
    const link = 'color:#4f8cff;font-size:12px';
    /* eslint-disable no-console */
    console.log(
      `%c
 ██╗  ██╗██╗
 ██║  ██║██║
 ███████║██║
 ██╔══██║██║
 ██║  ██║██║
 ╚═╝  ╚═╝╚═╝  Hameed Ibrahim
`,
      'color:#4f8cff;font-family:monospace',
    );
    console.log('%cHey, curious dev! 👋', title);
    console.log('%cLike what you see? This site is Next.js + Framer Motion, statically exported.', muted);
    console.log('%cPsst — there\'s a terminal in the bottom-left, and a Konami code hidden somewhere. ↑↑↓↓←→←→ B A', muted);
    console.log('%chttps://github.com/hameedibrh', link);
    /* eslint-enable no-console */
  }, []);

  return null;
}
