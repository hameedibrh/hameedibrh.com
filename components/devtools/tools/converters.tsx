'use client';

import { useState } from 'react';
import yaml from 'js-yaml';
import { Stack, Field, Output, Segmented, ToolButton, monoCls, inputCls, CopyButton } from '../shared';
import { jsonToTs, csvToJson, jsonToCsv, splitWords } from '@/lib/devtools/utils';

export function YamlJson() {
  const [input, setInput] = useState('name: Hameed\nroles:\n  - dev\n  - designer');
  const [dir, setDir] = useState<'y2j' | 'j2y'>('y2j');
  const [out, setOut] = useState('');
  const [err, setErr] = useState<string | null>(null);

  function run(d = dir) {
    try {
      setOut(d === 'y2j' ? JSON.stringify(yaml.load(input), null, 2) : yaml.dump(JSON.parse(input)));
      setErr(null);
    } catch (e) { setErr((e as Error).message); setOut(''); }
  }
  return (
    <Stack>
      <Field label="Input" action={<Segmented value={dir} onChange={(v) => { setDir(v); run(v); }} options={[{ label: 'YAML → JSON', value: 'y2j' }, { label: 'JSON → YAML', value: 'j2y' }]} />}>
        <textarea className={`${monoCls} min-h-40`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
      </Field>
      <ToolButton onClick={() => run()}>Convert</ToolButton>
      <Output value={out} error={err} />
    </Stack>
  );
}

export function JsonToTs() {
  const [input, setInput] = useState('{"id":1,"user":{"name":"Hameed","tags":["a","b"]}}');
  const [name, setName] = useState('Root');
  const [out, setOut] = useState('');
  const [err, setErr] = useState<string | null>(null);
  function run() {
    try { setOut(jsonToTs(JSON.parse(input), name || 'Root')); setErr(null); }
    catch (e) { setErr((e as Error).message); setOut(''); }
  }
  return (
    <Stack>
      <Field label="Root interface name"><input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} /></Field>
      <Field label="JSON"><textarea className={`${monoCls} min-h-40`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} /></Field>
      <ToolButton onClick={run}>Generate types</ToolButton>
      <Output label="TypeScript" value={out} error={err} />
    </Stack>
  );
}

export function CsvJson() {
  const [input, setInput] = useState('name,role\nHameed,dev\nAda,designer');
  const [dir, setDir] = useState<'c2j' | 'j2c'>('c2j');
  const [out, setOut] = useState('');
  const [err, setErr] = useState<string | null>(null);
  function run(d = dir) {
    try {
      setOut(d === 'c2j' ? JSON.stringify(csvToJson(input), null, 2) : jsonToCsv(JSON.parse(input)));
      setErr(null);
    } catch (e) { setErr((e as Error).message); setOut(''); }
  }
  return (
    <Stack>
      <Field label="Input" action={<Segmented value={dir} onChange={(v) => { setDir(v); run(v); }} options={[{ label: 'CSV → JSON', value: 'c2j' }, { label: 'JSON → CSV', value: 'j2c' }]} />}>
        <textarea className={`${monoCls} min-h-40`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
      </Field>
      <ToolButton onClick={() => run()}>Convert</ToolButton>
      <Output value={out} error={err} />
    </Stack>
  );
}

export function NumberBase() {
  const [val, setVal] = useState('255');
  const [base, setBase] = useState(10);
  const [err, setErr] = useState<string | null>(null);
  let n = NaN;
  try { n = parseInt(val.trim(), base); } catch { /* */ }
  const valid = val.trim() !== '' && !Number.isNaN(n);
  const rows: [string, string][] = valid
    ? [['Binary', n.toString(2)], ['Octal', n.toString(8)], ['Decimal', n.toString(10)], ['Hex', n.toString(16).toUpperCase()]]
    : [];
  return (
    <Stack>
      <Field label="Value" action={<Segmented value={String(base)} onChange={(v) => setBase(Number(v))} options={[{ label: 'BIN', value: '2' }, { label: 'OCT', value: '8' }, { label: 'DEC', value: '10' }, { label: 'HEX', value: '16' }]} />}>
        <input className={inputCls} value={val} onChange={(e) => { setVal(e.target.value); setErr(null); }} spellCheck={false} />
      </Field>
      {!valid && val.trim() && <p className="text-sm text-red-400">Not a valid base-{base} number.</p>}
      <div className="grid gap-2">
        {rows.map(([k, v]) => (
          <div key={k} className="glass flex items-center justify-between rounded-2xl px-4 py-3">
            <span className="text-sm text-[var(--text-muted)]">{k}</span>
            <span className="flex items-center gap-2 font-mono">{v}<CopyButton value={v} /></span>
          </div>
        ))}
      </div>
    </Stack>
  );
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function ColorConverter() {
  const [hex, setHex] = useState('#4f8cff');
  const rgb = hexToRgb(hex);
  const hsl = rgb && rgbToHsl(...rgb);
  const rows = rgb && hsl
    ? [['HEX', hex.toUpperCase()], ['RGB', `rgb(${rgb.join(', ')})`], ['HSL', `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`]] as [string, string][]
    : [];
  return (
    <Stack>
      <div className="flex items-center gap-4">
        <input type="color" value={rgb ? hex : '#000000'} onChange={(e) => setHex(e.target.value)} className="h-16 w-16 cursor-pointer rounded-2xl border-0 bg-transparent" />
        <input className={inputCls} value={hex} onChange={(e) => setHex(e.target.value)} spellCheck={false} />
      </div>
      {!rgb && <p className="text-sm text-red-400">Enter a valid hex color (#rgb or #rrggbb).</p>}
      <div className="grid gap-2">
        {rows.map(([k, v]) => (
          <div key={k} className="glass flex items-center justify-between rounded-2xl px-4 py-3">
            <span className="text-sm text-[var(--text-muted)]">{k}</span>
            <span className="flex items-center gap-2 font-mono">{v}<CopyButton value={v} /></span>
          </div>
        ))}
      </div>
    </Stack>
  );
}

export function TimestampConverter() {
  const [val, setVal] = useState(String(Math.floor(Date.now() / 1000)));
  const num = Number(val.trim());
  const ms = val.trim().length > 11 ? num : num * 1000;
  const d = !Number.isNaN(num) ? new Date(ms) : null;
  const ok = d && !Number.isNaN(d.getTime());
  const rows = ok
    ? [['Local', d.toString()], ['UTC', d.toUTCString()], ['ISO 8601', d.toISOString()], ['Relative', `${Math.round((d.getTime() - Date.now()) / 1000)}s from now`]] as [string, string][]
    : [];
  return (
    <Stack>
      <Field label="Unix timestamp (s or ms)" action={<button onClick={() => setVal(String(Math.floor(Date.now() / 1000)))} className="text-xs font-semibold text-gradient">Now</button>}>
        <input className={inputCls} value={val} onChange={(e) => setVal(e.target.value)} spellCheck={false} />
      </Field>
      {!ok && val.trim() && <p className="text-sm text-red-400">Invalid timestamp.</p>}
      <div className="grid gap-2">
        {rows.map(([k, v]) => (
          <div key={k} className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
            <span className="shrink-0 text-sm text-[var(--text-muted)]">{k}</span>
            <span className="flex items-center gap-2 truncate font-mono text-sm">{v}<CopyButton value={v} /></span>
          </div>
        ))}
      </div>
    </Stack>
  );
}

const SIZES = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
export function DataSize() {
  const [val, setVal] = useState('1024');
  const [unit, setUnit] = useState('MB');
  const bytes = Number(val) * 1024 ** SIZES.indexOf(unit);
  const ok = !Number.isNaN(bytes);
  return (
    <Stack>
      <div className="flex gap-3">
        <input className={inputCls} value={val} onChange={(e) => setVal(e.target.value)} spellCheck={false} />
        <select value={unit} onChange={(e) => setUnit(e.target.value)} className={`${inputCls} w-32`}>
          {SIZES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {ok && SIZES.map((s, i) => {
          const v = (bytes / 1024 ** i).toLocaleString(undefined, { maximumFractionDigits: 4 });
          return (
            <div key={s} className="glass flex items-center justify-between rounded-2xl px-4 py-3">
              <span className="text-sm text-[var(--text-muted)]">{s}</span>
              <span className="font-mono text-sm">{v}</span>
            </div>
          );
        })}
      </div>
    </Stack>
  );
}

export function CaseConverter() {
  const [input, setInput] = useState('Hello World Example');
  const w = splitWords(input);
  const cases: [string, string][] = [
    ['camelCase', w.map((x, i) => (i === 0 ? x.toLowerCase() : x[0].toUpperCase() + x.slice(1).toLowerCase())).join('')],
    ['PascalCase', w.map((x) => x[0].toUpperCase() + x.slice(1).toLowerCase()).join('')],
    ['snake_case', w.map((x) => x.toLowerCase()).join('_')],
    ['kebab-case', w.map((x) => x.toLowerCase()).join('-')],
    ['CONSTANT_CASE', w.map((x) => x.toUpperCase()).join('_')],
    ['Title Case', w.map((x) => x[0].toUpperCase() + x.slice(1).toLowerCase()).join(' ')],
    ['sentence case', (w.join(' ').toLowerCase()).replace(/^./, (c) => c.toUpperCase())],
  ];
  return (
    <Stack>
      <Field label="Text"><textarea className={`${monoCls} min-h-24`} value={input} onChange={(e) => setInput(e.target.value)} /></Field>
      <div className="grid gap-2">
        {cases.map(([k, v]) => (
          <div key={k} className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
            <span className="shrink-0 text-sm text-[var(--text-muted)]">{k}</span>
            <span className="flex items-center gap-2 truncate font-mono text-sm">{v}<CopyButton value={v} /></span>
          </div>
        ))}
      </div>
    </Stack>
  );
}
