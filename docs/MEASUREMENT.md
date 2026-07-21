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

## 2026-07-21 indexing follow-up

The live `Crawled - currently not indexed` report contained 34 examples representing 27 normalized URLs: 32 blog entries and two URL variants of one product page. Sixteen listed URLs now permanently redirect to their trailing-slash canonical; the 27 canonical destinations return 200. Google's newest recorded crawl was July 2, before the July 14 production release. A July 21 live test of the newest example reported that the current page is available to Google, fetchable, indexable, and self-canonical.

Search Console read `sitemap-index.xml` on July 21 but had last read `sitemap-0.xml` on July 13 and still reported 72 discovered URLs while the live page sitemap contained 124. This release therefore:

- adds verifiable `lastmod` dates only to materially changed home/article URLs;
- dates sitemap-index children with the same significant-release date;
- includes `image-sitemap.xml` in the already-submitted main sitemap index;
- removes deprecated image-sitemap metadata tags;
- strengthens crawlable article-to-article and article-to-hub links.

After deployment, confirm that Search Console rereads both sitemap children. Use owner/full access to request indexing for a representative canonical article and product page; do not request every URL individually.
