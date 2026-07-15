import LLMClient from 'openai';
import { SYSTEM_PROMPT } from '../lib/systemPrompt';
import { checkRateLimit, clientIp } from '../lib/rateLimit';

export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = new Set([
  'https://hameedibrh.com',
  'https://www.hameedibrh.com',
  'http://localhost:3000',
]);

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2000;

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : 'https://hameedibrh.com';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function isValidHistory(messages: unknown): messages is ChatMessage[] {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return false;
  }
  return messages.every(
    (m) =>
      m &&
      typeof m === 'object' &&
      (m.role === 'user' || m.role === 'assistant') &&
      typeof m.content === 'string' &&
      m.content.length > 0 &&
      m.content.length <= MAX_MESSAGE_CHARS,
  );
}

export default async function handler(req: Request): Promise<Response> {
  const headers = corsHeaders(req.headers.get('origin'));

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers });
  }

  let payload: { messages?: unknown };
  try {
    payload = await req.json();
  } catch {
    return new Response('Invalid JSON body', { status: 400, headers });
  }

  if (!isValidHistory(payload.messages)) {
    return new Response('Invalid message history', { status: 400, headers });
  }

  const ip = clientIp(req);
  const rateLimit = await checkRateLimit(ip);
  if (!rateLimit.ok) {
    return new Response(JSON.stringify({ error: 'rate_limited', reason: rateLimit.reason }), {
      status: rateLimit.reason === 'not_configured' ? 503 : 429,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Retry-After': String(rateLimit.retryAfterSeconds),
      },
    });
  }

  const { LLM_API_KEY, LLM_MODEL, LLM_BASE_URL } = process.env;
  if (!LLM_API_KEY || !LLM_MODEL || !LLM_BASE_URL) {
    return new Response('Service not configured', { status: 503, headers });
  }

  const client = new LLMClient({ apiKey: LLM_API_KEY, baseURL: LLM_BASE_URL });

  const llmStream = await client.chat.completions.create({
    model: LLM_MODEL,
    max_tokens: 1024,
    stream: true,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...payload.messages],
  });

  const encoder = new TextEncoder();
  const responseStream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of llmStream) {
          const text = chunk.choices[0]?.delta?.content;
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch {
        controller.enqueue(encoder.encode('\n\n[Helena hit a snag — please try again in a moment.]'));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(responseStream, {
    headers: {
      ...headers,
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
