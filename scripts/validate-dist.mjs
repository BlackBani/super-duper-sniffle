import { readFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { bytes, dist, failIf, htmlFiles, routeForFile, walk } from './lib/site-files.mjs';

const errors = [];
const warnings = [];
const inactive = /\b(?:paused|temporarily closed|orders unavailable)\b/i;
const orderUrl = 'https://telegram.me/m/8ebhN3f-MDMy';

for (const file of htmlFiles()) {
  const html = readFileSync(file, 'utf8');
  const route = routeForFile(file);
  if (inactive.test(html)) errors.push(`${route}: inactive-commerce copy`);
  for (const match of html.matchAll(/https:\/\/(?:telegram\.me|t\.me)\/[^"'<>\s]+/g)) {
    if (match[0] !== orderUrl && !match[0].includes('PauchRecenzii')) errors.push(`${route}: unexpected Telegram order URL ${match[0]}`);
  }
}

for (const file of walk(join(dist, 'images'))) {
  const extension = extname(file).toLowerCase();
  const buffer = readFileSync(file);
  if ((extension === '.jpg' || extension === '.jpeg') && !(buffer[0] === 0xff && buffer[1] === 0xd8)) errors.push(`${file}: invalid JPEG signature`);
  if (extension === '.png' && !(buffer[0] === 0x89 && buffer.subarray(1, 4).toString() === 'PNG')) errors.push(`${file}: invalid PNG signature`);
  if (bytes(file) > 500_000) warnings.push(`${file}: image exceeds 500KB (${bytes(file)} bytes)`);
}

if (warnings.length) {
  console.warn(`Dist validation: ${warnings.length} budget warning(s)`);
  for (const warning of warnings) console.warn(`- ${warning}`);
}
failIf(errors, 'Dist validation');
