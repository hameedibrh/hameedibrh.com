# hameedibrh.com — folio-2026

Personal portfolio of **Hameed Ibrahim**, rebuilt in **Next.js** with a glassmorphic
(iOS-26 / One-UI style) interface, statically exported and served from GitHub Pages.

## ✨ Highlights

- **Next.js 15 (static export)** — zero server, instant loads, deploys as plain files.
- **Glassmorphic UI** — frosted glass, animated aurora background, dark default + light toggle.
- **Framer Motion** — scroll reveals, animated counters, typing roles, page transitions.
- **Fully content-driven** — every word, link and image comes from `content/*.json`. **You never touch code to update your life.**
- **SEO-first** — metadata, Open Graph, Twitter cards, JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`.
- **Optimized images** — source art recompressed to WebP (~14 MB → ~0.5 MB).
- **Geeky easter eggs** — try the terminal (bottom-left), the Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`), and open your browser console.

## 🖊️ Editing your content

Everything a visitor sees is in [`content/`](./content). Edit the JSON, commit, done:

| File | What it controls |
|------|------------------|
| `personal.json` | Name, greeting, roles, bio, tagline, CTA |
| `about.json` | Profile text, skill list, skill bars |
| `experience.json` / `education.json` | Resume timelines |
| `services.json` | "What I can do" cards |
| `portfolio.json` | Artworks grid + modal embeds (YouTube / Instagram) |
| `stats.json` | Count-up stats |
| `contact.json` | Email, phone, location, Formspree endpoint |
| `social.json` | Social links + icons |
| `seo.json` | Title, description, keywords, schema |

To swap a portfolio thumbnail or photo: drop the new file in `images/`, point the JSON at its
`/images/<name>.webp` path, and run `npm run optimize-images`.

## 🛠️ Local development

```bash
npm install
npm run dev            # http://localhost:3000
npm run optimize-images # regenerate public/images/*.webp from images/
npm run build          # static export to ./out
```

## 🚀 Deployment (GitHub Pages)

A workflow at [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) builds and publishes
automatically. One-time setup:

1. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Merge `folio-2026` into your default branch (or push to it).
3. The custom domain `hameedibrh.com` is preserved via `public/CNAME`.

## 🧱 Stack

Next.js · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · react-icons · canvas-confetti · sharp

> The previous hand-written HTML/CSS/JS site is preserved under [`legacy/`](./legacy).
