import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { failIf, readJson, root, walk } from './lib/site-files.mjs';

const errors = [];
const locales = ['en', 'ro', 'ru'];
const collections = ['products', 'blog', 'hubs', 'brands'];
const slugs = new Map();

for (const collection of collections) {
  const dir = join(root, 'src', 'content', collection);
  for (const file of walk(dir).filter((path) => path.endsWith('.json'))) {
    let record;
    try { record = readJson(file); } catch (error) {
      errors.push(`${file}: invalid JSON (${error.message})`);
      continue;
    }
    if (record.translations) {
      for (const locale of locales) {
        if (!record.translations[locale]) errors.push(`${file}: missing ${locale} translation`);
      }
    }
    if (record.slug) {
      const key = `${collection}:${record.slug}`;
      if (slugs.has(key)) errors.push(`${file}: duplicate slug ${record.slug}`);
      slugs.set(key, file);
    }
    if (record.image) {
      const imagePath = join(root, 'public', record.image.replace(/^\//, ''));
      if (!existsSync(imagePath)) errors.push(`${file}: missing image ${record.image}`);
    }
    if (collection === 'products') {
      if (!record.brand || !record.strengthCategory) errors.push(`${file}: missing brand/category`);
      if ('price' in record && !record.currency) errors.push(`${file}: price requires currency`);
      if (record.availability === 'in-stock' && !record.verifiedAt) errors.push(`${file}: in-stock requires verifiedAt`);
    }
  }
}

for (const locale of locales) {
  const file = join(root, 'src', 'i18n', `${locale}.json`);
  try { readJson(file); } catch (error) { errors.push(`${file}: ${error.message}`); }
}

const commerceSource = readFileSync(join(root, 'src/config/commerce.ts'), 'utf8');
if (!/enabled:\s*true/.test(commerceSource)) errors.push('commerce.ts: commerce must remain enabled');
const orderUrl = commerceSource.match(/orderUrl:\s*'([^']+)'/)?.[1];
if (!orderUrl || !/^https:\/\/telegram\.me\/m\//.test(orderUrl)) errors.push('commerce.ts: missing valid HTTPS Telegram business URL');
if (/\b(?:Pouch Moldova|name:\s*['"]Pouch['"])/i.test(readFileSync(join(root, 'src/config/site.ts'), 'utf8'))) {
  errors.push('site.ts: forbidden replacement brand name');
}

failIf(errors, 'Content validation');
