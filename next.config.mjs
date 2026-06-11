/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export — required for GitHub Pages (custom domain hameedibrh.com).
  output: 'export',
  // GitHub Pages serves files directly; no Next.js image optimization server exists.
  // Images are pre-optimized at build time (see scripts/optimize-images.mjs).
  images: { unoptimized: true },
  // Emit /about/index.html style folders so deep links resolve on static hosts.
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
