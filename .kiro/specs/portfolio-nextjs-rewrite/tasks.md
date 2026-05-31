# Implementation Plan: Portfolio Next.js Rewrite

## Overview

Rewrite hameedibrh.com as a modern Next.js 14+ static portfolio site with TypeScript strict mode, Tailwind CSS, glassmorphism UI, light/dark theme, content layer, and comprehensive SEO. Implementation follows a bottom-up approach: scaffolding → content layer → theme → layout → UI components → sections → easter eggs → SEO → performance → accessibility polish.

## Tasks

- [x] 1. Project scaffolding and configuration
  - [x] 1.1 Initialize Next.js 14+ project with TypeScript strict mode and App Router
    - Run `npx create-next-app@latest portfolio-nextjs --typescript --tailwind --app --src-dir=false`
    - Configure `tsconfig.json` with `strict: true`, path aliases (`@/` → root)
    - Configure `next.config.ts` with `output: 'export'`, `trailingSlash: true` for GitHub Pages
    - Install dependencies: `framer-motion`, `react-icons`, `zod`
    - Install dev dependencies: `vitest`, `@testing-library/react`, `axe-core`, `eslint`, `prettier`
    - Set up `package.json` scripts for build, dev, test, lint
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 1.2 Configure Tailwind CSS with custom theme tokens and glassmorphism utilities
    - Extend `tailwind.config.ts` with color tokens (primary purple/blue/teal, glass backgrounds, surface colors)
    - Add `darkMode: 'class'` configuration
    - Add custom `backdropBlur`, animation keyframes (`fade-in`, `slide-up`, `typing`)
    - Configure 8px spacing grid system
    - Create `app/globals.css` with Tailwind directives, `.glass` and `.glass-nav` utility classes, and `@supports` fallback for `backdrop-filter`
    - _Requirements: 3.1, 3.2, 3.3, 3.5, 3.7_

  - [x] 1.3 Configure fonts using next/font module
    - Import Inter (sans-serif) and Lora (serif) from `next/font/google` in `app/layout.tsx`
    - Set `display: 'swap'` and CSS variables (`--font-sans`, `--font-serif`)
    - Apply font variables to `<html>` element and configure in Tailwind
    - _Requirements: 12.3_

- [x] 2. Content layer implementation
  - [x] 2.1 Create TypeScript type definitions for all content schemas
    - Create `lib/types.ts` with interfaces: `PersonalInfo`, `SocialLink`, `SkillCategory`, `Skill`, `ExperienceEntry`, `EducationEntry`, `PortfolioItem`, `ServiceItem`, `ContactInfo`, `SEOData`
    - Include all field constraints as JSDoc comments (max lengths, ranges, formats)
    - _Requirements: 2.2, 2.4_

  - [x] 2.2 Create Zod validation schemas for build-time content validation
    - Create `lib/validation.ts` with Zod schemas matching each TypeScript interface
    - Enforce string length constraints (name max 50, description max 500, etc.)
    - Validate URL formats, email formats, proficiency range 0–100
    - Implement `validateContent<T>(filePath, schema)` function that throws descriptive errors on failure
    - _Requirements: 2.4, 2.6, 2.7_

  - [x] 2.3 Create content loading utilities
    - Create `lib/content.ts` with functions to load and validate each content file
    - Export typed getter functions: `getPersonalInfo()`, `getSocialLinks()`, `getSkills()`, `getExperience()`, `getEducation()`, `getPortfolio()`, `getServices()`, `getContactInfo()`, `getSEOData()`
    - Each function reads from `/content/*.json`, validates with Zod, and returns typed data
    - _Requirements: 2.1, 2.3_

  - [x] 2.4 Create all JSON content files with existing site data
    - Create `content/personal.json` with name, greeting, roles, bio, profile image info
    - Create `content/social.json` with social media links array
    - Create `content/skills.json` with skill categories and proficiency levels
    - Create `content/experience.json` with work experience entries (most recent first)
    - Create `content/education.json` with education entries (most recent first)
    - Create `content/portfolio.json` with portfolio items (id, title, category, thumbnail, description, URL)
    - Create `content/services.json` with service offerings
    - Create `content/contact.json` with contact info and Formspree endpoint
    - Create `content/seo.json` with SEO metadata, OG tags, person schema
    - _Requirements: 2.1, 2.2, 2.5_

  - [ ]* 2.5 Write unit tests for content validation logic
    - Test valid content files pass validation
    - Test missing required fields produce descriptive errors
    - Test invalid JSON produces parse error
    - Test string length violations are caught
    - Test URL and email format validation
    - _Requirements: 2.6, 2.7_

- [x] 3. Theme system implementation
  - [x] 3.1 Create ThemeProvider context and useTheme hook
    - Create `hooks/useTheme.ts` with `ThemeContextValue` interface (`theme`, `toggleTheme`, `systemPreference`)
    - Implement OS color scheme detection via `prefers-color-scheme` media query
    - Implement localStorage read/write with graceful fallback when unavailable
    - Apply `'light'` or `'dark'` class to `<html>` element
    - Animate theme transition with duration ≤300ms
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.6_

  - [x] 3.2 Implement flash prevention inline script in root layout
    - Add inline `<script>` in `app/layout.tsx` `<head>` that reads localStorage theme or OS preference and sets class on `<html>` before first paint
    - Ensure script runs synchronously before React hydration
    - _Requirements: 4.7_

  - [x] 3.3 Create ThemeToggle UI component
    - Create `components/ui/ThemeToggle.tsx` with sun/moon icon toggle
    - Add `aria-label="Toggle dark mode"` and `aria-pressed` attributes
    - Apply transition animation between icons
    - _Requirements: 4.1, 4.3, 15.3_

  - [ ]* 3.4 Write property test for theme consistency
    - **Property 1: Theme Consistency**
    - Verify rendered theme always matches stored localStorage value or OS preference
    - **Validates: Requirements 4.2, 4.4, 4.7**

- [x] 4. Layout components
  - [x] 4.1 Create SkipToContent accessibility component
    - Create `components/layout/SkipToContent.tsx` as first focusable element
    - Link targets `#main` content area
    - Visually hidden until focused, then visible with high contrast
    - _Requirements: 15.6_

  - [x] 4.2 Create Navigation component with glassmorphism and active section tracking
    - Create `components/layout/Navigation.tsx` with fixed positioning and `glass-nav` styling
    - Implement Intersection Observer to track active section
    - Render nav links from section list with active indicator
    - Apply `backdrop-filter: blur(12px)` with translucent background
    - Full keyboard navigation with visible 2px focus indicators (≥3:1 contrast)
    - Include ThemeToggle in nav bar
    - _Requirements: 3.4, 1.6, 15.2, 11.2_

  - [x] 4.3 Create MobileDrawer component for responsive navigation
    - Create `components/layout/MobileDrawer.tsx` as slide-out drawer below 640px
    - Hamburger menu icon trigger with `aria-expanded` and `aria-controls`
    - Close on: outside tap, nav link click, close button
    - Ensure 44x44px minimum touch targets
    - _Requirements: 11.2, 11.3_

  - [x] 4.4 Create Footer component
    - Create `components/layout/Footer.tsx` with copyright, social links, and back-to-top
    - Use semantic `<footer>` element
    - _Requirements: 13.3_

  - [x] 4.5 Create useSmoothScroll hook
    - Create `hooks/useSmoothScroll.ts` implementing `scrollIntoView({ behavior: 'smooth' })`
    - Scroll duration between 300ms and 800ms
    - Handle anchor link clicks from navigation
    - _Requirements: 1.6_

  - [x] 4.6 Create useInView hook for scroll-triggered animations
    - Create `hooks/useInView.ts` wrapping Intersection Observer API
    - Configurable threshold (default 0.2 for 20% visibility trigger)
    - Return boolean `isInView` and ref to attach to elements
    - _Requirements: 6.4, 7.3_

  - [x] 4.7 Create useReducedMotion hook
    - Create `hooks/useReducedMotion.ts` detecting `prefers-reduced-motion: reduce`
    - Listen for changes to the media query
    - Return boolean indicating if reduced motion is preferred
    - _Requirements: 15.7, 5.6_

- [x] 5. Checkpoint - Ensure foundation builds correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. UI components
  - [x] 6.1 Create GlassCard component
    - Create `components/ui/GlassCard.tsx` with `backdrop-filter: blur(10–20px)`, translucent background (alpha 0.1–0.3)
    - Support `hover` prop for lift animation (`translateY(-4px to -8px)`) + colored `box-shadow` glow
    - Support `animate` prop for entrance animation via Framer Motion
    - Polymorphic `as` prop for semantic element choice
    - CSS `@supports` fallback for solid semi-opaque background
    - Dark mode adaptation (darker translucent tones)
    - _Requirements: 3.1, 3.7, 9.3_

  - [x] 6.2 Create Button component with variants
    - Create `components/ui/Button.tsx` with primary, secondary, ghost variants
    - Apply transitions (200–400ms ease) on hover/focus
    - Ensure minimum 44x44px touch target on mobile
    - Visible focus indicator with ≥3:1 contrast
    - _Requirements: 3.5, 11.3, 15.2_

  - [x] 6.3 Create Modal component with focus trap and accessibility
    - Create `components/ui/Modal.tsx` with `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
    - Implement keyboard focus trap within modal when open
    - Close on Escape key, outside click, or close button
    - Return focus to `triggerRef` element on close
    - Prevent body scroll while open
    - Apply glassmorphism overlay backdrop
    - _Requirements: 8.5, 15.4_

  - [x] 6.4 Create ProgressBar component for skill proficiency
    - Create `components/ui/ProgressBar.tsx` with animated fill (800–1200ms)
    - Add `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
    - Respect reduced motion (instant fill when active)
    - _Requirements: 6.3, 15.3_

  - [x] 6.5 Create Timeline component for resume entries
    - Create `components/ui/Timeline.tsx` with vertical timeline layout
    - Support fade-in + slide entrance animation (200–400ms) on scroll into view
    - Display role title, date range, organization, description
    - Respect reduced motion
    - _Requirements: 7.1, 7.3, 7.4_

  - [x] 6.6 Create TypingAnimation component for hero roles
    - Create `components/ui/TypingAnimation.tsx` cycling through roles array sequentially
    - Typing/deleting effect with cursor blink
    - When reduced motion is active, show static first role text
    - _Requirements: 5.1, 5.6_

  - [ ]* 6.7 Write unit tests for Modal focus trap behavior
    - Test focus is trapped within modal when open
    - Test Escape key closes modal
    - Test focus returns to trigger element on close
    - **Property 4: Modal Focus Invariant**
    - **Validates: Requirements 15.4, 8.5**

- [x] 7. Section components
  - [x] 7.1 Create HeroSection component
    - Create `components/sections/HeroSection.tsx` with full-viewport layout
    - Display name, greeting, and TypingAnimation with roles from content
    - Render social media icon buttons with accessible labels (`aria-label="Visit [platform] profile"`)
    - Open social links in new tab with `rel="noopener noreferrer"`
    - CTA button smooth-scrolling to About section
    - Animated gradient mesh background (behind content, no legibility impact)
    - Use `<h1>` for owner name
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 13.3, 15.8_

  - [x] 7.2 Create AboutSection component
    - Create `components/sections/AboutSection.tsx` with profile image, bio, and skill cards
    - Profile image with max-width 300px, maintained aspect ratio, alt text from content
    - Skills grouped by category in GlassCard components
    - ProgressBar for each skill proficiency
    - Entrance animations triggered at 20% viewport visibility
    - Use `<h2>` for section heading
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 15.1, 15.8_

  - [x] 7.3 Create ResumeSection component
    - Create `components/sections/ResumeSection.tsx` with dual timeline layout
    - Work experience timeline (most recent first) using Timeline component
    - Education timeline (most recent first) using Timeline component
    - Hide category if content layer has zero entries
    - Use `<h2>` for section heading, `<h3>` for sub-headings
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 15.8_

  - [x] 7.4 Create PortfolioSection component with gallery grid and modal
    - Create `components/sections/PortfolioSection.tsx` with responsive grid (1/2/3 columns)
    - Each item: thumbnail at consistent aspect ratio, title, category label
    - Hover effect: scale 1.05 + glassmorphism overlay (200–400ms transition)
    - Click opens Modal with full details (title, category, description, external link)
    - External link opens in new tab
    - Use `<h2>` for section heading
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 15.8_

  - [x] 7.5 Create ServicesSection component
    - Create `components/sections/ServicesSection.tsx` with responsive GlassCard grid (1/2/3 columns)
    - Each card: icon, title, description (max 150 chars)
    - Hover: lift animation (`translateY(-4px to -8px)`) + colored box-shadow glow (200–400ms)
    - Hide section if zero service entries in content
    - Use `<h2>` for section heading
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 15.8_

  - [x] 7.6 Create ContactSection component with form and validation
    - Create `components/sections/ContactSection.tsx` with form and contact info display
    - Form fields: name (max 100), email (max 254), subject (max 200), message (max 2000)
    - Create `hooks/useFormValidation.ts` with client-side validation rules
    - Inline error messages per invalid field
    - Submit to Formspree endpoint; show loading state (disable button + indicator)
    - Display success message on 2xx; display error message on failure, preserve form data
    - Display contact info (email, phone, location) from content alongside form
    - Use `<h2>` for section heading
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 15.8_

  - [ ]* 7.7 Write property test for form validation completeness
    - **Property 8: Form Validation Completeness**
    - Verify form submits if and only if all fields pass validation rules
    - Test boundary conditions for all field length limits
    - Test email format validation
    - **Validates: Requirements 10.2, 10.3, 10.5**

- [x] 8. Checkpoint - Ensure all sections render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Easter eggs implementation
  - [x] 9.1 Create Konami code easter egg
    - Create `hooks/useKonamiCode.ts` listening for ↑↑↓↓←→←→BA key sequence
    - Create `components/easter-eggs/KonamiCode.tsx` rendering visual overlay effect (1–5 seconds)
    - Effect renders as overlay without layout shift (CLS = 0)
    - Auto-dismiss after animation completes
    - _Requirements: 14.1, 14.2, 14.3_

  - [x] 9.2 Create cursor parallax tracker easter egg
    - Create `components/easter-eggs/CursorTracker.tsx` tracking mouse position in Hero section
    - Apply CSS transform (translate max 20px, rotate max 10 degrees) via Framer Motion
    - Disable on touch-only devices (check pointer events support)
    - Disable when `prefers-reduced-motion` is active
    - _Requirements: 14.1, 14.4, 14.5_

- [x] 10. Compose page and wire all components together
  - [x] 10.1 Create root layout with providers, fonts, metadata, and theme script
    - Wire `app/layout.tsx` with ThemeProvider, font variables, inline theme script
    - Add SkipToContent as first element
    - Add Navigation in `<header>`
    - Wrap children in `<main id="main">`
    - Add Footer
    - Add JSON-LD structured data script
    - Use semantic HTML structure (header, main, footer)
    - _Requirements: 1.1, 13.3, 13.4, 15.6_

  - [x] 10.2 Create main page composing all sections
    - Wire `app/page.tsx` importing all section components
    - Load content data and pass as props to each section
    - Sections ordered: Hero, About, Resume, Portfolio, Services, Contact
    - Each section wrapped in `<section>` with `id` and `aria-label`
    - Integrate KonamiCode and CursorTracker components
    - _Requirements: 1.6, 13.3, 15.8_

- [x] 11. SEO implementation
  - [x] 11.1 Configure metadata and Open Graph tags
    - Export `metadata` object from `app/layout.tsx` using `next` Metadata API
    - Include title (30–60 chars), description (50–160 chars), OG tags, Twitter Card tags
    - Source all values from `content/seo.json`
    - Implement fallback defaults for missing optional fields
    - _Requirements: 13.1, 13.6_

  - [x] 11.2 Create sitemap.ts and robots.ts
    - Create `app/sitemap.ts` generating valid sitemap.xml with lastmod date
    - Create `app/robots.ts` generating robots.txt allowing all crawlers
    - _Requirements: 13.2_

  - [ ]* 11.3 Write property test for static export integrity
    - **Property 9: Static Export Integrity**
    - Verify build output contains only static files (HTML, CSS, JS, images)
    - Verify no server-side runtime dependencies in output
    - **Validates: Requirements 1.4**

- [x] 12. Performance optimization
  - [x] 12.1 Implement image optimization strategy
    - Use `next/image` for all images with automatic format optimization (WebP/AVIF)
    - Hero background and profile photo: `loading="eager"`, `priority={true}`
    - Portfolio thumbnails: `loading="lazy"`
    - Set explicit `width` and `height` to prevent CLS
    - Ensure images scale within parent containers without overflow
    - _Requirements: 12.2, 11.5_

  - [x] 12.2 Implement code splitting and lazy loading
    - Use `next/dynamic` for Modal component (load on user interaction)
    - Use `next/dynamic` with Intersection Observer for sections below Hero (200px threshold)
    - Lazy load easter egg effects (load only when triggered)
    - Tree-shake Framer Motion to include only used primitives
    - Target total initial JS bundle < 200KB gzipped
    - _Requirements: 12.4, 12.5_

  - [x] 12.3 Configure bundle analysis and verify performance targets
    - Install `@next/bundle-analyzer` for build analysis
    - Verify build completes with zero TypeScript errors and zero linter errors
    - Verify static export produces only HTML/CSS/JS/asset files
    - _Requirements: 1.4, 1.5, 12.1, 12.5_

- [x] 13. Accessibility audit and final polish
  - [x] 13.1 Verify WCAG 2.1 AA compliance across all components
    - Verify all text meets contrast ratios (4.5:1 normal, 3:1 large) in both themes
    - Verify all interactive elements have visible focus indicators (2px, ≥3:1 contrast)
    - Verify all images have alt text (5–150 chars) from content
    - Verify ARIA labels on elements without visible text labels
    - Verify logical heading hierarchy (single h1, sequential h2/h3)
    - Verify minimum 44x44px touch targets on mobile
    - Verify minimum 16px body text on all viewports
    - _Requirements: 3.6, 15.1, 15.2, 15.3, 15.5, 15.8, 11.3, 11.4_

  - [x] 13.2 Verify responsive design across breakpoints
    - Test single-column layout below 640px
    - Test two-column layout 640px–1024px
    - Test multi-column layout above 1024px
    - Verify no horizontal scrollbar at any viewport width (320px–2560px)
    - Verify navigation collapses to hamburger below 640px
    - _Requirements: 11.1, 11.2_

  - [ ]* 13.3 Write property test for responsive layout
    - **Property 6: Responsive Layout**
    - Verify no horizontal scrollbar appears for all viewport widths 320px–2560px
    - **Validates: Requirements 11.1**

  - [ ]* 13.4 Write property test for accessibility contrast
    - **Property 5: Accessibility Contrast**
    - Verify computed contrast ratios meet WCAG 2.1 AA minimums in both themes
    - **Validates: Requirements 3.6, 15.5**

  - [ ]* 13.5 Write property test for reduced motion respect
    - **Property 7: Reduced Motion Respect**
    - Verify no CSS animation/transition with duration > 0ms runs on decorative elements when prefers-reduced-motion is active
    - **Validates: Requirements 15.7, 5.6**

- [x] 14. Final checkpoint - Ensure complete build passes
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The project uses TypeScript (strict), Next.js 14+ App Router, Tailwind CSS, Framer Motion, and Zod
- Static export targets GitHub Pages deployment — no server runtime required
- All content is sourced from JSON files in `/content` directory

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "2.1"] },
    { "id": 2, "tasks": ["2.2", "2.4"] },
    { "id": 3, "tasks": ["2.3", "2.5"] },
    { "id": 4, "tasks": ["3.1", "3.2", "4.7"] },
    { "id": 5, "tasks": ["3.3", "3.4", "4.1", "4.5", "4.6"] },
    { "id": 6, "tasks": ["4.2", "4.3", "4.4"] },
    { "id": 7, "tasks": ["6.1", "6.2", "6.4", "6.5", "6.6"] },
    { "id": 8, "tasks": ["6.3", "6.7"] },
    { "id": 9, "tasks": ["7.1", "7.2", "7.3", "7.5"] },
    { "id": 10, "tasks": ["7.4", "7.6", "7.7"] },
    { "id": 11, "tasks": ["9.1", "9.2"] },
    { "id": 12, "tasks": ["10.1", "10.2"] },
    { "id": 13, "tasks": ["11.1", "11.2", "11.3"] },
    { "id": 14, "tasks": ["12.1", "12.2"] },
    { "id": 15, "tasks": ["12.3"] },
    { "id": 16, "tasks": ["13.1", "13.2", "13.3", "13.4", "13.5"] }
  ]
}
```
