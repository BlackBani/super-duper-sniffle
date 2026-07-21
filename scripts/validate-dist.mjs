import { existsSync, readFileSync } from 'node:fs';
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

const llmsPath = join(dist, 'llms.txt');
if (!existsSync(llmsPath)) {
  errors.push('llms.txt: missing from generated site');
} else {
  const llms = readFileSync(llmsPath, 'utf8');
  for (const expected of [
    '# Pauch',
    'https://telegram.me/m/8ebhN3f-MDMy',
    'Payment: cash on delivery only.',
    'https://pauch.vip/sitemap-index.xml',
    'https://pauch.vip/image-sitemap.xml',
  ]) {
    if (!llms.includes(expected)) errors.push(`llms.txt: missing ${expected}`);
  }
  if (/bank transfer|card payment|transfer bancar|\u0431\u0430\u043d\u043a\u043e\u0432\u0441\u043a/i.test(llms)) errors.push('llms.txt: unsupported payment method found');
}

const sitemapIndexPath = join(dist, 'sitemap-index.xml');
if (!existsSync(sitemapIndexPath)) {
  errors.push('sitemap-index.xml: missing from generated site');
} else {
  const sitemapIndex = readFileSync(sitemapIndexPath, 'utf8');
  for (const sitemapUrl of ['https://pauch.vip/sitemap-0.xml', 'https://pauch.vip/image-sitemap.xml']) {
    const escaped = sitemapUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!new RegExp(`<loc>${escaped}<\\/loc><lastmod>\\d{4}-\\d{2}-\\d{2}<\\/lastmod>`).test(sitemapIndex)) {
      errors.push(`sitemap-index.xml: missing dated entry for ${sitemapUrl}`);
    }
  }
}

const imageSitemapPath = join(dist, 'image-sitemap.xml');
if (!existsSync(imageSitemapPath)) {
  errors.push('image-sitemap.xml: missing from generated site');
} else {
  const imageSitemap = readFileSync(imageSitemapPath, 'utf8');
  if (/<image:(?:caption|geo_location|title|license)>/i.test(imageSitemap)) {
    errors.push('image-sitemap.xml: contains deprecated Google image sitemap tags');
  }
  const pageEntries = [...imageSitemap.matchAll(/<url>/g)].length;
  const imageEntries = [...imageSitemap.matchAll(/<image:loc>/g)].length;
  if (!pageEntries || pageEntries !== imageEntries) {
    errors.push(`image-sitemap.xml: expected one discoverable image per page entry (${pageEntries} pages, ${imageEntries} images)`);
  }
}

for (const locale of ['en', 'ro', 'ru']) {
  const homePath = join(dist, locale, 'index.html');
  if (!existsSync(homePath)) continue;
  const home = readFileSync(homePath, 'utf8');
  const catalogImages = [...home.matchAll(/<img[^>]+class="[^"]*product-line-image[^"]*"[^>]*>/g)].map((match) => match[0]);
  if (!catalogImages.length) errors.push(`/${locale}/: no catalog images found`);
  for (const image of catalogImages) {
    for (const attribute of ['width=', 'height=', 'srcset=', 'sizes=', 'loading="lazy"', 'decoding="async"']) {
      if (!image.includes(attribute)) errors.push(`/${locale}/: catalog image missing ${attribute}`);
    }
  }
}

for (const file of htmlFiles().filter((path) => /^\/(?:en|ro|ru)\/blog\/[^/]+\/$/.test(routeForFile(path)))) {
  const html = readFileSync(file, 'utf8');
  if (!html.includes('article-related')) errors.push(`${routeForFile(file)}: missing related article navigation`);
}

if (warnings.length) {
  console.warn(`Dist validation: ${warnings.length} budget warning(s)`);
  for (const warning of warnings) console.warn(`- ${warning}`);
}
failIf(errors, 'Dist validation');
