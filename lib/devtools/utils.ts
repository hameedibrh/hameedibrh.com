// Pure, framework-free helpers for the dev tools. Kept here so the tool
// components stay thin and these stay unit-testable.

/* ----------------------------- calculator ----------------------------- */
const FUNCS: Record<string, (n: number) => number> = {
  sqrt: Math.sqrt, sin: Math.sin, cos: Math.cos, tan: Math.tan,
  log: Math.log10, ln: Math.log, abs: Math.abs, round: Math.round,
  floor: Math.floor, ceil: Math.ceil,
};
const CONSTS: Record<string, number> = { pi: Math.PI, e: Math.E };

// Safe arithmetic evaluator (shunting-yard → RPN). No eval(), no globals.
export function evalExpression(input: string): number {
  const tokens = input.match(/(\d+\.?\d*|\.\d+|[a-z]+|[+\-*/%^()]|,)/gi);
  if (!tokens) throw new Error('Empty expression');
  const out: (number | string)[] = [];
  const ops: string[] = [];
  const prec: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2, '^': 3 };
  const right = new Set(['^']);
  let prev: string | null = null;

  for (let t of tokens) {
    if (/^(\d|\.)/.test(t)) {
      out.push(parseFloat(t));
    } else if (/^[a-z]+$/i.test(t)) {
      t = t.toLowerCase();
      if (t in CONSTS) out.push(CONSTS[t]);
      else if (t in FUNCS) ops.push(t);
      else throw new Error(`Unknown name: ${t}`);
    } else if (t === '(') {
      ops.push(t);
    } else if (t === ')') {
      while (ops.length && ops[ops.length - 1] !== '(') out.push(ops.pop()!);
      if (!ops.length) throw new Error('Mismatched parentheses');
      ops.pop();
      if (ops.length && ops[ops.length - 1] in FUNCS) out.push(ops.pop()!);
    } else {
      // unary minus
      if (t === '-' && (prev === null || prev === '(' || prev in prec)) out.push(0);
      while (
        ops.length &&
        ops[ops.length - 1] in prec &&
        (prec[ops[ops.length - 1]] > prec[t] || (prec[ops[ops.length - 1]] === prec[t] && !right.has(t)))
      ) {
        out.push(ops.pop()!);
      }
      ops.push(t);
    }
    prev = t;
  }
  while (ops.length) {
    const op = ops.pop()!;
    if (op === '(') throw new Error('Mismatched parentheses');
    out.push(op);
  }

  const st: number[] = [];
  for (const tok of out) {
    if (typeof tok === 'number') st.push(tok);
    else if (tok in FUNCS) st.push(FUNCS[tok](st.pop()!));
    else {
      const b = st.pop()!, a = st.pop()!;
      st.push(tok === '+' ? a + b : tok === '-' ? a - b : tok === '*' ? a * b : tok === '/' ? a / b : tok === '%' ? a % b : a ** b);
    }
  }
  if (st.length !== 1 || Number.isNaN(st[0])) throw new Error('Invalid expression');
  return st[0];
}

/* --------------------------- JSON → TS types --------------------------- */
export function jsonToTs(value: unknown, rootName = 'Root'): string {
  const interfaces: string[] = [];
  const seen = new Map<string, string>();

  function pascal(s: string): string {
    return s.replace(/(^\w|_\w|-\w)/g, (m) => m.replace(/[_-]/, '').toUpperCase());
  }
  function typeOf(v: unknown, name: string): string {
    if (v === null) return 'null';
    if (Array.isArray(v)) {
      if (!v.length) return 'unknown[]';
      const types = Array.from(new Set(v.map((x) => typeOf(x, name))));
      return (types.length === 1 ? types[0] : `(${types.join(' | ')})`) + '[]';
    }
    if (typeof v === 'object') {
      const iName = pascal(name);
      const body = Object.entries(v as Record<string, unknown>)
        .map(([k, val]) => `  ${/^[a-z_$][\w$]*$/i.test(k) ? k : JSON.stringify(k)}: ${typeOf(val, k)};`)
        .join('\n');
      const def = `export interface ${iName} {\n${body}\n}`;
      if (!seen.has(iName)) {
        seen.set(iName, def);
        interfaces.push(def);
      }
      return iName;
    }
    return typeof v === 'number' ? 'number' : typeof v === 'boolean' ? 'boolean' : 'string';
  }
  typeOf(value, rootName);
  return interfaces.reverse().join('\n\n');
}

/* ------------------------------- CSV ↔ JSON ------------------------------- */
export function csvToJson(csv: string): unknown[] {
  const rows: string[][] = [];
  let row: string[] = [], cell = '', q = false;
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (q) {
      if (c === '"' && csv[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && csv[i + 1] === '\n') i++;
      row.push(cell); cell = ''; rows.push(row); row = [];
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const header = rows.shift() ?? [];
  return rows
    .filter((r) => r.some((v) => v !== ''))
    .map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

export function jsonToCsv(data: unknown): string {
  const arr = Array.isArray(data) ? data : [data];
  const keys = Array.from(new Set(arr.flatMap((o) => Object.keys(o as object))));
  const esc = (v: unknown) => {
    const s = v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [keys.join(','), ...arr.map((o) => keys.map((k) => esc((o as Record<string, unknown>)[k])).join(','))].join('\n');
}

/* ------------------------------- XML format ------------------------------- */
export function formatXml(xml: string, indent = '  '): string {
  let out = '', pad = 0;
  xml.replace(/>\s*</g, '><').split(/(<[^>]+>)/g).filter((t) => t.trim()).forEach((node) => {
    if (/^<\/.+/.test(node)) pad--;
    out += indent.repeat(Math.max(pad, 0)) + node.trim() + '\n';
    if (/^<[^!?][^>]*[^/]>$/.test(node) && !/^<.*<\/.*>$/.test(node)) pad++;
  });
  return out.trim();
}

/* --------------------------------- diff ---------------------------------- */
export type DiffLine = { type: 'same' | 'add' | 'del'; text: string };
// LCS line diff.
export function lineDiff(a: string, b: string): DiffLine[] {
  const x = a.split('\n'), y = b.split('\n');
  const m = x.length, n = y.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--)
    for (let j = n - 1; j >= 0; j--)
      dp[i][j] = x[i] === y[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const res: DiffLine[] = [];
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (x[i] === y[j]) { res.push({ type: 'same', text: x[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { res.push({ type: 'del', text: x[i] }); i++; }
    else { res.push({ type: 'add', text: y[j] }); j++; }
  }
  while (i < m) res.push({ type: 'del', text: x[i++] });
  while (j < n) res.push({ type: 'add', text: y[j++] });
  return res;
}

/* ------------------------------- case utils ------------------------------- */
export function splitWords(s: string): string[] {
  return s
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_\-./]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}
export const slugify = (s: string) =>
  splitWords(s).map((w) => w.toLowerCase()).join('-').replace(/[^a-z0-9-]/g, '');

/* -------------------------- unicode-safe base64 -------------------------- */
export const b64encode = (s: string) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(s)));
export const b64decode = (s: string) =>
  new TextDecoder().decode(Uint8Array.from(atob(s), (c) => c.charCodeAt(0)));
