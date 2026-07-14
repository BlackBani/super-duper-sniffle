import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://pauch.vip',
  base: '/',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !/\/access-denied\/?$/.test(page),
    }),
  ],
  i18n: {
    // Romanian is the fallback locale for root redirect and x-default.
    defaultLocale: 'ro',
    locales: ['en', 'ru', 'ro'],
    routing: {
      prefixDefaultLocale: true,
      // Keep custom / index.astro locale redirect logic active.
      redirectToDefaultLocale: false,
    },
  },
  build: {
    format: 'directory',
  },
});
