import { z, ZodSchema } from 'zod';
import fs from 'fs';

// --- Individual Schemas ---

/**
 * Validates PersonalInfo content.
 * Roles array must have 1–5 items, profileImageAlt 5–150 chars.
 */
export const personalInfoSchema = z.object({
  name: z.string().min(1),
  greeting: z.string().min(1),
  roles: z.array(z.string().min(1)).min(1).max(5),
  bio: z.string().min(1),
  profileImage: z.string().min(1),
  profileImageAlt: z.string().min(5).max(150),
  ctaLabel: z.string().min(1),
  ctaTarget: z.string().min(1),
});

/**
 * Validates a single SocialLink entry.
 * Platform max 50 chars, url must be a valid URL.
 */
export const socialLinkSchema = z.object({
  platform: z.string().min(1).max(50),
  url: z.string().url(),
  icon: z.string().min(1),
});

/** Validates an array of SocialLink entries. */
export const socialLinksSchema = z.array(socialLinkSchema);

/**
 * Validates a single Skill entry.
 * Proficiency must be between 0 and 100.
 */
export const skillSchema = z.object({
  name: z.string().min(1),
  proficiency: z.number().int().min(0).max(100),
});

/** Validates a single SkillCategory entry. */
export const skillCategorySchema = z.object({
  category: z.string().min(1),
  skills: z.array(skillSchema).min(1),
});

/** Validates an array of SkillCategory entries. */
export const skillsSchema = z.array(skillCategorySchema);

/**
 * Validates a single ExperienceEntry.
 * Description max 500 chars.
 */
export const experienceEntrySchema = z.object({
  role: z.string().min(1),
  organization: z.string().min(1),
  organizationUrl: z.string().url().optional(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  description: z.string().max(500),
});

/** Validates an array of ExperienceEntry entries. */
export const experienceSchema = z.array(experienceEntrySchema);

/**
 * Validates a single EducationEntry.
 * Description max 500 chars.
 */
export const educationEntrySchema = z.object({
  degree: z.string().min(1),
  institution: z.string().min(1),
  institutionUrl: z.string().url().optional(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  description: z.string().max(500),
});

/** Validates an array of EducationEntry entries. */
export const educationSchema = z.array(educationEntrySchema);

/**
 * Validates a single PortfolioItem.
 * thumbnailAlt 5–150 chars.
 */
export const portfolioItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  thumbnail: z.string().min(1),
  thumbnailAlt: z.string().min(5).max(150),
  description: z.string().min(1),
  externalUrl: z.string().url(),
});

/** Validates an array of PortfolioItem entries. */
export const portfolioSchema = z.array(portfolioItemSchema);

/**
 * Validates a single ServiceItem.
 * Description max 150 chars.
 */
export const serviceItemSchema = z.object({
  icon: z.string().min(1),
  title: z.string().min(1),
  description: z.string().max(150),
});

/** Validates an array of ServiceItem entries. */
export const servicesSchema = z.array(serviceItemSchema);

/**
 * Validates ContactInfo.
 * Email must be a valid email format.
 */
export const contactInfoSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  formspreeEndpoint: z.string().url(),
});

/** Validates the PersonSchema sub-object within SEOData. */
export const personSchemaSchema = z.object({
  name: z.string().min(1),
  jobTitle: z.string().min(1),
  url: z.string().url(),
  sameAs: z.array(z.string().url()),
});

/**
 * Validates SEOData.
 * Title 30–60 chars, description 50–160 chars.
 */
export const seoDataSchema = z.object({
  title: z.string().min(30).max(60),
  description: z.string().min(50).max(160),
  siteUrl: z.string().url(),
  ogImage: z.string().min(1),
  twitterHandle: z.string().optional(),
  personSchema: personSchemaSchema,
});

// --- Validation Utility ---

/**
 * Reads a JSON file from disk, parses it, and validates against the provided Zod schema.
 *
 * @param filePath - Absolute or relative path to the JSON content file
 * @param schema - Zod schema to validate the parsed data against
 * @returns The validated and typed data
 * @throws Error with descriptive message on invalid JSON or validation failure
 */
export function validateContent<T>(filePath: string, schema: ZodSchema<T>): T {
  let raw: string;
  try {
    raw = fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    throw new Error(
      `Content file not found or unreadable: ${filePath}\n  ${(err as Error).message}`
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    throw new Error(
      `Invalid JSON in content file: ${filePath}\n  ${(err as Error).message}`
    );
  }

  const result = schema.safeParse(parsed);

  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(
      `Content validation failed for ${filePath}:\n${errors}`
    );
  }

  return result.data;
}
