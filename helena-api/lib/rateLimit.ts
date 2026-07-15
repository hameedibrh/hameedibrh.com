import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const configured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const redis = configured ? Redis.fromEnv() : null;

// Blocks scripted bursts from a single visitor.
const perMinute = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(8, '1 m'), analytics: true, prefix: 'helena:min' })
  : null;

// Caps how much a single visitor can cost in a day.
const perIpDaily = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(40, '1 d'), analytics: true, prefix: 'helena:day:ip' })
  : null;

// Hard ceiling on total spend across every visitor, regardless of how requests are spread out.
const globalDaily = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(1000, '1 d'), analytics: true, prefix: 'helena:day:global' })
  : null;

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; reason: 'not_configured' | 'burst' | 'daily_ip' | 'daily_global'; retryAfterSeconds: number };

/**
 * Fails CLOSED: if Upstash isn't configured, every request is rejected rather than
 * silently let through. Deploying without rate limiting is a deliberate opt-out, not a default.
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  if (!perMinute || !perIpDaily || !globalDaily) {
    return { ok: false, reason: 'not_configured', retryAfterSeconds: 60 };
  }

  const [burst, day, global] = await Promise.all([
    perMinute.limit(ip),
    perIpDaily.limit(ip),
    globalDaily.limit('all'),
  ]);

  const failure =
    (!burst.success && { r: burst, reason: 'burst' as const }) ||
    (!day.success && { r: day, reason: 'daily_ip' as const }) ||
    (!global.success && { r: global, reason: 'daily_global' as const }) ||
    null;

  if (!failure) return { ok: true };

  const retryAfterSeconds = Math.max(1, Math.ceil((failure.r.reset - Date.now()) / 1000));
  return { ok: false, reason: failure.reason, retryAfterSeconds };
}
