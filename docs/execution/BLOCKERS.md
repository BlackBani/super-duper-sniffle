# External blockers

These do not block independent repository work.

| Missing input/action | Affected work | Minimum owner action |
|---|---|---|
| Authenticated GitHub CLI is not installed; local repository has no remote | Publish `seo/commerce-foundation` to `BlackBani/super-duper-sniffle` | Install `gh`, authenticate an account with repository write access, then add/push the target remote and open a draft PR |
| Confirm actual production provider and DNS/redirect ownership | P0-02 live acceptance | Name Netlify or GitHub Pages and provide provider access for live verification |
| Search Console exports and URL inspection access | P0-06/07, measurement | Export requested 16-month/90-day/28-day Web and Image datasets or grant access |
| Analytics/consent requirements and production ID | Analytics hooks | Supply approved provider, ID, and consent/privacy decision |
| Registered operator/contact details safe to publish | Organization/contact schema | Supply legal name and publishable contact fields |
| Delivery fees, operating hours, support SLA | Service-page completeness | Supply current maintained facts; absent fields remain omitted |
| Product prices, stock, source documents, GTIN/SKU/manufacturer facts | Offer schema and product enrichment | Supply maintained catalog export and official/packaging sources |
| Official social/profile URLs | `sameAs` | Confirm the canonical profiles |
| Named authors/qualified reviewers and translation approval | Editorial authority | Supply identities/credentials and native-language sign-off |
| Image ownership/rights/creator data | Original image program | Supply provenance and usage rights |
| Production deployment and recrawl | Live acceptance | Merge after review, observe the connected provider, then inspect priority URLs |
| Browser and assistive-technology acceptance | Final UX acceptance | Test keyboard, screen reader, mobile, and desktop flows on a deploy preview or production build |
