import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const publicDir = join(root, 'public');

function files(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

function bytes(dir) {
  return files(dir).reduce((total, file) => total + statSync(file).size, 0);
}

function countJson(dir) {
  return files(join(root, dir)).filter((file) => extname(file) === '.json').length;
}

function command(command, args) {
  try {
    return execFileSync(command, args, { cwd: root, encoding: 'utf8' }).trim();
  } catch (error) {
    return `unavailable (${error.status ?? 'error'})`;
  }
}

const htmlFiles = files(dist).filter((file) => extname(file) === '.html');
const html = htmlFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
const count = (pattern) => [...html.matchAll(pattern)].length;
const commercialPattern = /[^<>\n]{0,100}(?:t\.me|telegram|deliver\w*|livr\w*|достав\w*|payment|plată|оплат\w*|price|preț|цена|stock|stoc|налич\w*|paused|closed|unavailable|indispon\w*|недоступ\w*|temporar\w*)[^<>\n]{0,140}/gi;
const commercialStrings = [...new Set([...html.matchAll(commercialPattern)].map((match) => match[0].replace(/\s+/g, ' ').trim()))].sort();

const report = `# Untouched build baseline — 2026-07-14

- Commit: ${command('git', ['rev-parse', '--short', 'main'])}
- Node: ${process.version}
- npm: ${command('npm', ['--version'])}
- Generated HTML pages: ${htmlFiles.length}
- Public bytes: ${bytes(publicDir)}
- Dist bytes: ${bytes(dist)}
- Public images: ${files(join(publicDir, 'images')).length}
- Product records: ${countJson('src/content/products')}
- Brand records: ${countJson('src/content/brands')}
- Article records: ${countJson('src/content/blog')}
- Hub records: ${countJson('src/content/hubs')}
- Canonical tags: ${count(/<link[^>]+rel=["']canonical["'][^>]*>/gi)}
- Hreflang tags: ${count(/<link[^>]+hreflang=/gi)}
- Telegram URL occurrences: ${count(/https:\/\/t\.me\//gi)}
- npm audit baseline: 10 findings reported by the supplied plan (1 low, 5 moderate, 4 high); reproduce online with \`npm audit --json\`.

## Commercial-state strings in generated HTML

${commercialStrings.map((value) => `- ${value}`).join('\n') || '- None found'}
`;

const output = join(root, 'docs', 'baselines', '2026-07-14.md');
writeFileSync(output, report);
console.log(`Wrote ${relative(root, output)}`);
