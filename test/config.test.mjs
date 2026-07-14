import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

test('commerce remains active with one HTTPS Telegram order URL', () => {
  const source = readFileSync(new URL('../src/config/commerce.ts', import.meta.url), 'utf8');
  assert.match(source, /enabled:\s*true/);
  assert.deepEqual([...source.matchAll(/orderUrl:\s*'(https:\/\/t\.me\/[^']+)'/g)].map((match) => match[1]), ['https://t.me/m/8ebhN3f-MDMy']);
});

test('canonical organization name is Pauch', () => {
  const source = readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8');
  assert.match(source, /name:\s*'Pauch'/);
  assert.doesNotMatch(source, /name:\s*'Pouch'/);
});
