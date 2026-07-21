import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

test('commerce remains active with one HTTPS Telegram order URL', () => {
  const source = readFileSync(new URL('../src/config/commerce.ts', import.meta.url), 'utf8');
  assert.match(source, /enabled:\s*true/);
  assert.deepEqual([...source.matchAll(/orderUrl:\s*'(https:\/\/telegram\.me\/[^']+)'/g)].map((match) => match[1]), ['https://telegram.me/m/8ebhN3f-MDMy']);
});

test('payment is cash on delivery only in customer-facing sources', () => {
  const files = [
    '../src/config/commerce.ts',
    '../src/i18n/en.json',
    '../src/i18n/ro.json',
    '../src/i18n/ru.json',
    '../src/i18n/servicePages.ts',
  ];
  const source = files.map((file) => readFileSync(new URL(file, import.meta.url), 'utf8')).join('\n');
  assert.match(source, /paymentMethods:\s*\['cash-on-delivery'\]/);
  assert.doesNotMatch(source, /bank-transfer|bank transfer|transfer bancar|банковск/i);
});

test('original FAQ ordering answers and clickable guide behavior are preserved', () => {
  const answers = {
    en: "Simply click the 'Order in Telegram' button. Our manager will instantly contact you to clarify the details.",
    ro: 'Apasă butonul «Comandă în Telegram». Managerul nostru te va contacta instantaneu pentru a clarifica detaliile.',
    ru: 'Просто нажмите кнопку «Заказать в Telegram». Наш менеджер мгновенно свяжется с вами для уточнения деталей.',
  };
  for (const [locale, expected] of Object.entries(answers)) {
    const content = JSON.parse(readFileSync(new URL(`../src/i18n/${locale}.json`, import.meta.url), 'utf8'));
    const item = content.faq.items.find(({ question }) => /order|comandă|заказ/i.test(question));
    assert.equal(item.answer, expected);
  }
  const accordion = readFileSync(new URL('../src/components/ui/Accordion.astro', import.meta.url), 'utf8');
  assert.match(accordion, /href=\{part\.value\}/);
});

test('original trust-band copy is preserved in all locales', () => {
  const expected = {
    en: { secure: '100% Secure', support: 'Fast Support', satisfaction: '99% Satisfied' },
    ro: { secure: '100% Securizat', support: 'Suport rapid', satisfaction: '99% Mulțumiți' },
    ru: { secure: 'Безопасно', support: 'Поддержка 24/7', satisfaction: '99% Довольны' },
  };
  for (const [locale, trustBand] of Object.entries(expected)) {
    const content = JSON.parse(readFileSync(new URL(`../src/i18n/${locale}.json`, import.meta.url), 'utf8'));
    assert.deepEqual(content.trustBand, trustBand);
  }
});

test('mobile brand row renders one non-scrolling five-column set', () => {
  const source = readFileSync(new URL('../src/components/home/BrandsSection.astro', import.meta.url), 'utf8');
  assert.match(source, /grid-template-columns:\s*repeat\(5, minmax\(0, 1fr\)\)/);
  assert.match(source, /\.brand-item:nth-child\(n \+ 6\)[\s\S]*?display:\s*none/);
  assert.match(source, /@media \(min-width: 768px\)[\s\S]*?animation:\s*scroll-brands/);
});

test('canonical organization name is Pauch', () => {
  const source = readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8');
  assert.match(source, /name:\s*'Pauch'/);
  assert.doesNotMatch(source, /name:\s*'Pouch'/);
});

test('llms.txt exposes only verified service facts and canonical discovery URLs', () => {
  const source = readFileSync(new URL('../public/llms.txt', import.meta.url), 'utf8');
  assert.match(source, /^# Pauch/m);
  assert.match(source, /https:\/\/telegram\.me\/m\/8ebhN3f-MDMy/);
  assert.match(source, /Payment: cash on delivery only\./);
  assert.match(source, /https:\/\/pauch\.vip\/sitemap-index\.xml/);
  assert.match(source, /https:\/\/pauch\.vip\/image-sitemap\.xml/);
  assert.doesNotMatch(source, /bank transfer|card payment|transfer bancar|\u0431\u0430\u043d\u043a\u043e\u0432\u0441\u043a/i);
});

test('catalog packshots use responsive crawlable image markup', () => {
  const source = readFileSync(new URL('../src/components/product/ProductLineCard.astro', import.meta.url), 'utf8');
  assert.match(source, /getPublicImageMetadata/);
  assert.match(source, /getResponsiveImageData/);
  assert.match(source, /width=\{imageMetadata\.width\}/);
  assert.match(source, /height=\{imageMetadata\.height\}/);
  assert.match(source, /srcset=\{responsiveImage\.srcset/);
  assert.match(source, /sizes="\(min-width: 1280px\)/);
  assert.match(source, /class="product-destination-link product-image-link/);
});

test('main sitemap index includes the standards-compliant image sitemap', () => {
  const config = readFileSync(new URL('../astro.config.mjs', import.meta.url), 'utf8');
  const imageSitemap = readFileSync(new URL('../src/pages/image-sitemap.xml.ts', import.meta.url), 'utf8');
  assert.match(config, /customSitemaps:\s*\['https:\/\/pauch\.vip\/image-sitemap\.xml'\]/);
  assert.doesNotMatch(imageSitemap, /image:(?:caption|geo_location|title|license)/);
  assert.match(imageSitemap, /<image:loc>/);
});
