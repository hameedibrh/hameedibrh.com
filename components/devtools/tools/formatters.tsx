'use client';

import { useState } from 'react';
import { Stack, Field, Output, Segmented, ToolButton, monoCls } from '../shared';
import { formatXml } from '@/lib/devtools/utils';

export function JsonFormatter() {
  const [input, setInput] = useState('{"name":"Hameed","skills":["React","Next.js"],"active":true}');
  const [out, setOut] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [mode, setMode] = useState<'2' | '4' | 'min'>('2');

  function process(m = mode) {
    try {
      const parsed = JSON.parse(input);
      setOut(JSON.stringify(parsed, null, m === 'min' ? undefined : Number(m)));
      setErr(null);
    } catch (e) {
      setErr((e as Error).message);
      setOut('');
    }
  }

  return (
    <Stack>
      <Field
        label="JSON input"
        action={
          <Segmented
            value={mode}
            onChange={(v) => { setMode(v); process(v); }}
            options={[
              { label: '2 spaces', value: '2' },
              { label: '4 spaces', value: '4' },
              { label: 'Minify', value: 'min' },
            ]}
          />
        }
      >
        <textarea className={`${monoCls} min-h-40`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
      </Field>
      <ToolButton onClick={() => process()}>Format / Validate</ToolButton>
      <Output value={out} error={err} />
    </Stack>
  );
}

export function XmlFormatter() {
  const [input, setInput] = useState('<root><user id="1"><name>Hameed</name></user></root>');
  const [out, setOut] = useState('');
  const [err, setErr] = useState<string | null>(null);

  function process() {
    try {
      // surface malformed XML via the browser parser
      const doc = new DOMParser().parseFromString(input, 'application/xml');
      const bad = doc.querySelector('parsererror');
      if (bad) throw new Error(bad.textContent || 'Invalid XML');
      setOut(formatXml(input));
      setErr(null);
    } catch (e) {
      setErr((e as Error).message);
      setOut('');
    }
  }

  return (
    <Stack>
      <Field label="XML / HTML input">
        <textarea className={`${monoCls} min-h-40`} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
      </Field>
      <ToolButton onClick={process}>Format</ToolButton>
      <Output value={out} error={err} />
    </Stack>
  );
}
