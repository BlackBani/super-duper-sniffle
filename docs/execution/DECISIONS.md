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
