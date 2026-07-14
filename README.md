# Pauch website — content guide

[Russian version](README.ru.md) · [Technical documentation](DOCUMENTATION.md)

Pauch is a static multilingual Astro site for adults 18+, with English, Romanian, and Russian content, a product catalog, editorial resources, and active Telegram ordering.

## Content source of truth

- Products: `src/content/products/*.json`
- Brands: `src/content/brands/*.json`
- Blog posts: `src/content/blog/*.json`
- Blog hubs: `src/content/hubs/*.json`
- Shared interface copy: `src/i18n/en.json`, `src/i18n/ro.json`, `src/i18n/ru.json`
- Product and blog images: `public/images/products/`, `public/images/blog/`
- Commerce and Telegram settings: `src/config/commerce.ts`

Only content records are rendered. Adding an image without a corresponding content record does not publish a product or article.

## Editorial rules

- Keep all three locale translations aligned.
- Do not invent prices, stock, measurements, manufacturer facts, health claims, authors, or contact details.
- Preserve existing slugs unless a redirect is added deliberately.
- Product `availability` remains `unknown` and Offer schema remains disabled until a maintained inventory source exists.
- Use official sources for factual product or health-adjacent claims and record the source in the content model where supported.

The full governance workflow is in `docs/CONTENT_OPERATIONS.md`.

## Images

Keep stable public URLs. Product packshots should normally use transparent PNG sources; the build also uses generated responsive WebP variants. After image changes, run:

```bash
node scripts/optimize-images.mjs
node scripts/generate-responsive-images.mjs
node scripts/image-inventory.mjs --write
```

## Validation

Use Node 22.12 or newer.

```bash
npm ci
npm run ci
node scripts/image-inventory.mjs --check
```

The suite checks Astro diagnostics, TypeScript, Node tests, content, builds, canonical and hreflang integrity, JSON-LD, internal links, assets, commerce destinations, and high-severity dependency advisories.

## Publishing

The GitHub workflow validates `main`; it does not publish GitHub Pages. `netlify.toml` is the deploy-ready production configuration pending confirmation that Netlify owns `pauch.vip`. Review `docs/OPERATIONS.md` before deployment and verify `/build-info.json` after release.

For browser-only editorial changes, open a pull request, wait for validation, obtain review, merge, and verify the connected production provider. Do not bypass review by committing content directly to `main`.
