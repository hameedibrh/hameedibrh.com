'use client';

import { useState, useCallback } from 'react';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface UseFormValidationReturn {
  errors: FormErrors;
  validate: (data: FormData) => boolean;
  validateField: (field: keyof FormData, value: string) => string | undefined;
  clearErrors: () => void;
  clearFieldError: (field: keyof FormData) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Hook for contact form validation logic.
 * Validates name (max 100), email (max 254, format), subject (max 200), message (max 2000).
 * Returns errors object, validate function, and field-level validation.
 */
export function useFormValidation(): UseFormValidationReturn {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = useCallback(
    (field: keyof FormData, value: string): string | undefined => {
      const trimmed = value.trim();

      switch (field) {
        case 'name':
          if (!trimmed) return 'Name is required';
          if (trimmed.length > 100) return 'Name must be 100 characters or less';
          return undefined;

        case 'email':
          if (!trimmed) return 'Email is required';
          if (trimmed.length > 254) return 'Email must be 254 characters or less';
          if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address';
          return undefined;

        case 'subject':
          if (!trimmed) return 'Subject is required';
          if (trimmed.length > 200) return 'Subject must be 200 characters or less';
          return undefined;

        case 'message':
          if (!trimmed) return 'Message is required';
          if (trimmed.length > 2000) return 'Message must be 2000 characters or less';
          return undefined;

        default:
          return undefined;
      }
    },
    []
  );

  const validate = useCallback(
    (data: FormData): boolean => {
      const newErrors: FormErrors = {};

      const nameError = validateField('name', data.name);
      if (nameError) newErrors.name = nameError;

      const emailError = validateField('email', data.email);
      if (emailError) newErrors.email = emailError;

      const subjectError = validateField('subject', data.subject);
      if (subjectError) newErrors.subject = subjectError;

      const messageError = validateField('message', data.message);
      if (messageError) newErrors.message = messageError;

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [validateField]
  );

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field: keyof FormData) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  return { errors, validate, validateField, clearErrors, clearFieldError };
}
