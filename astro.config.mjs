import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import seoRelease from './src/config/seo-release.json' with { type: 'json' };

export default defineConfig({
  site: 'https://pauch.vip',
  base: '/',
  integrations: [
    sitemap({
      filter: (page) => !/\/access-denied\/?$/.test(page),
      customSitemaps: ['https://pauch.vip/image-sitemap.xml'],
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const changedInThisRelease =
          /^\/(?:en|ro|ru)\/$/.test(pathname) ||
          /^\/(?:en|ro|ru)\/blog\/[^/]+\/$/.test(pathname);

        if (changedInThisRelease) item.lastmod = seoRelease.lastSignificantUpdate;
        return item;
      },
      namespaces: {
        news: false,
        image: false,
        video: false,
      },
    }),
  ],
  i18n: {
    // Localized routes remain prefixed; root is the neutral x-default selector.
    defaultLocale: 'ro',
    locales: ['en', 'ru', 'ro'],
    routing: {
      prefixDefaultLocale: true,
      // Preserve the custom language-neutral / page.
      redirectToDefaultLocale: false,
    },
  },
  build: {
    format: 'directory',
  },
});
