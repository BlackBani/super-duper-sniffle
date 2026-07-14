#!/usr/bin/env node

import { readdir, rename, stat, unlink } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { basename, join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const BLOG_DIR = join(ROOT, 'public/images/blog');
const PRODUCT_DIR = join(ROOT, 'public/images/products');
const MAX_BYTES = 500 * 1024;
const widths = [1200, 1100, 1000, 960];
const colorCounts = [160, 128, 96];

const ffmpeg = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
if (ffmpeg.status !== 0) {
  console.error('ffmpeg is required to optimize the blog PNG files.');
  process.exit(1);
}

const groups = [
  { directory: BLOG_DIR, files: (await readdir(BLOG_DIR)).filter((file) => file.toLowerCase().endsWith('.png')).sort(), candidateWidths: widths },
  { directory: PRODUCT_DIR, files: ['cuba_hardcore.png', 'iceberg_strong.png', 'pablo_strong.png', 'velo_easy.png', 'zyn_easy.png'], candidateWidths: [900, 800, 700, 640] },
];

for (const group of groups) {
 for (const file of group.files) {
  const source = join(group.directory, file);
  const before = (await stat(source)).size;

  if (before <= MAX_BYTES) {
    console.log(`skip ${file}: ${before} bytes`);
    continue;
  }

  let selected = null;

  for (const width of group.candidateWidths) {
    for (const colors of colorCounts) {
      const candidate = join(group.directory, `.${basename(file)}.${width}-${colors}.tmp.png`);
      const filter = [
        `[0:v]scale=${width}:-2:flags=lanczos,split[a][b]`,
        `[a]palettegen=max_colors=${colors}:stats_mode=diff[p]`,
        '[b][p]paletteuse=dither=sierra2_4a',
      ].join(';');

      const result = spawnSync(
        'ffmpeg',
        ['-y', '-loglevel', 'error', '-i', source, '-filter_complex', filter, candidate],
        { stdio: 'inherit' },
      );

      if (result.status !== 0) {
        await unlink(candidate).catch(() => {});
        console.error(`failed ${file}`);
        process.exit(1);
      }

      const size = (await stat(candidate)).size;
      if (size <= MAX_BYTES) {
        selected = { candidate, width, colors, size };
        break;
      }

      await unlink(candidate);
    }
    if (selected) break;
  }

  if (!selected) {
    console.error(`could not bring ${file} below ${MAX_BYTES} bytes`);
    process.exit(1);
  }

  await rename(selected.candidate, source);
  console.log(
    `optimized ${file}: ${before} -> ${selected.size} bytes (${selected.width}px, ${selected.colors} colors)`,
  );
 }
}
