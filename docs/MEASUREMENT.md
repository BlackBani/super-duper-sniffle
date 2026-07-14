# Search and release measurement

## Baseline exports required before deployment

Export Google Search Console at 16 months, 90 days, and 28 days for Web and Image search; split Moldova, mobile/desktop, locale directories, and page types. Store exports outside public web output with a dated manifest. Account access is an external blocker.

Separate query groups:

- Owned brand: `Pauch`, `Pauch Moldova`, `pauch.vip`.
- Product brands: CUBA, PABLO, VELO, ZYN, ICEBERG.
- Category: nicotine pouch terms, Romanian/Russian equivalents, `snus`, and `снюс`.
- Geography and commercial modifiers: Moldova/Chișinău plus order/delivery/price/stock equivalents.

## Release annotation

For every deploy record timestamp, commit, changed URLs, titles/schema/image changes, commerce revision, content revision, and rollback target in `docs/execution/CHANGELOG.md`.

## Review cadence

- Day 7: indexing, selected canonicals, broken order links, commercial-state errors, sitemap and critical schema.
- Day 14: crawl/snippet observations and initial query/page movement; do not infer causation from one SERP sample.
- Day 28: compare equivalent periods by owned brand/product brand/category, locale, device, Web/Image, and landing-page group.
- Day 90: evaluate brand hubs, guides, image traffic, returning/direct traffic, and order-click assists; choose the next verified content priority.

Request recrawl only for the locale homes, representative product/article pages, About, and Shipping & Payment after live verification.
