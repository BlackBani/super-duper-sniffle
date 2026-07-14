import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pauch.vip',
  base: '/',
  integrations: [
    sitemap({
      filter: (page) => !/\/access-denied\/?$/.test(page),
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
