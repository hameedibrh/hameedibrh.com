// Central, typed access to all editable content.
// Everything a visitor sees comes from content/*.json — edit those, never the components.
import personal from '@/content/personal.json';
import social from '@/content/social.json';
import about from '@/content/about.json';
import experience from '@/content/experience.json';
import education from '@/content/education.json';
import services from '@/content/services.json';
import portfolio from '@/content/portfolio.json';
import stats from '@/content/stats.json';
import contact from '@/content/contact.json';
import seo from '@/content/seo.json';

export type Personal = typeof personal;
export type Social = (typeof social)[number];
export type About = typeof about;
export type Experience = (typeof experience)[number];
export type Education = (typeof education)[number];
export type Service = (typeof services)[number];
export type PortfolioItem = (typeof portfolio)[number];
export type Stat = (typeof stats)[number];
export type Contact = typeof contact;
export type Seo = typeof seo;

export const content = {
  personal,
  social,
  about,
  experience,
  education,
  services,
  portfolio,
  stats,
  contact,
  seo,
} as const;

// Navigation is derived once here so the nav and section ids never drift apart.
export const navLinks = [
  { id: 'intro', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'portfolio', label: 'Creative' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
] as const;
