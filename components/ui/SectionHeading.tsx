import Reveal from './Reveal';

/** The eyebrow + big heading pattern that opens each section. */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? 'text-center' : ''}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gradient">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-4xl font-bold sm:text-5xl">{title}</h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-2xl text-lg text-[var(--text-muted)] ${
            center ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
