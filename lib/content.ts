import path from 'path';
import { validateContent } from './validation';
import {
  personalInfoSchema,
  socialLinksSchema,
  skillsSchema,
  experienceSchema,
  educationSchema,
  portfolioSchema,
  servicesSchema,
  contactInfoSchema,
  seoDataSchema,
} from './validation';
import type {
  PersonalInfo,
  SocialLink,
  SkillCategory,
  ExperienceEntry,
  EducationEntry,
  PortfolioItem,
  ServiceItem,
  ContactInfo,
  SEOData,
} from './types';

const contentDir = path.join(process.cwd(), 'content');

export function getPersonalInfo(): PersonalInfo {
  return validateContent(path.join(contentDir, 'personal.json'), personalInfoSchema);
}

export function getSocialLinks(): SocialLink[] {
  return validateContent(path.join(contentDir, 'social.json'), socialLinksSchema);
}

export function getSkills(): SkillCategory[] {
  return validateContent(path.join(contentDir, 'skills.json'), skillsSchema);
}

export function getExperience(): ExperienceEntry[] {
  return validateContent(path.join(contentDir, 'experience.json'), experienceSchema);
}

export function getEducation(): EducationEntry[] {
  return validateContent(path.join(contentDir, 'education.json'), educationSchema);
}

export function getPortfolio(): PortfolioItem[] {
  return validateContent(path.join(contentDir, 'portfolio.json'), portfolioSchema);
}

export function getServices(): ServiceItem[] {
  return validateContent(path.join(contentDir, 'services.json'), servicesSchema);
}

export function getContactInfo(): ContactInfo {
  return validateContent(path.join(contentDir, 'contact.json'), contactInfoSchema);
}

export function getSEOData(): SEOData {
  return validateContent(path.join(contentDir, 'seo.json'), seoDataSchema);
}
