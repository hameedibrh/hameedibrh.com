'use client';

import { useMemo, useState } from 'react';
import { marked } from 'marked';
import { Stack, Field, Output, ToolButton, monoCls, inputCls, CopyButton } from '../shared';
import { evalExpression, lineDiff } from '@/lib/devtools/utils';

export function RegexTester() {
  const [pattern, setPattern] = useState('\\b(\\w+)@(\\w+)\\.(\\w+)\\b');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Contact hameedibrh@gmail.com or test@example.org');
  const { matches, err } = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      const m = Array.from(text.matchAll(re));
      return { matches: m, err: null as string | null };
    } catch (e) { return { matches: [], err: (e as Error).message }; }
  }, [pattern, flags, text]);
  return (
    <Stack>
      <div className="flex gap-3">
        <div className="flex-1"><Field label="Pattern"><input className={`${monoCls} !py-3`} value={pattern} onChange={(e) => setPattern(e.target.value)} spellCheck={false} /></Field></div>
        <div className="w-28"><Field label="Flags"><input className={`${monoCls} !py-3`} value={flags} onChange={(e) => setFlags(e.target.value)} spellCheck={false} /></Field></div>
      </div>
      <Field label="Test string"><textarea className={`${monoCls} min-h-28`} value={text} onChange={(e) => setText(e.target.value)} /></Field>
      {err ? <p className="text-sm text-red-400">{err}</p> : (
        <div className="glass rounded-2xl p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gradient">{matches.length} match{matches.length === 1 ? '' : 'es'}</p>
          <div className="space-y-1 font-mono text-sm">
            {matches.map((m, i) => (
              <div key={i} className="text-[var(--text-muted)]">
                <span className="text-emerald-400">{m[0]}</span>
                {m.length > 1 && <span className="text-[var(--text-faint)]"> → [{m.slice(1).join(', ')}]</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </Stack>
  );
}

export function DiffChecker() {
  const [a, setA] = useState('line one\nline two\nline three');
  const [b, setB] = useState('line one\nline 2\nline three\nline four');
  const diff = useMemo(() => lineDiff(a, b), [a, b]);
  return (
    <Stack>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Original"><textarea className={`${monoCls} min-h-40`} value={a} onChange={(e) => setA(e.target.value)} /></Field>
        <Field label="Changed"><textarea className={`${monoCls} min-h-40`} value={b} onChange={(e) => setB(e.target.value)} /></Field>
      </div>
      <div className="glass overflow-auto rounded-2xl p-2 font-mono text-[13px]">
        {diff.map((d, i) => (
          <div key={i} className={
            d.type === 'add' ? 'bg-emerald-500/15 text-emerald-300' :
            d.type === 'del' ? 'bg-red-500/15 text-red-300' : 'text-[var(--text-muted)]'
          }>
            <span className="select-none opacity-60">{d.type === 'add' ? ' + ' : d.type === 'del' ? ' - ' : '   '}</span>
            {d.text || ' '}
          </div>
        ))}
      </div>
    </Stack>
  );
}

export function TextStats() {
  const [text, setText] = useState('Type or paste your text here to see live statistics.');
  const s = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return {
      Characters: text.length,
      'Characters (no spaces)': text.replace(/\s/g, '').length,
      Words: words,
      Lines: text ? text.split('\n').length : 0,
      Sentences: (text.match(/[.!?]+/g) || []).length,
      'Reading time': `${Math.max(1, Math.ceil(words / 200))} min`,
    };
  }, [text]);
  return (
    <Stack>
      <Field label="Text"><textarea className={`${monoCls} min-h-40`} value={text} onChange={(e) => setText(e.target.value)} /></Field>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {Object.entries(s).map(([k, v]) => (
          <div key={k} className="glass rounded-2xl px-4 py-3 text-center">
            <p className="text-2xl font-bold text-gradient">{v}</p>
            <p className="text-xs text-[var(--text-muted)]">{k}</p>
          </div>
        ))}
      </div>
    </Stack>
  );
}

export function MarkdownPreview() {
  const [md, setMd] = useState('# Hello\n\n- **Bold** and *italic*\n- [Link](https://hameedibrh.com)\n\n```js\nconsole.log("hi");\n```');
  const html = useMemo(() => {
    const raw = marked.parse(md, { async: false }) as string;
    return raw.replace(/<script[\s\S]*?<\/script>/gi, ''); // strip script (self-XSS guard)
  }, [md]);
  return (
    <Stack>
      <div className="grid gap-3 lg:grid-cols-2">
        <Field label="Markdown"><textarea className={`${monoCls} min-h-72`} value={md} onChange={(e) => setMd(e.target.value)} /></Field>
        <Field label="Preview">
          <div className="prose-tool glass min-h-72 overflow-auto rounded-2xl px-5 py-4" dangerouslySetInnerHTML={{ __html: html }} />
        </Field>
      </div>
    </Stack>
  );
}

export function Calculator() {
  const [expr, setExpr] = useState('(2 + 3) * sqrt(16) - 7 % 4');
  const { result, err } = useMemo(() => {
    if (!expr.trim()) return { result: '', err: null as string | null };
    try { return { result: String(evalExpression(expr)), err: null }; }
    catch (e) { return { result: '', err: (e as Error).message }; }
  }, [expr]);
  return (
    <Stack>
      <Field label="Expression"><input className={`${monoCls} !py-3 !text-base`} value={expr} onChange={(e) => setExpr(e.target.value)} spellCheck={false} /></Field>
      <div className="glass flex items-center justify-between rounded-2xl px-5 py-5">
        <span className="text-sm text-[var(--text-muted)]">=</span>
        {err ? <span className="text-red-400">{err}</span> : <span className="flex items-center gap-3 font-mono text-3xl font-bold text-gradient">{result || '0'}<CopyButton value={result} /></span>}
      </div>
      <p className="text-xs text-[var(--text-faint)]">Supports + − × ÷ % ^, parentheses, and sqrt, sin, cos, tan, log, ln, abs, round, floor, ceil, pi, e.</p>
    </Stack>
  );
}

const CRON_FIELDS = ['minute', 'hour', 'day of month', 'month', 'day of week'];
function explainCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return 'A standard cron expression has 5 fields: minute hour day-of-month month day-of-week.';
  return parts.map((p, i) => {
    const f = CRON_FIELDS[i];
    if (p === '*') return `every ${f}`;
    if (p.startsWith('*/')) return `every ${p.slice(2)} ${f}${f.endsWith('h') ? '' : 's'}`;
    if (p.includes(',')) return `at ${f}s ${p}`;
    if (p.includes('-')) return `${f}s ${p}`;
    return `at ${f} ${p}`;
  }).join(', ') + '.';
}
export function CronExplainer() {
  const [expr, setExpr] = useState('*/15 9 * * 1-5');
  return (
    <Stack>
      <Field label="Cron expression"><input className={`${monoCls} !py-3 !text-base`} value={expr} onChange={(e) => setExpr(e.target.value)} spellCheck={false} /></Field>
      <div className="glass rounded-2xl px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-gradient">Meaning</p>
        <p className="mt-1 capitalize">{explainCron(expr)}</p>
      </div>
      <div className="grid grid-cols-5 gap-2 text-center text-xs">
        {CRON_FIELDS.map((f, i) => (
          <div key={f} className="glass rounded-xl px-2 py-2">
            <p className="font-mono text-lg text-[var(--text)]">{expr.trim().split(/\s+/)[i] ?? '·'}</p>
            <p className="text-[var(--text-faint)]">{f}</p>
          </div>
        ))}
      </div>
    </Stack>
  );
}

const PERMS = ['Owner', 'Group', 'Others'] as const;
const BITS = [['Read', 4], ['Write', 2], ['Execute', 1]] as const;
export function ChmodCalculator() {
  const [grid, setGrid] = useState<boolean[][]>([[true, true, true], [true, false, true], [true, false, true]]);
  const octal = grid.map((row) => row.reduce((a, on, i) => a + (on ? (BITS[i][1] as number) : 0), 0)).join('');
  const symbolic = grid.map((row) => row.map((on, i) => (on ? 'rwx'[i] : '-')).join('')).join('');
  return (
    <Stack>
      <div className="grid gap-3 sm:grid-cols-3">
        {PERMS.map((p, r) => (
          <div key={p} className="glass rounded-2xl p-4">
            <p className="mb-3 text-sm font-semibold">{p}</p>
            {BITS.map(([label], c) => (
              <label key={label} className="flex cursor-pointer items-center gap-2 py-1 text-sm text-[var(--text-muted)]">
                <input type="checkbox" checked={grid[r][c]} onChange={() => setGrid((g) => g.map((row, ri) => ri === r ? row.map((v, ci) => ci === c ? !v : v) : row))} className="accent-[var(--accent-2)]" />
                {label}
              </label>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="glass flex-1 rounded-2xl px-5 py-4 text-center">
          <p className="font-mono text-3xl font-bold text-gradient">{octal}</p>
          <p className="text-xs text-[var(--text-muted)]">octal</p>
        </div>
        <div className="glass flex-1 rounded-2xl px-5 py-4 text-center">
          <p className="font-mono text-3xl font-bold text-gradient">{symbolic}</p>
          <p className="text-xs text-[var(--text-muted)]">symbolic</p>
        </div>
      </div>
      <Output label="Command" value={`chmod ${octal} file`} />
    </Stack>
  );
}
