import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, sep } from 'node:path';

export const root = new URL('../../', import.meta.url).pathname;
export const dist = join(root, 'dist');

export function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

export function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function htmlFiles() {
  return walk(dist).filter((file) => extname(file) === '.html');
}

export function routeForFile(file) {
  const path = relative(dist, file).split(sep).join('/');
  if (path === 'index.html') return '/';
  return `/${path.replace(/index\.html$/, '')}`;
}

export function bytes(path) {
  return statSync(path).size;
}

export function attrs(tag) {
  return Object.fromEntries([...tag.matchAll(/([:\w-]+)=(?:"([^"]*)"|'([^']*)')/g)].map((match) => [match[1].toLowerCase(), match[2] ?? match[3] ?? '']));
}

export function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

export function failIf(errors, label) {
  if (!errors.length) {
    console.log(`${label}: passed`);
    return;
  }
  console.error(`${label}: ${errors.length} error(s)`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
}
