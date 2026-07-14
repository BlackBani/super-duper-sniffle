import assert from 'node:assert/strict';
import test from 'node:test';

import { escapeHtml, renderSafeMarkdown } from '../src/lib/content/safeMarkdown.mjs';

test('escapeHtml encodes all HTML-significant content characters', () => {
  assert.equal(escapeHtml(`<script a="b">'&</script>`), '&lt;script a=&quot;b&quot;&gt;&#39;&amp;&lt;/script&gt;');
});

test('limited markdown emits only generated tags and escapes script/event payloads', () => {
  const html = renderSafeMarkdown(`## <img src=x onerror=alert(1)>\n\n<script>alert(1)</script>\n- **safe <svg onload=alert(1)>**`);

  assert.match(html, /<h2>&lt;img src=x onerror=alert\(1\)&gt;<\/h2>/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /<strong>safe &lt;svg onload=alert\(1\)&gt;<\/strong>/);
  assert.doesNotMatch(html, /<(?:script|img|svg)\b/i);
});

test('limited markdown rejects javascript and data URLs', () => {
  const html = renderSafeMarkdown('[bad](javascript:alert(1)) [data](data:text/html,boom) [good](https://example.com/a?x=1&y=2)');

  assert.doesNotMatch(html, /javascript:|data:/i);
  assert.doesNotMatch(html, /href="javascript:/i);
  assert.match(html, /href="https:\/\/example\.com\/a\?x=1&amp;y=2"/);
});
