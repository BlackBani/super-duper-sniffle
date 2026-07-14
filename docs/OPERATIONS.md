# Pauch operations

## Production and deployment

The repository treats Netlify as the sole production publisher pending owner confirmation. GitHub Actions validates builds but has no Pages deployment permission or deploy job. Production builds run `npm run ci`; deploy previews run the same gates. `https://pauch.vip/build-info.json` identifies the commit/environment/content and commerce revisions after deployment.

Before deployment, confirm that Netlify owns `pauch.vip`, HTTP redirects to HTTPS, the `www` choice is permanent, and alternate hosting domains are redirected or noindexed. No deployment was performed by this implementation.

## Commerce updates

- Update the Telegram destination, commerce switches, revision, and shared facts only in `src/config/commerce.ts`.
- Keep `enabled: true`. Price, availability, and Offer schema stay disabled until maintained per-product data exists.
- Run `npm run ci` after any order, delivery, payment, price, or availability change.
- Update all three localized service strings together and obtain native-language review.

## Content and product updates

- Products: `src/content/products/*.json`; never infer numeric measurements or default unknown stock to in-stock.
- Brands: `src/content/brands/*.json`; detailed facts require official sources and a verification date.
- Articles/hubs: `src/content/blog` and `src/content/hubs`; health-adjacent copy requires named editorial ownership, sources, and qualified review where appropriate.
- Images: preserve existing URLs, run `node scripts/optimize-images.mjs`, `node scripts/generate-responsive-images.mjs`, and `node scripts/image-inventory.mjs --write`.

## Validation

Run `npm ci && npm run ci`. The CI sequence covers Astro diagnostics, TypeScript, Node tests, source-content validation, build, canonical/hreflang/JSON-LD/internal-link checks, asset/commerce checks, and high-severity audit.

## Rollback

1. Identify the last good deploy commit from `/build-info.json` or the provider log.
2. Re-deploy that immutable commit through the selected production provider; do not rewrite Git history.
3. If only commerce data is wrong, revert the single configuration commit, increment `dataRevision`, run `npm run ci`, and deploy.
4. Verify `/`, each locale home, one product, one article, `/image-sitemap.xml`, `/sitemap-index.xml`, `robots.txt`, and the Telegram destination.
5. Record the rollback and affected URLs in `docs/execution/CHANGELOG.md`.
