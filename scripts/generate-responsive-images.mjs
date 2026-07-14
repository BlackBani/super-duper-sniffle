#!/usr/bin/env node

import { mkdir, readFile, readdir, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { basename, extname, join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUTPUT = join(ROOT, 'public/images/generated');
const widths = [320, 480, 640, 800, 900, 1200];
const productRecords = await Promise.all((await readdir(join(ROOT, 'src/content/products'))).filter((name) => name.endsWith('.json')).map(async (name) => JSON.parse(await readFile(join(ROOT, 'src/content/products', name), 'utf8'))));
const blogRecords = await Promise.all((await readdir(join(ROOT, 'src/content/blog'))).filter((name) => name.endsWith('.json')).map(async (name) => JSON.parse(await readFile(join(ROOT, 'src/content/blog', name), 'utf8'))));
const paths = [...new Set([...productRecords.map((record) => record.image), ...blogRecords.map((record) => record.image).filter(Boolean)])].sort();

await mkdir(OUTPUT, { recursive: true });

for (const publicPath of paths) {
  const source = join(ROOT, 'public', publicPath.replace(/^\//, ''));
  const stem = publicPath.replace(/^\/images\//, '').replace(extname(publicPath), '').replaceAll('/', '-');
  for (const width of widths) {
    const target = join(OUTPUT, `${stem}-${width}.webp`);
    const result = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', source, '-vf', `scale='min(${width},iw)':-2:flags=lanczos`, '-c:v', 'libwebp', '-quality', '78', target], { stdio: 'inherit' });
    if (result.status !== 0) process.exit(result.status || 1);
    if ((await stat(target)).size > 300 * 1024) {
      console.error(`${basename(target)} exceeds 300KB`);
      process.exit(1);
    }
  }
}

console.log(`generated ${paths.length * widths.length} responsive WebP assets`);
