import type { Metadata } from 'next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { content } from '@/lib/content';
import { tools } from '@/lib/devtools/registry';
import DevToolsApp from './DevToolsApp';

export const metadata: Metadata = {
  title: 'Dev Tools — Hameed Ibrahim',
  description: `A free toolbox of ${tools.length} client-side developer utilities: JSON/XML formatters, converters, encoders, hash & UUID generators, regex tester, diff checker and more. Nothing leaves your browser.`,
  alternates: { canonical: '/dev-tools/' },
  openGraph: {
    title: 'Dev Tools — Hameed Ibrahim',
    description: `${tools.length} fast, private, client-side developer utilities.`,
    url: `${content.seo.siteUrl}/dev-tools/`,
    images: [{ url: content.seo.ogImage }],
  },
};

export default function Page() {
  return (
    <>
      <Navigation />
      <main className="min-h-[100svh] pb-24">
        <DevToolsApp />
      </main>
      <Footer />
    </>
  );
}
