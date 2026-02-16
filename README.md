# Pauch Website - Client Content Guide

**Русская версия:** see `/Users/nicolaecretu24/Desktop/pouchwebsite_2/README.ru.md`

This guide is for nontechnical editors. You can change content directly in GitHub Web UI.

## 1. What this site is

- Static multilingual website (EN, RO, RU)
- Product catalog + blog + legal pages
- Orders are sent to Telegram via one shared deep link

## 2. Main files you edit

- Products: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/content/products/*.json`
- Blog posts: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/content/blog/*.json`
- Blog hubs/categories: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/content/hubs/*.json`
- UI text (menu, homepage sections, FAQ):
  - `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/i18n/en.json`
  - `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/i18n/ro.json`
  - `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/i18n/ru.json`
- Product images: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/public/images/products/`
- Blog images: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/public/images/blog/`
- Telegram destination link: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/src/i18n/index.ts` (`TELEGRAM_DEEP_LINK`)

## 3. Safe publishing flow (GitHub browser only)

1. Open a file in GitHub.
2. Click `Edit this file` (pencil icon).
3. Make the change.
4. Add a clear commit message.
5. Choose `Commit directly to the main branch`.
6. Commit.
7. Wait for deployment to finish.
8. Verify the change on the live site.

If needed, revert from the commit history.

## 4. Product editing rules

### 4.1 What controls visible products

Only product JSON files in `/src/content/products/` are rendered in the catalog.

Images sitting in `/public/images/products/` are not shown unless a product JSON points to them.

### 4.2 Required product fields

Important fields in each product JSON:

- `slug`: unique URL key
- `brand`: brand name
- `strength`: numeric rank (used for sorting)
- `strengthCategory`: must be one of:
  - `easy`
  - `medium`
  - `strong`
  - `hardcore`
- `flavorCategory`: must be one of:
  - `mint`
  - `citrus`
  - `berry`
  - `coffee`
  - `tropical`
- `pouchesPerCan`: number (usually `20`)
- `image`: example `"/images/products/velo_easy.png"`
- `translations.en`, `translations.ro`, `translations.ru` with `name` and `description`

There is no product price field in current site logic. Do not add pricing data.

### 4.3 Image format recommendation

Use transparent `.png` for product cans when possible, because cards are styled to blend with transparent packshots.

## 5. Blog editing rules

Each blog file contains all 3 languages in one place.

Important fields per language block:

- `title`
- `slug`
- `metaTitle`
- `metaDescription`
- `excerpt`
- `content`
- optional `faq`

Post-level fields:

- `postId` (unique)
- `publishedAt` (`YYYY-MM-DD`)
- `hub` (`switching`, `strength`, `selection`, `safety`)
- `image` (example `"/images/blog/your-image.png"`)

## 6. Homepage / UI text editing

Update text only in:

- `/src/i18n/en.json`
- `/src/i18n/ro.json`
- `/src/i18n/ru.json`

Do not rename JSON keys.

## 7. Legal pages

Language-specific legal pages:

- `/src/pages/en/terms.astro`, `/src/pages/en/privacy.astro`, `/src/pages/en/age-policy.astro`
- `/src/pages/ro/terms.astro`, `/src/pages/ro/privacy.astro`, `/src/pages/ro/age-policy.astro`
- `/src/pages/ru/terms.astro`, `/src/pages/ru/privacy.astro`, `/src/pages/ru/age-policy.astro`

## 8. Locale and redirect behavior (current)

- Localized routes are always under `/en/`, `/ro/`, `/ru/`.
- Root `/` uses a custom redirect page:
  - JS enabled: redirect by browser language (`en`, `ro`, `ru`)
  - Unsupported browser language: fallback to `/ro/`
  - No JS: fallback to `/ro/`

## 9. SEO behavior (current)

- Canonical tags are generated per page.
- `hreflang` alternates are generated per page for EN/RO/RU.
- `x-default` points to the equivalent Romanian page (not hardcoded homepage).
- Root `/` is intentionally non-indexable and canonicalized to `/ro/`.
- Sitemap is generated at build time via Astro sitemap integration.

## 10. Deployments

This repo includes both deployment configs:

- GitHub Pages workflow: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/.github/workflows/deploy.yml`
- Netlify config: `/Users/nicolaecretu24/Desktop/pouchwebsite_2/netlify.toml`

Use the platform currently connected in your account.

## 11. Quick pre-commit checklist

1. Correct file edited?
2. EN/RO/RU content updated where needed?
3. JSON syntax valid (commas, quotes, braces)?
4. Image uploaded and path matches exactly?
5. Slug remains correct?
6. Deployment passed?

## 12. Developer commands (optional)

```bash
npm install
npm run dev
npm run build
npm run preview
```
