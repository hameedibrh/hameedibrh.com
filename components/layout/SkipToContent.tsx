/**
 * SkipToContent - Accessibility skip link component
 *
 * Provides a keyboard-accessible link that allows users to skip
 * directly to the main content area, bypassing navigation.
 * Visually hidden by default, becomes visible when focused via Tab.
 *
 * Validates: Requirements 15.6
 */
export function SkipToContent() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-red focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to content
    </a>
  );
}
