import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../src/components/layout/AgeGate.astro', import.meta.url), 'utf8');

test('age gate is visible by default and denial stays on a localized site route', () => {
  const openingTag = source.match(/<div\s+id="age-gate"[\s\S]*?>/)?.[0] ?? '';
  assert.doesNotMatch(openingTag, /\bhidden\b/);
  assert.match(source, /\$\{lang\}\/access-denied\//);
  assert.doesNotMatch(source, /google\.com/i);
});

test('age verification record is versioned, expiring, and storage-safe', () => {
  assert.match(source, /POLICY_VERSION = '2026-07-14'/);
  assert.match(source, /verifiedAt: verifiedAt\.toISOString\(\)/);
  assert.match(source, /expiresAt: new Date\(verifiedAt\.getTime\(\) \+ VERIFICATION_LIFETIME_MS\)\.toISOString\(\)/);
  assert.match(source, /Date\.parse\(record\.expiresAt\)/);
  assert.match(source, /try \{[\s\S]*localStorage\.getItem[\s\S]*\} catch \{/);
  assert.match(source, /try \{[\s\S]*localStorage\.setItem[\s\S]*\} catch \{/);
});

test('age gate traps focus and cleans up its body scroll lock', () => {
  assert.match(source, /e\.key === 'Tab'/);
  assert.match(source, /previousFocus\?\.isConnected/);
  assert.match(source, /previousBodyOverflow/);
  assert.match(source, /pagehide/);
  assert.match(source, /astro:before-swap/);
});
