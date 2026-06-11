import type { MetadataRoute } from 'next';
import { content } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: content.seo.siteUrl,
      lastModified: new Date('2026-06-11'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
