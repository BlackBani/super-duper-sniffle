#!/usr/bin/env node

import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const IMAGE_ROOT = join(ROOT, 'public/images');
const SOURCE_ROOT = join(ROOT, 'src');
const REPORT = join(ROOT, 'docs/images/image-inventory.md');
const shouldWrite = process.argv.includes('--write');
const shouldCheck = process.argv.includes('--check');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(async (entry) => {
        const path = join(directory, entry.name);
        return entry.isDirectory() ? walk(path) : [path];
      }),
  );
  return nested.flat();
}

function inspectImage(buffer) {
  if (buffer.length >= 24 && buffer.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex'))) {
    return {
      mime: 'image/png',
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
    };
  }

  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      if (marker === 0xd8 || marker === 0xd9) {
        offset += 2;
        continue;
      }
      const length = buffer.readUInt16BE(offset + 2);
      if (length < 2 || offset + 2 + length > buffer.length) break;
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
        return {
          mime: 'image/jpeg',
          width: buffer.readUInt16BE(offset + 7),
          height: buffer.readUInt16BE(offset + 5),
        };
      }
      offset += 2 + length;
    }
    return { mime: 'image/jpeg', width: null, height: null };
  }

  if (buffer.length >= 30 && buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP') {
    const chunk = buffer.subarray(12, 16).toString();
    if (chunk === 'VP8X') return { mime: 'image/webp', width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
    const marker = buffer.indexOf(Buffer.from([0x9d, 0x01, 0x2a]));
    if (marker > -1) return { mime: 'image/webp', width: buffer.readUInt16LE(marker + 3) & 0x3fff, height: buffer.readUInt16LE(marker + 5) & 0x3fff };
    if (chunk === 'VP8L' && buffer[20] === 0x2f) {
      const bits = buffer.readUInt32LE(21);
      return { mime: 'image/webp', width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    return { mime: 'image/webp', width: null, height: null };
  }

  const text = buffer.toString('utf8').trimStart();
  if (text.startsWith('<svg') || /^<\?xml[\s\S]*?<svg\b/.test(text)) {
    const tag = text.match(/<svg\b[^>]*>/i)?.[0] ?? '';
    const viewBox = tag.match(/viewBox=["']\s*[-\d.]+\s+[-\d.]+\s+([\d.]+)\s+([\d.]+)\s*["']/i);
    const width = tag.match(/\bwidth=["']([\d.]+)/i);
    const height = tag.match(/\bheight=["']([\d.]+)/i);
    return {
      mime: 'image/svg+xml',
      width: Number(width?.[1] ?? viewBox?.[1] ?? 0) || null,
      height: Number(height?.[1] ?? viewBox?.[2] ?? 0) || null,
    };
  }

  return { mime: 'application/octet-stream', width: null, height: null };
}

const sourceFiles = await walk(SOURCE_ROOT);
const sourceTexts = await Promise.all(
  sourceFiles.map(async (file) => ({
    file,
    text: await readFile(file, 'utf8').catch(() => ''),
  })),
);

const expectedMime = new Map([
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
]);

const records = [];
const errors = [];

for (const file of await walk(IMAGE_ROOT)) {
  const relPublic = relative(join(ROOT, 'public'), file).split('\\').join('/');
  const url = `/${relPublic}`;
  const extension = extname(file).toLowerCase();
  const bytes = (await stat(file)).size;

  if (extension === '') {
    records.push({ url, mime: 'sentinel', width: null, height: null, bytes, refs: [] });
    continue;
  }

  const image = inspectImage(await readFile(file));
  const refs = sourceTexts
    .filter(({ text }) => text.includes(url))
    .map(({ file: source }) => relative(ROOT, source).split('\\').join('/'));

  if (image.mime !== expectedMime.get(extension)) {
    errors.push(`${url}: extension ${extension} contains ${image.mime}`);
  }
  if (!image.width || !image.height) {
    errors.push(`${url}: dimensions could not be determined`);
  }

  records.push({ url, ...image, bytes, refs });
}

const lines = [
  '# Public image inventory',
  '',
  'Generated deterministically by `node scripts/image-inventory.mjs --write`.',
  '',
  '## URL preservation and asset disposition',
  '',
  '- Existing public URLs are preserved. Oversized blog PNGs are optimized in place, and `/images/og-default.jpg` remains the default social-preview URL.',
  '- “Unreferenced” means no exact static URL occurs under `src/`; it does not prove that an asset has no external or future use.',
  '- Unreferenced product images are retained as a potentially valuable catalog pool. Review product/content mapping before any future migration or deletion.',
  '- Unreferenced brand SVGs are also retained; the current brand strip renders names as text rather than loading these files.',
  '- This inventory records technical metadata only. It makes no assertion about copyright, licensing, provenance, or usage rights.',
  '',
  '## Inventory',
  '',
  '| Public URL | Detected MIME | Dimensions | Bytes | Usage |',
  '|---|---:|---:|---:|---|',
  ...records.map((record) => {
    const dimensions = record.width && record.height ? `${record.width}×${record.height}` : '—';
    const usage = record.refs.length
      ? `Referenced: ${record.refs.map((ref) => `\`${ref}\``).join(', ')}`
      : record.mime === 'sentinel'
        ? 'Repository sentinel'
        : 'Unreferenced (retained)';
    return `| \`${record.url}\` | ${record.mime} | ${dimensions} | ${record.bytes} | ${usage} |`;
  }),
  '',
];

const markdown = `${lines.join('\n')}\n`;

if (shouldWrite) {
  await mkdir(dirname(REPORT), { recursive: true });
  await writeFile(REPORT, markdown);
  console.log(`wrote ${relative(ROOT, REPORT)}`);
} else if (shouldCheck) {
  const current = await readFile(REPORT, 'utf8').catch(() => '');
  if (current !== markdown) errors.push('docs/images/image-inventory.md is out of date');
} else {
  process.stdout.write(markdown);
}

if (errors.length) {
  for (const error of errors) console.error(`ERROR: ${error}`);
  process.exit(1);
}

console.log(`validated ${records.filter((record) => record.mime !== 'sentinel').length} images`);
