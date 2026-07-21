import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import seoRelease from '../src/config/seo-release.json' with { type: 'json' };
import { dist } from './lib/site-files.mjs';

const indexPath = join(dist, 'sitemap-index.xml');
const lastmod = seoRelease.lastSignificantUpdate;

if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
  throw new Error(`Invalid sitemap release date: ${lastmod}`);
}

let sitemapIndex = readFileSync(indexPath, 'utf8');

if (!sitemapIndex.includes('<loc>https://pauch.vip/image-sitemap.xml</loc>')) {
  throw new Error('Generated sitemap index does not include image-sitemap.xml.');
}

sitemapIndex = sitemapIndex.replace(
  /<sitemap>([\s\S]*?)<\/sitemap>/g,
  (_entry, contents) => {
    const withoutLastmod = contents.replace(/<lastmod>[^<]+<\/lastmod>/g, '');
    return `<sitemap>${withoutLastmod}<lastmod>${lastmod}</lastmod></sitemap>`;
  },
);

writeFileSync(indexPath, sitemapIndex);
console.log(`Sitemap index finalized with release date ${lastmod}`);
