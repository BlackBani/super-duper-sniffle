import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';

test('JSON-LD serializer escapes inline-script delimiters', () => {
  const source = readFileSync(new URL('../src/lib/seo/jsonld.ts', import.meta.url), 'utf8');
  assert.match(source, /replace\(\/<\/g/);
  assert.match(source, /\\u003c/);
  assert.match(source, /\\u2028/);
  assert.doesNotMatch(JSON.stringify({ value: '</script>' }).replace(/</g, '\\u003c'), /<\/script>/);
});
