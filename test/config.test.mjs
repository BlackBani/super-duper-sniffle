import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

test('commerce remains active with one HTTPS Telegram order URL', () => {
  const source = readFileSync(new URL('../src/config/commerce.ts', import.meta.url), 'utf8');
  assert.match(source, /enabled:\s*true/);
  assert.deepEqual([...source.matchAll(/orderUrl:\s*'(https:\/\/t\.me\/[^']+)'/g)].map((match) => match[1]), ['https://t.me/m/8ebhN3f-MDMy']);
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

test('canonical organization name is Pauch', () => {
  const source = readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8');
  assert.match(source, /name:\s*'Pauch'/);
  assert.doesNotMatch(source, /name:\s*'Pouch'/);
});
