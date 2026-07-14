import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { attrs, decodeHtml, dist, failIf, htmlFiles, routeForFile } from './lib/site-files.mjs';

const errors = [];
const pages = new Map(htmlFiles().map((file) => [routeForFile(file), { file, html: readFileSync(file, 'utf8') }]));
const origin = 'https://pauch.vip';
const stripOrigin = (url) => url.startsWith(origin) ? new URL(url).pathname : null;

for (const [route, page] of pages) {
  const titles = [...page.html.matchAll(/<title>([\s\S]*?)<\/title>/gi)];
  if (titles.length !== 1 || !decodeHtml(titles[0]?.[1] || '').trim()) errors.push(`${route}: expected one non-empty title`);
  const isNoindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(page.html);
  if (isNoindex) continue;
  const descriptions = [...page.html.matchAll(/<meta[^>]+name=["']description["'][^>]*>/gi)].map((m) => attrs(m[0]));
  if (descriptions.length !== 1 || !descriptions[0]?.content) errors.push(`${route}: expected one meta description`);
  const canonicals = [...page.html.matchAll(/<link[^>]+rel=["']canonical["'][^>]*>/gi)].map((m) => attrs(m[0]).href);
  if (canonicals.length !== 1) errors.push(`${route}: expected one canonical`);
  else if (stripOrigin(canonicals[0]) !== route) errors.push(`${route}: canonical is not self-referencing (${canonicals[0]})`);

  const alternates = [...page.html.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["'][^"']+["'][^>]*>/gi)].map((m) => attrs(m[0]));
  if (!alternates.some((alt) => alt.hreflang === 'x-default')) errors.push(`${route}: missing x-default`);
  for (const alternate of alternates.filter((alt) => alt.hreflang !== 'x-default')) {
    const targetRoute = stripOrigin(alternate.href);
    const target = targetRoute && pages.get(targetRoute);
    if (!target) { errors.push(`${route}: alternate target missing ${alternate.href}`); continue; }
    const reciprocal = [...target.html.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["'][^"']+["'][^>]*>/gi)]
      .map((m) => attrs(m[0]).href)
      .includes(`${origin}${route}`);
    if (!reciprocal) errors.push(`${route}: alternate ${targetRoute} is not reciprocal`);
  }

  const jsonLd = [...page.html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of jsonLd) {
    try { JSON.parse(decodeHtml(block[1])); } catch (error) { errors.push(`${route}: invalid JSON-LD (${error.message})`); }
  }
  const og = Object.fromEntries([...page.html.matchAll(/<meta[^>]+property=["'](og:[^"']+)["'][^>]*>/gi)].map((m) => { const a = attrs(m[0]); return [a.property, a.content]; }));
  for (const field of ['og:site_name', 'og:image', 'og:image:width', 'og:image:height', 'og:image:type', 'og:image:alt']) {
    if (!og[field]) errors.push(`${route}: missing ${field}`);
  }
  if (og['og:image']) {
    const imageUrl = new URL(og['og:image']);
    const imagePath = join(dist, decodeURIComponent(imageUrl.pathname));
    if (!existsSync(imagePath)) errors.push(`${route}: OG image missing ${imageUrl.pathname}`);
  }
  if (/yourusername\.github\.io|example\.com|REQUIRED_INPUT/i.test(page.html)) errors.push(`${route}: placeholder/staging value found`);
  if (/\b(paused|temporarily closed|orders unavailable)\b/i.test(page.html)) errors.push(`${route}: inactive-commerce copy found`);

  for (const match of page.html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)) {
    const href = decodeHtml(match[1]);
    if (/^(?:mailto:|tel:|https?:\/\/|#|javascript:)/.test(href)) {
      if (/^javascript:/i.test(href)) errors.push(`${route}: javascript URL found`);
      continue;
    }
    const target = new URL(href, `${origin}${route}`).pathname;
    const normalized = target.endsWith('/') ? target : `${target}/`;
    if (!pages.has(target) && !pages.has(normalized) && !existsSync(join(dist, target))) errors.push(`${route}: broken internal link ${href}`);
  }
}

failIf(errors, 'SEO validation');
