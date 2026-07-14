# Task graph

```text
P0-01 baseline
  -> P0-02 production ownership
  -> shared site/commerce configuration
      -> commerce consistency + service routes
      -> security + age gate
      -> root identity + SEO + hreflang validators
      -> responsive images + image sitemap
      -> verified brand/product/editorial models
  -> full regression suite
      -> staged dependency upgrade
          -> final QA + operating documentation
              -> deploy-ready handoff
```

External/account-side work (production DNS confirmation, Search Console exports/inspection, rank tracking, analytics IDs, official profiles, outreach, original-image rights, and deployment) is independent and marked `deferred-external` when repository preparation is complete.
