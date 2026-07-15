// Regenerates helena-api/data/profile.json from content/*.json.
// Run this after editing content/ so Helena's answers stay in sync with the site.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const contentDir = path.join(root, 'content');
const outFile = path.join(root, 'helena-api', 'data', 'profile.json');

const readJson = (name) => JSON.parse(readFileSync(path.join(contentDir, `${name}.json`), 'utf8'));

const personal = readJson('personal');
const about = readJson('about');
const experience = readJson('experience');
const education = readJson('education');
const services = readJson('services');
const portfolio = readJson('portfolio');
const contact = readJson('contact');
const social = readJson('social');

const profile = {
  name: personal.name,
  tagline: personal.tagline,
  bio: personal.bio,
  roles: personal.roles,
  about: {
    profileText: about.profileText,
    skillsText: about.skillsText,
    skills: about.info,
  },
  experience: experience.map(({ role, organization, startDate, endDate, description }) => ({
    role,
    organization,
    startDate,
    endDate,
    description,
  })),
  education: education.map(({ degree, institution, startDate, endDate, description }) => ({
    degree,
    institution,
    startDate,
    endDate,
    description,
  })),
  services: services.map(({ title, description }) => ({ title, description })),
  portfolioCategories: [...new Set(portfolio.map((p) => p.category))],
  portfolioHighlights: portfolio.slice(0, 6).map(({ title, category, description }) => ({
    title,
    category,
    description,
  })),
  contact: {
    email: contact.email,
    location: contact.location.join(', '),
  },
  social: social.map(({ platform, url }) => ({ platform, url })),
};

writeFileSync(outFile, JSON.stringify(profile, null, 2) + '\n');
console.log(`Wrote ${outFile}`);
