'use client';

import { useCallback, useState, type ReactNode } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';

/** Copy-to-clipboard button with a transient "copied" state. */
export function CopyButton({ value, className = '' }: { value: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    if (!value) return;
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [value]);

  return (
    <button
      onClick={copy}
      type="button"
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition hover:bg-[var(--glass-bg-strong)] ${
        copied ? 'text-emerald-400' : 'text-[var(--text-muted)]'
      } ${className}`}
    >
      {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export const inputCls =
  'w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none transition focus:border-transparent focus:ring-2 focus:ring-[var(--ring)]';

export const monoCls =
  'font-mono text-[13px] leading-relaxed w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-faint)] outline-none transition focus:border-transparent focus:ring-2 focus:ring-[var(--ring)] resize-y';

/** Labeled block. */
export function Field({ label, action, children }: { label: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{label}</label>
        {action}
      </div>
      {children}
    </div>
  );
}

/** Read-only mono output with a copy button. */
export function Output({ label = 'Output', value, error }: { label?: string; value: string; error?: string | null }) {
  return (
    <Field label={label} action={!error && value ? <CopyButton value={value} /> : null}>
      {error ? (
        <pre className="whitespace-pre-wrap rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 font-mono text-[13px] text-red-300">
          {error}
        </pre>
      ) : (
        <pre className={`${monoCls} max-h-[420px] overflow-auto whitespace-pre-wrap`}>{value || ' '}</pre>
      )}
    </Field>
  );
}

/** iOS-style segmented control. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-full bg-[var(--glass-bg-strong)] p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
            value === o.value ? 'text-white [background:var(--accent-grad)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Small action button used inside tools. */
export function ToolButton({ children, onClick, type = 'button' }: { children: ReactNode; onClick?: () => void; type?: 'button' | 'submit' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition [background:var(--accent-grad)] hover:-translate-y-0.5"
    >
      {children}
    </button>
  );
}

/** Vertical stack layout for a tool's body. */
export function Stack({ children }: { children: ReactNode }) {
  return <div className="space-y-5">{children}</div>;
}
