import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/ThemeProvider';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import seoData from '@/content/seo.json';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL(seoData.siteUrl || 'https://hameedibrh.com'),
  title: seoData.title || 'Hameed Ibrahim - Portfolio',
  description:
    seoData.description || 'Personal portfolio website of Hameed Ibrahim',
  openGraph: {
    title: seoData.title || 'Hameed Ibrahim - Portfolio',
    description:
      seoData.description || 'Personal portfolio website of Hameed Ibrahim',
    url: seoData.siteUrl || 'https://hameedibrh.com',
    type: 'website',
    images: [{ url: seoData.ogImage || '/images/profile-pic.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoData.title || 'Hameed Ibrahim - Portfolio',
    description:
      seoData.description || 'Personal portfolio website of Hameed Ibrahim',
    images: [seoData.ogImage || '/images/profile-pic.jpg'],
  },
};

const themeScript = `
  (function() {
    var stored = null;
    try { stored = localStorage.getItem('theme'); } catch(e) {}
    var theme = stored || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
  })();
`;

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: seoData.personSchema.name,
  jobTitle: seoData.personSchema.jobTitle,
  url: seoData.personSchema.url,
  sameAs: seoData.personSchema.sameAs,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <SkipToContent />
          <header>
            <Navigation />
          </header>
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
