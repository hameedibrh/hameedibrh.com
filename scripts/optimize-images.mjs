// Recompresses the source images into web-optimized WebP under public/images.
// Run with: npm run optimize-images
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const SRC = 'images';
const OUT = 'public/images';

// [source, destination(webp), maxWidth, quality]
const jobs = [
  ['profile-pic.jpg', 'profile-pic.webp', 900, 82],
  ['profile-pic2.jpg', 'profile-pic2.webp', 900, 82],
  ['portfolio/graphique.png', 'portfolio/graphique.webp', 1100, 80],
  ['portfolio/36dot.jpg', 'portfolio/36dot.webp', 1100, 80],
  ['portfolio/festember.jpg', 'portfolio/festember.webp', 1100, 80],
  ['portfolio/histudios.jpg', 'portfolio/histudios.webp', 1100, 80],
  ['portfolio/aavegtheme.JPG', 'portfolio/aavegtheme.webp', 1100, 80],
  ['portfolio/aavegaftermovie.jpg', 'portfolio/aavegaftermovie.webp', 1100, 80],
];

for (const [src, dest, width, quality] of jobs) {
  const outPath = join(OUT, dest);
  await mkdir(dirname(outPath), { recursive: true });
  const info = await sharp(join(SRC, src))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath);
  console.log(`✓ ${dest}  (${(info.size / 1024).toFixed(0)} KB, ${info.width}×${info.height})`);
}

console.log('\nDone. Optimized images written to public/images.');
