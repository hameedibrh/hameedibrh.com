# Requirements Document

## Introduction

Complete rewrite of the existing hameedibrh.com portfolio website using Next.js with a modern glassmorphism/Apple-inspired UI. The new site preserves all existing content (personal info, work experience, education, portfolio, services, contact) while introducing a futuristic design system, content management layer, light/dark mode, performance optimization, and SEO best practices.

## Glossary

- **Portfolio_App**: The Next.js application serving the portfolio website at hameedibrh.com
- **Content_Layer**: A file-based content management system (JSON/MDX files) that allows updating website content without modifying source code
- **Theme_System**: The module responsible for managing light mode, dark mode, and the glassmorphism visual effects
- **Hero_Section**: The introductory landing section displaying name, roles, and social links
- **About_Section**: The section presenting personal biography, skills, and profile information
- **Resume_Section**: The section displaying work experience and education in a timeline format
- **Portfolio_Section**: The gallery section showcasing creative artworks and projects
- **Services_Section**: The section listing professional services offered
- **Contact_Section**: The section containing the contact form and contact information
- **Navigation**: The site-wide navigation component enabling smooth scrolling between sections
- **Glassmorphism_Style**: A visual design style featuring frosted glass effects, translucent backgrounds, subtle borders, and backdrop blur
- **Easter_Egg**: A hidden interactive element that provides a delightful surprise when discovered by the user
- **Content_File**: A JSON or MDX file within the Content_Layer that stores structured site data

## Requirements

### Requirement 1: Next.js Application Foundation

**User Story:** As a site owner, I want the portfolio built with the latest Next.js framework, so that I benefit from modern React features, server-side rendering, and optimized performance.

#### Acceptance Criteria

1. THE Portfolio_App SHALL use Next.js 14 or later with the App Router architecture
2. THE Portfolio_App SHALL use TypeScript with strict mode enabled for all `.ts` and `.tsx` source files
3. THE Portfolio_App SHALL use Tailwind CSS as the primary styling framework
4. WHEN the Portfolio_App is built, THE Portfolio_App SHALL produce a static export consisting of only HTML, CSS, JavaScript, and asset files that require no server-side runtime to serve
5. WHEN the Portfolio_App is built, THE Portfolio_App SHALL complete the build process with zero TypeScript compilation errors and zero linter errors
6. THE Portfolio_App SHALL render the Hero_Section, About_Section, Resume_Section, Portfolio_Section, Services_Section, and Contact_Section as a single-page application where navigation links scroll to the target section with a smooth scroll animation lasting between 300ms and 800ms

### Requirement 2: Content Management Layer

**User Story:** As a site owner, I want to update website content by editing simple data files, so that I can make changes without modifying component code.

#### Acceptance Criteria

1. THE Content_Layer SHALL store all site content in structured JSON files within a dedicated `/content` directory
2. THE Content_Layer SHALL provide separate Content_Files for each section: personal info, work experience, education, skills, portfolio items, services, and contact details, where each Content_File contains one JSON object with all required fields defined by its corresponding TypeScript type definition
3. WHEN a Content_File is modified, THE Portfolio_App SHALL reflect the updated content on the next build without requiring changes to any TypeScript or React component source files
4. THE Content_Layer SHALL include TypeScript type definitions for each Content_File schema, and the build process SHALL validate all Content_Files against their type definitions at build time
5. THE Content_Layer SHALL store social media links as an array of objects, each containing a platform name (maximum 50 characters), a URL (valid URL format), and an icon identifier referencing an available icon in the project's icon set
6. IF a Content_File is missing or contains invalid JSON, THEN THE Portfolio_App SHALL fail the build and output an error message indicating the file name and the nature of the validation failure
7. IF a Content_File does not conform to its TypeScript type definition, THEN THE Portfolio_App SHALL fail the build and output an error message indicating which required fields are missing or have incorrect types

### Requirement 3: Glassmorphism and Apple-Inspired UI Design

**User Story:** As a site visitor, I want to experience a modern, visually impressive interface with frosted glass effects, so that the portfolio feels premium and futuristic.

#### Acceptance Criteria

1. THE Theme_System SHALL apply Glassmorphism_Style to card components, navigation, and modal overlays using CSS backdrop-filter with a blur radius between 10px and 20px and background colors with an alpha opacity between 0.1 and 0.3
2. THE Portfolio_App SHALL use a gradient color scheme with purple, blue, and teal tones as primary accent colors
3. THE Portfolio_App SHALL use a sans-serif typeface with a base body font size of 16px and spacing values that are multiples of 8px following an 8px grid system
4. WHILE the user is scrolling, THE Navigation SHALL remain fixed at the top of the viewport with a frosted glass background effect using backdrop-filter blur
5. THE Portfolio_App SHALL apply CSS transitions with an ease or ease-in-out timing function and a duration between 200ms and 400ms on interactive elements including buttons, links, and cards
6. THE Portfolio_App SHALL maintain a minimum contrast ratio of 4.5:1 for body text (below 18px regular or below 14px bold) and 3:1 for large text (18px+ regular or 14px+ bold) against all background variations
7. IF the user's browser does not support CSS backdrop-filter, THEN THE Theme_System SHALL fall back to a solid semi-opaque background color that maintains the same contrast requirements

### Requirement 4: Light and Dark Mode

**User Story:** As a site visitor, I want to switch between light and dark themes, so that I can view the site comfortably in any lighting condition.

#### Acceptance Criteria

1. THE Theme_System SHALL support light mode and dark mode with distinct color palettes for each
2. WHEN the site loads and no user preference is stored, THE Theme_System SHALL detect the user's operating system color scheme preference via the `prefers-color-scheme` media query and apply the matching mode
3. WHEN the user toggles the theme switch, THE Theme_System SHALL transition between modes by animating background and text color properties with a duration no greater than 300ms
4. WHEN the user selects a theme, THE Theme_System SHALL persist the selected mode in browser local storage so that subsequent page loads apply the stored preference instead of the OS default
5. WHILE dark mode is active, THE Theme_System SHALL adjust Glassmorphism_Style backgrounds to use darker translucent tones while maintaining the frosted glass backdrop-filter effect
6. IF browser local storage is unavailable, THEN THE Theme_System SHALL fall back to the operating system color scheme preference and continue to allow in-session toggling without persistence
7. WHEN a stored theme preference exists, THE Theme_System SHALL apply the stored theme before the first paint to prevent a visible flash of the incorrect theme

### Requirement 5: Hero Section

**User Story:** As a site visitor, I want to see an engaging introduction with the owner's name, roles, and social links, so that I immediately understand who this person is.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the owner's name, a greeting message, and a list of up to 5 professional roles sourced from the Content_Layer, where roles are presented using a typing or rotating text animation that cycles through each role sequentially
2. THE Hero_Section SHALL display social media links as icon buttons sourced from the Content_Layer, each with an accessible label indicating the platform name
3. WHEN a social media icon is clicked, THE Hero_Section SHALL open the corresponding URL in a new browser tab
4. THE Hero_Section SHALL include a call-to-action button with a label sourced from the Content_Layer that smooth-scrolls to the About_Section with a scroll duration between 300ms and 800ms
5. THE Hero_Section SHALL include an animated background element such as a gradient mesh or particle effect that remains behind all text content and does not reduce text legibility
6. IF the user's system has prefers-reduced-motion enabled, THEN THE Hero_Section SHALL disable or replace all animations (background effect and role cycling) with static equivalents

### Requirement 6: About Section

**User Story:** As a site visitor, I want to read about the owner's background and skills, so that I can understand their expertise and personality.

#### Acceptance Criteria

1. THE About_Section SHALL display a profile image, biography text, and skill categories sourced from the Content_Layer
2. THE About_Section SHALL display skills grouped by category (Programming Languages, Web Development, Mobile Development, Tools, Design) in Glassmorphism_Style cards
3. THE About_Section SHALL display skill proficiency levels as animated progress indicators with percentage values ranging from 0 to 100, sourced from the Content_Layer, where the progress animation completes within 800ms to 1200ms
4. WHEN at least 20% of the About_Section becomes visible in the viewport, THE About_Section SHALL trigger entrance animations on its child elements with each animation completing within 300ms to 500ms
5. THE About_Section SHALL display the profile image with a maximum width of 300px, maintaining its original aspect ratio, and include descriptive alt text sourced from the Content_Layer

### Requirement 7: Resume Section

**User Story:** As a site visitor, I want to view work experience and education in a clear timeline, so that I can understand the owner's professional journey.

#### Acceptance Criteria

1. THE Resume_Section SHALL display work experience entries in a vertical timeline layout sourced from the Content_Layer, ordered from most recent to oldest based on the entry's date range
2. THE Resume_Section SHALL display education entries in a separate vertical timeline layout sourced from the Content_Layer, ordered from most recent to oldest based on the entry's date range
3. WHEN a timeline entry scrolls into the viewport, THE Resume_Section SHALL animate the entry with a fade-in and slide effect lasting between 200ms and 400ms
4. THE Resume_Section SHALL display each timeline entry with a role title, date range, organization name, and a description of up to 500 characters sourced from the Content_Layer
5. IF the Content_Layer contains no entries for a timeline category (work experience or education), THEN THE Resume_Section SHALL hide that category's timeline and heading from the display

### Requirement 8: Portfolio Section

**User Story:** As a site visitor, I want to browse creative artworks in an attractive gallery, so that I can appreciate the owner's creative abilities.

#### Acceptance Criteria

1. THE Portfolio_Section SHALL display portfolio items in a responsive grid layout sourced from the Content_Layer, using 1 column on mobile (below 640px), 2 columns on tablet (640px to 1024px), and 3 columns on desktop (above 1024px)
2. WHEN a portfolio item is clicked, THE Portfolio_Section SHALL open a modal overlay displaying the full artwork details including title, category, description, and an external link that opens in a new browser tab
3. THE Portfolio_Section SHALL display each item with a thumbnail image rendered at a consistent aspect ratio, a title, and a category label
4. THE Portfolio_Section SHALL apply a hover effect with a scale transform of 1.05 and Glassmorphism_Style overlay on each portfolio item, with a transition duration between 200ms and 400ms
5. WHEN the user clicks the modal close button, presses the Escape key, or clicks outside the modal content area, THE Portfolio_Section SHALL close the modal overlay and return focus to the triggering portfolio item

### Requirement 9: Services Section

**User Story:** As a site visitor, I want to see what professional services are offered, so that I can determine if the owner can help with my project.

#### Acceptance Criteria

1. THE Services_Section SHALL display service offerings in a responsive grid of Glassmorphism_Style cards sourced from the Content_Layer, showing 1 column on mobile (below 640px), 2 columns on tablet (640px to 1024px), and 3 columns on desktop (above 1024px)
2. THE Services_Section SHALL display each service card with an icon, title, and description of no more than 150 characters
3. WHEN a service card is hovered, THE Services_Section SHALL apply a lift animation (translateY of -4px to -8px) and a glow effect using a colored box-shadow, with a transition duration between 200ms and 400ms
4. IF the Content_Layer provides zero service entries, THEN THE Services_Section SHALL not render the services grid

### Requirement 10: Contact Section

**User Story:** As a site visitor, I want to send a message through a contact form, so that I can reach the owner for inquiries or collaboration.

#### Acceptance Criteria

1. THE Contact_Section SHALL display a contact form with fields for name (maximum 100 characters), email (maximum 254 characters), subject (maximum 200 characters), and message (maximum 2000 characters)
2. WHEN the contact form is submitted with valid data, THE Contact_Section SHALL send the form data to an external form service (Formspree) and display a visible success message indicating the message was sent
3. IF the contact form is submitted with invalid data, THEN THE Contact_Section SHALL display inline validation error messages for each invalid field, where invalid means: name is empty or exceeds 100 characters, email is empty or does not match a standard email format pattern, subject is empty or exceeds 200 characters, or message is empty or exceeds 2000 characters
4. THE Contact_Section SHALL display contact information (email address, phone number, location) sourced from the Content_Layer alongside the form
5. THE Contact_Section SHALL validate the email field using a standard email format pattern before submission
6. IF the form submission to Formspree fails due to a network error or service error, THEN THE Contact_Section SHALL display an error message indicating the submission failed and preserve the user's entered data in the form fields
7. WHILE the form is being submitted, THE Contact_Section SHALL disable the submit button and display a loading indicator to prevent duplicate submissions

### Requirement 11: Responsive Design

**User Story:** As a site visitor on any device, I want the site to adapt to my screen size, so that I have a usable experience on mobile, tablet, and desktop.

#### Acceptance Criteria

1. THE Portfolio_App SHALL use a single-column layout for mobile viewports (below 640px), a two-column layout where appropriate for tablet viewports (640px to 1024px), and a multi-column layout for desktop viewports (above 1024px), with no horizontal scrollbar appearing at any viewport width
2. WHILE the viewport is below 640px, THE Navigation SHALL collapse into a hamburger menu icon that opens a slide-out drawer, and the drawer SHALL close when the user taps outside it, selects a navigation link, or taps the close button
3. WHILE the viewport is below 640px, THE Portfolio_App SHALL ensure all interactive elements have a minimum touch target size of 44x44 pixels
4. THE Portfolio_App SHALL maintain a minimum body text size of 16px on all viewports
5. THE Portfolio_App SHALL scale images to fit within their parent containers without overflow or distortion on all viewports

### Requirement 12: Performance Optimization

**User Story:** As a site visitor, I want the site to load quickly, so that I do not experience delays when viewing the portfolio.

#### Acceptance Criteria

1. THE Portfolio_App SHALL achieve a Lighthouse Performance score of 90 or above on desktop and 80 or above on mobile when tested with simulated throttling
2. THE Portfolio_App SHALL use Next.js Image component for all images with automatic format optimization, and SHALL apply lazy loading to images below the initial viewport while using eager loading with priority for the largest image visible in the initial viewport
3. THE Portfolio_App SHALL load fonts using the `next/font` module so that font loading contributes zero Cumulative Layout Shift
4. THE Portfolio_App SHALL implement code splitting so that modal content loads when the user opens a modal, and sections below the Hero_Section load when they scroll within 200px of the viewport
5. WHEN the Portfolio_App is built, THE Portfolio_App SHALL produce a total initial JavaScript bundle size below 200KB (gzipped)

### Requirement 13: SEO Optimization

**User Story:** As a site owner, I want the site to be well-indexed by search engines, so that people can find my portfolio through web searches.

#### Acceptance Criteria

1. THE Portfolio_App SHALL generate meta tags for each page including a title (between 30 and 60 characters), a description (between 50 and 160 characters), Open Graph tags (og:title, og:description, og:image, og:url, og:type), and Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image) with values sourced from the Content_Layer
2. WHEN the Portfolio_App is built, THE Portfolio_App SHALL generate a valid sitemap.xml file that lists all indexable page URLs with lastmod dates
3. THE Portfolio_App SHALL use semantic HTML elements (header, main, section, article, footer, nav) for document structure
4. THE Portfolio_App SHALL include structured data (JSON-LD) for Person schema with name, job title, and social profiles sourced from the Content_Layer, and the structured data SHALL validate against schema.org Person type without errors
5. THE Portfolio_App SHALL render all section headings, body text, and navigation links in the initial HTML response without requiring client-side JavaScript for content visibility
6. IF a required SEO field (title, description, or og:image) is missing from the Content_Layer, THEN THE Portfolio_App SHALL fall back to a default value derived from the site name and section context rather than rendering an empty meta tag

### Requirement 14: Easter Eggs and Delight

**User Story:** As a site visitor, I want to discover hidden interactive surprises, so that the browsing experience feels memorable and fun.

#### Acceptance Criteria

1. THE Portfolio_App SHALL include at least two Easter_Egg interactions hidden within the site that are not indicated by visible labels or instructions
2. WHEN a user triggers an Easter_Egg, THE Portfolio_App SHALL display a visual or interactive animation lasting between 1 and 5 seconds that renders as an overlay or inline effect without causing layout shift or displacing existing page content, and SHALL automatically dismiss after the animation completes
3. WHEN the user enters the Konami code key sequence (↑ ↑ ↓ ↓ ← → ← → B A), THE Portfolio_App SHALL trigger a visual Easter_Egg effect
4. WHILE the user's pointer is within the Hero_Section, THE Portfolio_App SHALL translate or rotate an interactive element in response to cursor position with a maximum offset of 20 pixels or 10 degrees of rotation
5. IF the user's device does not support pointer events (touch-only device), THEN THE Portfolio_App SHALL disable the Hero_Section cursor-tracking effect and display the element in its default static position

### Requirement 15: Accessibility

**User Story:** As a site visitor using assistive technology, I want the site to be navigable and understandable, so that I can access all content regardless of ability.

#### Acceptance Criteria

1. THE Portfolio_App SHALL provide alt text for all images sourced from the Content_Layer, where each alt text identifies the subject and purpose of the image with a length between 5 and 150 characters
2. THE Navigation SHALL be operable using keyboard-only input, where all navigation links and controls are reachable via the Tab key, activatable via Enter or Space key, and display a visible focus indicator with a minimum 2px outline at a contrast ratio of at least 3:1 against adjacent colors
3. THE Portfolio_App SHALL use ARIA labels on interactive elements that lack visible text labels
4. WHEN a modal is opened, THE Portfolio_App SHALL trap keyboard focus within the modal, close the modal when the Escape key is pressed, and return focus to the trigger element on close
5. THE Theme_System SHALL ensure all text and interactive component color combinations meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text and UI components) in both light and dark modes
6. THE Portfolio_App SHALL provide a skip-to-content link as the first focusable element on the page that moves focus to the main content area when activated
7. WHEN the user has enabled a prefers-reduced-motion setting in their operating system, THE Portfolio_App SHALL disable or replace all non-essential animations and transitions with immediate state changes
8. THE Portfolio_App SHALL use a logical heading hierarchy starting with a single h1 element and progressing sequentially (h2, h3) without skipping levels
