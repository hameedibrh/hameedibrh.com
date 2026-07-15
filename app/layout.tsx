import type { Metadata, Viewport } from 'next';
import { Poppins, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider, themeInitScript } from '@/components/ThemeProvider';
import HelenaChat from '@/components/chat/HelenaChat';
import { content } from '@/lib/content';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const { seo } = content;

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: content.personal.name }],
  creator: content.personal.name,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: seo.locale,
    url: seo.siteUrl,
    siteName: content.personal.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: seo.ogImage, width: 1200, height: 1200, alt: content.personal.name }],
  },
  twitter: {
    card: 'summary_large_image',
    site: seo.twitterHandle,
    creator: seo.twitterHandle,
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    { media: '(prefers-color-scheme: light)', color: '#eef1f8' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: seo.personSchema.name,
  jobTitle: seo.personSchema.jobTitle,
  url: seo.personSchema.url,
  image: seo.personSchema.image,
  email: seo.personSchema.email,
  alumniOf: seo.personSchema.alumniOf,
  worksFor: { '@type': 'Organization', name: seo.personSchema.worksFor },
  address: {
    '@type': 'PostalAddress',
    addressLocality: seo.personSchema.address.city,
    addressRegion: seo.personSchema.address.region,
    addressCountry: seo.personSchema.address.country,
  },
  sameAs: seo.personSchema.sameAs,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="aurora" aria-hidden>
          <span />
        </div>
        <div className="grid-overlay" aria-hidden />
        <ThemeProvider>{children}</ThemeProvider>
        <HelenaChat />
      </body>
    </html>
  );
}
