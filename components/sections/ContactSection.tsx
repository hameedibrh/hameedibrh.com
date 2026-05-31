'use client';

import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

import { Button } from '@/components/ui/Button';
import { useFormValidation } from '@/hooks/useFormValidation';
import type { ContactInfo } from '@/lib/types';

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Contact section with form (name, email, subject, message) and contact info display.
 * Client-side validation, Formspree submission, loading/success/error states.
 */
export function ContactSection({ contactInfo }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const { errors, validate, clearFieldError } = useFormValidation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name as keyof typeof formData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate(formData)) {
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(contactInfo.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" aria-label="Contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Contact
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-red/10 dark:bg-primary-blue/10 flex-shrink-0">
                <FaEnvelope
                  className="text-primary-red dark:text-primary-blue"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Email
                </h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-red dark:hover:text-primary-blue transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-red/10 dark:bg-primary-blue/10 flex-shrink-0">
                <FaPhone
                  className="text-primary-red dark:text-primary-blue"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Phone
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {contactInfo.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-red/10 dark:bg-primary-blue/10 flex-shrink-0">
                <FaMapMarkerAlt
                  className="text-primary-red dark:text-primary-blue"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Location
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {contactInfo.location}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                    bg-white/50 dark:bg-gray-800/50
                    text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-primary-red
                    transition-colors duration-200"
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={254}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                    bg-white/50 dark:bg-gray-800/50
                    text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-primary-red
                    transition-colors duration-200"
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  maxLength={200}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                    bg-white/50 dark:bg-gray-800/50
                    text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-primary-red
                    transition-colors duration-200"
                />
                {errors.subject && (
                  <p id="subject-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={2000}
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                    bg-white/50 dark:bg-gray-800/50
                    text-gray-900 dark:text-white
                    focus:outline-none focus:ring-2 focus:ring-primary-red
                    transition-colors duration-200 resize-y"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto"
              >
                {status === 'submitting' ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </Button>

              {/* Status messages */}
              {status === 'success' && (
                <p className="text-sm text-green-600 dark:text-green-400" role="status">
                  Your message has been sent successfully. Thank you!
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
