'use client';

import { useState, type FormEvent } from 'react';
import { FiMapPin, FiMail, FiPhone, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { content } from '@/lib/content';
import SectionHeading from '../ui/SectionHeading';
import GlassCard from '../ui/GlassCard';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';

const { contact } = content;

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(contact.formspreeEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const cards = [
    { icon: FiMapPin, title: 'I live in', lines: contact.location },
    { icon: FiMail, title: 'Email me at', lines: [contact.email], href: `mailto:${contact.email}` },
    { icon: FiPhone, title: 'Call me at', lines: [contact.phone], href: `tel:${contact.phoneHref}` },
  ];

  const field =
    'w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none transition focus:border-transparent focus:ring-2 focus:ring-[var(--ring)]';

  return (
    <section id="contact" className="section-pad">
      <div className="container-x">
        <SectionHeading
          eyebrow="Contact"
          title="I'd love to hear from you."
          subtitle={contact.blurb}
          center
        />

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <GlassCard className="p-7">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="name" type="text" placeholder="Name" required minLength={2} className={field} />
                  <input name="email" type="email" placeholder="Email" required className={field} />
                </div>
                <input name="subject" type="text" placeholder="Subject" className={field} />
                <textarea name="message" placeholder="Your message" rows={6} required className={`${field} resize-none`} />

                <div className="flex flex-wrap items-center gap-4">
                  <Button type="submit">{status === 'sending' ? 'Sending…' : 'Send message'}</Button>
                  {status === 'success' && (
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400">
                      <FiCheckCircle /> Thanks! Your message was sent.
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-red-400">
                      <FiAlertCircle /> Something went wrong. Try again or email me.
                    </span>
                  )}
                </div>
              </form>
            </GlassCard>
          </Reveal>

          <div className="grid content-start gap-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delayIndex={i} as="div">
                <GlassCard interactive className="flex items-start gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-white [background:var(--accent-grad)]">
                    <c.icon size={18} />
                  </span>
                  <div>
                    <h5 className="text-sm font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      {c.title}
                    </h5>
                    {c.lines.map((line) =>
                      c.href ? (
                        <a key={line} href={c.href} className="block font-medium hover:text-gradient">
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="font-medium">
                          {line}
                        </p>
                      ),
                    )}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
