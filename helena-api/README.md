# helena-api

Streaming LLM proxy for **Helena**, the chat assistant embedded on [hameedibrh.com](https://hameedibrh.com). Deployed separately from the portfolio site since GitHub Pages can't run server code — this holds the provider API key, the portfolio site (a static export) only ever talks to this endpoint.

## What it does

`api/chat.ts` is a Vercel Edge Function. It takes a short message history, calls the configured LLM with a system prompt grounded in `data/profile.json`, and streams the reply back as plain text.

## Deploy

1. Create a free Redis database at [upstash.com](https://upstash.com) (Vercel's marketplace integration also works) — this backs rate limiting, see below. Copy the REST URL and token from its "REST API" tab.
2. `cd helena-api`
3. `npx vercel` (or connect this directory as its own Vercel project via the dashboard — set **Root Directory** to `helena-api` if deploying from the monorepo)
4. Set environment variables in the Vercel project (see `.env.example`):
   - `LLM_API_KEY` — your provider API key
   - `LLM_MODEL` — the model ID to call
   - `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — from step 1. **Required** — without these the endpoint returns 503 for everyone (see Rate limiting below).
5. Deploy. Note the resulting URL, e.g. `https://helena-api.vercel.app`
6. In the main site repo, set `NEXT_PUBLIC_HELENA_API_URL=https://helena-api.vercel.app/api/chat` (see root `.env.production`) and rebuild.

## CORS

`api/chat.ts` only allows requests from `hameedibrh.com`, `www.hameedibrh.com`, and `localhost:3000` (for local dev). Update `ALLOWED_ORIGINS` in that file if the domain changes.

## Keeping Helena's knowledge current

`data/profile.json` is a generated snapshot of `content/*.json` from the main site. After editing anything in `content/`, regenerate it from the repo root:

```sh
node scripts/build-helena-context.mjs
```

Commit the updated `helena-api/data/profile.json` and redeploy this project.

## Rate limiting

`lib/rateLimit.ts` enforces three layers via Upstash Redis (`checkRateLimit`, called before any LLM request):

| Layer | Limit | Purpose |
|---|---|---|
| Per-IP burst | 8 requests / minute | Blocks scripted hammering from one visitor |
| Per-IP daily | 40 requests / day | Caps how much a single visitor can cost even at a human pace |
| Global daily | 1000 requests / day | Hard ceiling on total spend, regardless of how requests are distributed across IPs |

Exceeding any layer returns `429` with a `Retry-After` header (seconds). **Fails closed**: if `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` aren't set, every request is rejected with `503` rather than silently allowed through unlimited. Adjust the numbers in `lib/rateLimit.ts` if they're too strict or too loose for actual traffic.

IP is read from `x-forwarded-for` (Vercel sets this reliably at the edge). It's a real but spoofable signal — good enough to stop casual abuse and runaway scripts, not a substitute for auth if this ever needs harder guarantees.

## Cost / abuse notes

- `LLM_API_KEY` / `LLM_MODEL` are required env vars (503 if unset) — the model choice lives in Vercel config, not source.
- Each request caps at 20 messages of history and 2000 characters per message; replies cap at 1024 output tokens.
- With the daily caps above, worst-case spend is bounded even under sustained abuse — check current pricing for your chosen model if you want a dollar ceiling and tune `globalDaily` accordingly.

## Note on the underlying SDK

`api/chat.ts` imports `@anthropic-ai/sdk` (aliased to `LLMClient` in code) because that's the actual provider library in use — this one dependency name is the sole unavoidable reference to it in this project; nothing else in source, docs, or the frontend widget names the provider.
