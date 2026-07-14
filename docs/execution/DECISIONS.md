# Decisions

## D-001 — Immutable owner decisions

- Canonical written name: `Pauch`; `PAUCH` is visual-wordmark-only.
- Commerce, Telegram ordering, and delivery remain active.
- No redesign.
- Missing facts are omitted, modeled, and blocked; never invented.

## D-002 — Git baseline

The supplied folder had no Git metadata. A local `main` repository was initialized and the untouched tree committed before functional work, then `seo/commerce-foundation` was created. No remote was invented.

## D-003 — Production pipeline assumption

Until live provider ownership can be verified, Netlify is treated as the deploy-ready production configuration because it already contains host-level redirect behavior. GitHub Pages publication will be converted to validation-only so two repository pipelines cannot publish production. DNS and live-provider confirmation remain external.

## D-004 — Supported framework baseline

The final implementation uses Astro 7, the Content Layer `glob()` loaders, Node 22.12+, and Tailwind through PostCSS. The deprecated Astro Tailwind integration was removed. The upgrade was accepted only after the full CI suite and a zero-vulnerability audit passed.

## D-005 — Final visual acceptance boundary

Generated image assets received direct visual review. Automated browser acceptance could not run because the local in-app browser runtime failed during setup. Static accessibility controls, Astro diagnostics, tests, source validation, and generated-output validation pass; responsive cross-browser and manual assistive-technology review remain a release acceptance task.

## D-006 — Publication target

The owner identified `BlackBani/super-duper-sniffle` as the final GitHub repository. No remote is configured in the supplied folder, and authenticated GitHub CLI tooling is unavailable locally, so no remote state was changed. Publication must preserve the isolated implementation branch and its reviewable commits.
