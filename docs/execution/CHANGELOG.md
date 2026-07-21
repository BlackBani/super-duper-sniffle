# Execution changelog

## 2026-07-14 — Baseline started

- Initialized local Git history because the supplied folder contained no `.git` directory.
- Created untouched baseline commit on `main` and implementation branch `seo/commerce-foundation`.
- Existing `npm ci` and `npm run build` pass; baseline output contains 73 pages.
- No production deployment performed.

## 2026-07-14 — Foundation integration

- Centralized Pauch identity and active commerce configuration.
- Added 18 localized service/trust routes, 15 localized brand routes, 12 localized hub routes, and three sourced terminology routes.
- Added root x-default page, safe JSON-LD, reciprocal-alternate/internal-link/asset validators, image sitemap, and build metadata endpoint.
- Hardened the age gate and content renderer; added nine security/config tests.
- Replaced the invalid OG asset, optimized legacy images in place, and generated responsive WebP variants while preserving URLs.
- Initially converted GitHub Pages to validation-only based on an incorrect hosting assumption; corrected later after owner confirmation.
- No production deployment or external account action performed.

## 2026-07-14 — Supported platform and final validation

- Upgraded to Astro 7 and migrated collections to Content Layer glob loaders.
- Standardized Node 22.12+ and moved Tailwind to PostCSS.
- Reduced the dependency audit from 10 baseline findings to zero.
- Passed Astro diagnostics with zero errors/warnings/hints, TypeScript, nine tests, source validation, a 127-page build, SEO/output validation, and the 177-asset image inventory check.
- Replaced machine-specific and obsolete deployment documentation.
- The owner supplied `BlackBani/super-duper-sniffle` as the publication repository; the local implementation was rebased onto its actual `main` history for a mergeable review branch.

## 2026-07-14 — GitHub Pages hosting correction

- Confirmed through repository settings that GitHub Pages publishes `pauch.vip` via Actions with enforced HTTPS.
- Restored Pages artifact upload and deployment after the full CI gate; added pull-request validation without deployment.
- Removed the obsolete Netlify configuration and corrected all operational and release documentation.

## 2026-07-21 — Indexing and image-discovery follow-up

- Added `/llms.txt` with canonical localized resources and only the verified cash-on-delivery, Telegram, and delivery facts already used by the site.
- Added the image sitemap to the submitted sitemap index and release-dated materially changed sitemap entries.
- Removed image-sitemap tags deprecated by Google while preserving every existing image URL.
- Added responsive dimensions, `srcset`, `sizes`, descriptive localized alt text, and crawlable product-page links to homepage catalog images.
- Rendered the existing related-article and hub relationships on all localized article pages.
- Used only the current image inventory; no new photography or generated imagery was introduced.
- Updated Astro from 7.0.9 to 7.1.3 to remove the newly reported reflected-XSS advisory.
