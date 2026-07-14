# File ownership

Exclusive ownership applies while parallel work is active.

| Owner | Owned paths | Prohibited/shared paths |
|---|---|---|
| Lead | `package*.json`, `astro.config.mjs`, `src/config/**`, `src/layouts/BaseLayout.astro`, `src/content.config.ts`, `scripts/**`, CI/deploy files, integration docs | May integrate all paths after handoff |
| Commerce agent | `src/i18n/**`, home/product/order components, localized service pages | No package/config/layout/content-schema edits |
| Security agent | `src/components/layout/AgeGate.astro`, `src/components/ui/Accordion.astro`, localized blog page templates, denial pages, security tests | No package/config/layout/i18n edits |
| Image agent | `public/images/**`, image inventory/migration docs, image-focused components created by agent | No package/config/layout/content-schema/i18n edits |

Agents must report changed files, tests, assumptions, and unresolved issues. The lead reviews every diff and owns integration.
