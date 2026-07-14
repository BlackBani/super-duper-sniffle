# PAUCH implementation plan

Accepted 2026-07-14. This repository implements the owner-approved plan supplied with the autonomous execution package. The canonical written organization name is **Pauch** (`PAUCH` may remain the visual wordmark), Telegram ordering and delivery remain active, and no redesign is in scope.

## Required work

1. Capture a reproducible untouched baseline and select one production publisher.
2. Centralize site identity, commerce state, ordering, delivery, payment, price, availability, and schema eligibility; never invent missing business data.
3. Make active-commerce copy consistent in EN, RO, and RU and add equivalent About, Contact, Shipping & Payment, How to Order, editorial, corrections, age, privacy, and terms routes.
4. Add build, type, test, content, SEO, generated-site, accessibility-smoke, and audit gates.
5. Remove unsafe HTML paths, serialize JSON-LD safely, and harden the age gate without cloaking.
6. Implement a crawlable root/x-default page, self-canonicals, reciprocal localized alternates, truthful Organization/WebSite data, breadcrumbs, and internal navigation.
7. Replace invalid social imagery, add responsive image markup and an image sitemap, inventory unused assets, preserve public URLs, and enforce image budgets.
8. Add verified-only brand/product/editorial models and routes. Unsupported facts stay absent and are recorded as blockers.
9. Upgrade Astro and official integrations in an isolated sequence after regression gates exist.
10. Document deployment, rollback, measurement, content operations, external blockers, and 14/28/90-day review steps.

## Definition of done

All repository-implementable tickets pass `npm ci`, `npm run check`, `npm run typecheck`, `npm test`, `npm run validate:content`, `npm run build`, `npm run validate:seo`, `npm run validate:dist`, and `npm run audit:high`, or have an explicit time-bounded rationale. No unsupported claim, broken order URL, unsafe raw HTML path, cross-language canonical, invalid image, or contradictory commerce state may remain. External credentials, account-side actions, private business facts, native-language approval, production deployment, and irreversible off-site actions are documented but not fabricated or executed.

The detailed 2,055-line accepted plan remains part of the originating execution package; this checked-in plan is its operational ticket index, not a change of scope.
