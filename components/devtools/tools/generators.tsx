'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Stack, Field, Output, ToolButton, inputCls, monoCls, CopyButton } from '../shared';
import { slugify } from '@/lib/devtools/utils';

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  const [list, setList] = useState<string[]>([]);
  const gen = () => setList(Array.from({ length: Math.min(Math.max(count, 1), 100) }, () => crypto.randomUUID()));
  useEffect(gen, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Stack>
      <div className="flex items-end gap-3">
        <Field label="How many"><input type="number" min={1} max={100} className={`${inputCls} w-28`} value={count} onChange={(e) => setCount(Number(e.target.value))} /></Field>
        <ToolButton onClick={gen}>Generate</ToolButton>
      </div>
      <Output label={`${list.length} UUID v4`} value={list.join('\n')} />
    </Stack>
  );
}

export function PasswordGenerator() {
  const [len, setLen] = useState(20);
  const [opts, setOpts] = useState({ upper: true, lower: true, digits: true, symbols: true });
  const [pw, setPw] = useState('');
  function gen() {
    const sets = [
      opts.upper && 'ABCDEFGHJKLMNPQRSTUVWXYZ',
      opts.lower && 'abcdefghijkmnpqrstuvwxyz',
      opts.digits && '23456789',
      opts.symbols && '!@#$%^&*-_=+?',
    ].filter(Boolean) as string[];
    const pool = sets.join('');
    if (!pool) { setPw(''); return; }
    const rnd = crypto.getRandomValues(new Uint32Array(len));
    setPw(Array.from(rnd, (r) => pool[r % pool.length]).join(''));
  }
  useEffect(gen, [len, opts]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Stack>
      <Field label={`Length: ${len}`}>
        <input type="range" min={6} max={64} value={len} onChange={(e) => setLen(Number(e.target.value))} className="w-full accent-[var(--accent-2)]" />
      </Field>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(opts) as (keyof typeof opts)[]).map((k) => (
          <button key={k} onClick={() => setOpts((o) => ({ ...o, [k]: !o[k] }))}
            className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition ${opts[k] ? 'text-white [background:var(--accent-grad)]' : 'glass text-[var(--text-muted)]'}`}>
            {k}
          </button>
        ))}
      </div>
      <div className="glass flex items-center justify-between gap-3 rounded-2xl px-4 py-4">
        <span className="break-all font-mono text-lg">{pw || '—'}</span>
        <div className="flex shrink-0 items-center gap-1"><CopyButton value={pw} /><ToolButton onClick={gen}>↻</ToolButton></div>
      </div>
    </Stack>
  );
}

const LOREM = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat'.split(' ');
export function LoremGenerator() {
  const [paras, setParas] = useState(3);
  const [out, setOut] = useState('');
  function gen() {
    const rnd = (n: number) => Math.floor(Math.random() * n);
    const sentence = () => {
      const len = 8 + rnd(8);
      const s = Array.from({ length: len }, () => LOREM[rnd(LOREM.length)]).join(' ');
      return s[0].toUpperCase() + s.slice(1) + '.';
    };
    setOut(Array.from({ length: Math.max(1, paras) }, () => Array.from({ length: 3 + rnd(3) }, sentence).join(' ')).join('\n\n'));
  }
  useEffect(gen, [paras]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Stack>
      <div className="flex items-end gap-3">
        <Field label="Paragraphs"><input type="number" min={1} max={20} className={`${inputCls} w-28`} value={paras} onChange={(e) => setParas(Number(e.target.value))} /></Field>
        <ToolButton onClick={gen}>Regenerate</ToolButton>
      </div>
      <Output value={out} />
    </Stack>
  );
}

export function QrGenerator() {
  const [text, setText] = useState('https://hameedibrh.com');
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (!text) { setUrl(''); return; }
    QRCode.toDataURL(text, { margin: 2, width: 320, errorCorrectionLevel: 'M' }).then(setUrl).catch(() => setUrl(''));
  }, [text]);
  return (
    <Stack>
      <Field label="Text or URL"><textarea className={`${monoCls} min-h-24`} value={text} onChange={(e) => setText(e.target.value)} /></Field>
      {url && (
        <div className="flex flex-col items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="QR code" width={256} height={256} className="rounded-2xl bg-white p-3" />
          <a href={url} download="qrcode.png" className="text-sm font-semibold text-gradient">Download PNG</a>
        </div>
      )}
    </Stack>
  );
}

export function SlugGenerator() {
  const [input, setInput] = useState('My Awesome Blog Post Title!');
  return (
    <Stack>
      <Field label="Text"><textarea className={`${monoCls} min-h-24`} value={input} onChange={(e) => setInput(e.target.value)} /></Field>
      <Output label="Slug" value={slugify(input)} />
    </Stack>
  );
}
