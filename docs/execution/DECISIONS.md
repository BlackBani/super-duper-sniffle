# Decisions

## D-001 — Immutable owner decisions

- Canonical written name: `Pauch`; `PAUCH` is visual-wordmark-only.
- Commerce, Telegram ordering, and delivery remain active.
- No redesign.
- Missing facts are omitted, modeled, and blocked; never invented.

## D-002 — Git baseline

The supplied folder had no Git metadata. A local `main` repository was initialized and the untouched tree committed before functional work, then `seo/commerce-foundation` was created. No remote was invented.

## D-003 — Production pipeline

The owner confirmed GitHub Pages as production. Repository Pages settings confirm workflow-based publishing for the `pauch.vip` custom domain with enforced HTTPS. Pull requests validate without deployment; pushes to `main` validate, upload `dist`, and deploy through the `github-pages` environment. The obsolete Netlify configuration was removed.

## D-004 — Supported framework baseline

The final implementation uses Astro 7, the Content Layer `glob()` loaders, Node 22.12+, and Tailwind through PostCSS. The deprecated Astro Tailwind integration was removed. The upgrade was accepted only after the full CI suite and a zero-vulnerability audit passed.

## D-005 — Final visual acceptance boundary

Generated image assets received direct visual review. Automated browser acceptance could not run because the local in-app browser runtime failed during setup. Static accessibility controls, Astro diagnostics, tests, source validation, and generated-output validation pass; responsive cross-browser and manual assistive-technology review remain a release acceptance task.

## D-006 — Publication target

The owner identified `BlackBani/super-duper-sniffle` as the final GitHub repository. The supplied folder initially had no remote and its locally initialized baseline had unrelated history but content-equivalent files with different mode metadata. A backup was preserved locally and the four implementation commits were rebased onto the repository's actual `main` before publication.
