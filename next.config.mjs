// Optional path prefix for previewing behind a reverse proxy (e.g. code-server
// `/code/absproxy/<port>`). Set PROXY_BASE to that path. Leave unset for the
// real GitHub Pages build so the export stays served from the domain root.
const proxyBase = process.env.PROXY_BASE || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — required for GitHub Pages (custom domain hameedibrh.com).
  output: 'export',
  ...(proxyBase ? { basePath: proxyBase, assetPrefix: proxyBase } : {}),
  // GitHub Pages serves files directly; no Next.js image optimization server exists.
  // Images are pre-optimized at build time (see scripts/optimize-images.mjs).
  images: { unoptimized: true },
  // Emit /about/index.html style folders so deep links resolve on static hosts.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
