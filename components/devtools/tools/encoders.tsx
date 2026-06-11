'use client';

import { useState } from 'react';
import { Stack, Field, Output, Segmented, ToolButton, monoCls, inputCls, CopyButton } from '../shared';
import { b64encode, b64decode } from '@/lib/devtools/utils';

export function Base64Tool() {
  const [input, setInput] = useState('Hello, Hameed!');
  const [dir, setDir] = useState<'enc' | 'dec'>('enc');
  const [out, setOut] = useState('');
  const [err, setErr] = useState<string | null>(null);
  function run(d = dir) {
    try { setOut(d === 'enc' ? b64encode(input) : b64decode(input.trim())); setErr(null); }
    catch { setErr('Invalid Base64 input.'); setOut(''); }
  }
  return (
    <Stack>
      <Field label="Input" action={<Segmented value={dir} onChange={(v) => { setDir(v); run(v); }} options={[{ label: 'Encode', value: 'enc' }, { label: 'Decode', value: 'dec' }]} />}>
        <textarea className={`${monoCls} min-h-32`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
      </Field>
      <ToolButton onClick={() => run()}>Convert</ToolButton>
      <Output value={out} error={err} />
    </Stack>
  );
}

export function UrlTool() {
  const [input, setInput] = useState('https://hameedibrh.com/?q=hello world&x=a/b');
  const [dir, setDir] = useState<'enc' | 'dec'>('enc');
  const [out, setOut] = useState('');
  const [err, setErr] = useState<string | null>(null);
  function run(d = dir) {
    try { setOut(d === 'enc' ? encodeURIComponent(input) : decodeURIComponent(input)); setErr(null); }
    catch { setErr('Malformed URI sequence.'); setOut(''); }
  }
  return (
    <Stack>
      <Field label="Input" action={<Segmented value={dir} onChange={(v) => { setDir(v); run(v); }} options={[{ label: 'Encode', value: 'enc' }, { label: 'Decode', value: 'dec' }]} />}>
        <textarea className={`${monoCls} min-h-32`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
      </Field>
      <ToolButton onClick={() => run()}>Convert</ToolButton>
      <Output value={out} error={err} />
    </Stack>
  );
}

export function HtmlEntities() {
  const [input, setInput] = useState('<div class="x">Tom & Jerry</div>');
  const [dir, setDir] = useState<'enc' | 'dec'>('enc');
  const [out, setOut] = useState('');
  function run(d = dir) {
    if (d === 'enc') {
      setOut(input.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!)));
    } else {
      const el = document.createElement('textarea');
      el.innerHTML = input;
      setOut(el.value);
    }
  }
  return (
    <Stack>
      <Field label="Input" action={<Segmented value={dir} onChange={(v) => { setDir(v); run(v); }} options={[{ label: 'Encode', value: 'enc' }, { label: 'Decode', value: 'dec' }]} />}>
        <textarea className={`${monoCls} min-h-32`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
      </Field>
      <ToolButton onClick={() => run()}>Convert</ToolButton>
      <Output value={out} />
    </Stack>
  );
}

export function JwtDecoder() {
  const [input, setInput] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoYW1lZWQiLCJuYW1lIjoiSGFtZWVkIEkiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  const [out, setOut] = useState('');
  const [err, setErr] = useState<string | null>(null);
  function run() {
    try {
      const [h, p] = input.trim().split('.');
      if (!h || !p) throw new Error('Not a JWT (need header.payload.signature).');
      const dec = (s: string) => JSON.stringify(JSON.parse(b64decode(s.replace(/-/g, '+').replace(/_/g, '/'))), null, 2);
      setOut(`// Header\n${dec(h)}\n\n// Payload\n${dec(p)}`);
      setErr(null);
    } catch (e) { setErr((e as Error).message); setOut(''); }
  }
  return (
    <Stack>
      <Field label="JWT"><textarea className={`${monoCls} min-h-32`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} /></Field>
      <ToolButton onClick={run}>Decode</ToolButton>
      <Output value={out} error={err} />
      <p className="text-xs text-[var(--text-faint)]">Decoding only — the signature is not verified (that needs your secret).</p>
    </Stack>
  );
}

const ALGOS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const;
export function HashGenerator() {
  const [input, setInput] = useState('Hameed Ibrahim');
  const [rows, setRows] = useState<[string, string][]>([]);
  async function run() {
    const data = new TextEncoder().encode(input);
    const out: [string, string][] = [];
    for (const algo of ALGOS) {
      const buf = await crypto.subtle.digest(algo, data);
      out.push([algo, Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')]);
    }
    setRows(out);
  }
  return (
    <Stack>
      <Field label="Text"><textarea className={`${monoCls} min-h-24`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} /></Field>
      <ToolButton onClick={run}>Generate hashes</ToolButton>
      <div className="grid gap-2">
        {rows.map(([k, v]) => (
          <div key={k} className="glass rounded-2xl px-4 py-3">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gradient">{k}</span>
              <CopyButton value={v} />
            </div>
            <p className="break-all font-mono text-xs text-[var(--text-muted)]">{v}</p>
          </div>
        ))}
      </div>
    </Stack>
  );
}

async function streamConv(bytes: Uint8Array, mode: 'gzip' | 'deflate', op: 'c' | 'd'): Promise<Uint8Array> {
  const S = op === 'c' ? CompressionStream : DecompressionStream;
  const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(new S(mode));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}
export function GzipTool() {
  const [input, setInput] = useState('Compress me! '.repeat(8));
  const [dir, setDir] = useState<'c' | 'd'>('c');
  const [out, setOut] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [stat, setStat] = useState('');
  async function run(d = dir) {
    try {
      if (d === 'c') {
        const raw = new TextEncoder().encode(input);
        const z = await streamConv(raw, 'gzip', 'c');
        setOut(btoa(String.fromCharCode(...z)));
        setStat(`${raw.length} B → ${z.length} B (${Math.round((1 - z.length / raw.length) * 100)}% smaller), base64-encoded`);
      } else {
        const z = Uint8Array.from(atob(input.trim()), (c) => c.charCodeAt(0));
        const raw = await streamConv(z, 'gzip', 'd');
        setOut(new TextDecoder().decode(raw));
        setStat('');
      }
      setErr(null);
    } catch (e) { setErr('Failed: ' + (e as Error).message); setOut(''); setStat(''); }
  }
  return (
    <Stack>
      <Field label="Input" action={<Segmented value={dir} onChange={(v) => { setDir(v); run(v); }} options={[{ label: 'Compress', value: 'c' }, { label: 'Decompress', value: 'd' }]} />}>
        <textarea className={`${monoCls} min-h-32`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
      </Field>
      <ToolButton onClick={() => run()}>Run gzip</ToolButton>
      {stat && <p className="text-xs text-[var(--text-muted)]">{stat}</p>}
      <Output value={out} error={err} />
    </Stack>
  );
}
