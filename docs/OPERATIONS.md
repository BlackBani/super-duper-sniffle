# Pauch operations

## Production and deployment

GitHub Pages is the production publisher for `pauch.vip`. Pull requests run `npm run ci` without deploying. A push to `main` repeats the complete suite, uploads `dist`, and deploys it through the `github-pages` environment. `https://pauch.vip/build-info.json` identifies the commit/environment/content and commerce revisions after deployment.

Repository Pages settings report workflow-based publishing, the `pauch.vip` custom domain, and enforced HTTPS. Before merging, review the pull-request checks and representative routes locally; after merging, verify the Pages job and the live custom domain.

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
2. Revert the faulty change through a reviewed pull request or re-run the last known-good GitHub Pages workflow; do not rewrite shared Git history.
3. If only commerce data is wrong, revert the single configuration commit, increment `dataRevision`, run `npm run ci`, and deploy.
4. Verify `/`, each locale home, one product, one article, `/image-sitemap.xml`, `/sitemap-index.xml`, `robots.txt`, and the Telegram destination.
5. Record the rollback and affected URLs in `docs/execution/CHANGELOG.md`.
