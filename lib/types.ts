/**
 * TypeScript type definitions for all content schemas.
 * These interfaces define the structure of JSON content files
 * used throughout the portfolio site.
 */

/**
 * Personal information displayed in the Hero and About sections.
 */
export interface PersonalInfo {
  /** Full display name */
  name: string;
  /** Greeting message shown in the Hero section */
  greeting: string;
  /**
   * Professional roles displayed with typing animation.
   * @minItems 1
   * @maxItems 5
   */
  roles: string[];
  /** Biography text for the About section */
  bio: string;
  /** Path to profile image relative to /public */
  profileImage: string;
  /**
   * Alt text for the profile image.
   * @minLength 5
   * @maxLength 150
   */
  profileImageAlt: string;
  /** Label text for the call-to-action button */
  ctaLabel: string;
  /** Target section anchor for the CTA button (e.g., "#about") */
  ctaTarget: string;
}

/**
 * A social media link displayed in the Hero section and Footer.
 */
export interface SocialLink {
  /**
   * Name of the social media platform.
   * @maxLength 50
   */
  platform: string;
  /** URL to the social media profile. Must be a valid URL. */
  url: string;
  /** Icon identifier from the react-icons library (e.g., "FaGithub") */
  icon: string;
}

/**
 * A group of skills under a common category.
 */
export interface SkillCategory {
  /** Category name (e.g., "Programming Languages", "Web Development") */
  category: string;
  /** List of skills within this category */
  skills: Skill[];
}

/**
 * An individual skill with a proficiency level.
 */
export interface Skill {
  /** Name of the skill */
  name: string;
  /**
   * Proficiency level as a percentage.
   * @minimum 0
   * @maximum 100
   */
  proficiency: number;
}

/**
 * A work experience entry displayed in the Resume section timeline.
 */
export interface ExperienceEntry {
  /** Job title or role */
  role: string;
  /** Company or organization name */
  organization: string;
  /** URL to the organization's website (optional) */
  organizationUrl?: string;
  /** Start date (ISO date string or descriptive text) */
  startDate: string;
  /** End date (ISO date string, "Present", or descriptive text) */
  endDate: string;
  /**
   * Description of responsibilities and achievements.
   * @maxLength 500
   */
  description: string;
}

/**
 * An education entry displayed in the Resume section timeline.
 */
export interface EducationEntry {
  /** Degree or certification name */
  degree: string;
  /** Educational institution name */
  institution: string;
  /** URL to the institution's website (optional) */
  institutionUrl?: string;
  /** Start date (ISO date string or descriptive text) */
  startDate: string;
  /** End date (ISO date string or descriptive text) */
  endDate: string;
  /**
   * Description of studies, achievements, or focus areas.
   * @maxLength 500
   */
  description: string;
}

/**
 * A portfolio item displayed in the Portfolio section gallery.
 */
export interface PortfolioItem {
  /** Unique identifier for the portfolio item */
  id: string;
  /** Display title of the portfolio item */
  title: string;
  /** Category label (e.g., "Web Design", "Illustration") */
  category: string;
  /** Path to the thumbnail image relative to /public */
  thumbnail: string;
  /**
   * Alt text for the thumbnail image.
   * @minLength 5
   * @maxLength 150
   */
  thumbnailAlt: string;
  /** Full description shown in the modal overlay */
  description: string;
  /** External URL to the project or artwork (opens in new tab) */
  externalUrl: string;
}

/**
 * A service offering displayed in the Services section.
 */
export interface ServiceItem {
  /** Icon identifier from the react-icons library (e.g., "FaCode") */
  icon: string;
  /** Service title */
  title: string;
  /**
   * Brief description of the service.
   * @maxLength 150
   */
  description: string;
}

/**
 * Contact information displayed alongside the contact form.
 */
export interface ContactInfo {
  /** Contact email address */
  email: string;
  /** Contact phone number */
  phone: string;
  /** Physical location or city */
  location: string;
  /** Formspree form endpoint URL for contact form submissions */
  formspreeEndpoint: string;
}

/**
 * SEO metadata used for meta tags, Open Graph, Twitter Cards, and structured data.
 */
export interface SEOData {
  /**
   * Page title for the title tag and OG title.
   * @minLength 30
   * @maxLength 60
   */
  title: string;
  /**
   * Meta description for search engines and social sharing.
   * @minLength 50
   * @maxLength 160
   */
  description: string;
  /** Canonical site URL */
  siteUrl: string;
  /** Path to the Open Graph image */
  ogImage: string;
  /** Twitter handle (optional, e.g., "@username") */
  twitterHandle?: string;
  /** JSON-LD Person schema data for structured data */
  personSchema: PersonSchema;
}

/**
 * JSON-LD Person schema data for structured data / SEO.
 */
export interface PersonSchema {
  /** Full name for the Person schema */
  name: string;
  /** Job title for the Person schema */
  jobTitle: string;
  /** Canonical URL for the Person schema */
  url: string;
  /** Array of social profile URLs for the sameAs property */
  sameAs: string[];
}
