import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-8xl font-black text-gradient">404</p>
        <h1 className="mt-4 text-2xl font-bold">Lost in space.</h1>
        <p className="mt-2 text-[var(--text-muted)]">This page drifted off into the void.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white [background:var(--accent-grad)]"
        >
          Take me home
        </Link>
      </div>
    </main>
  );
}
