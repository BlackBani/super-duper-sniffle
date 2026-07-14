export const site = {
  name: 'Pauch',
  origin: 'https://pauch.vip',
  defaultLocale: 'ro',
  locales: ['en', 'ro', 'ru'],
  logoPath: '/logo-new.svg',
  defaultOgPath: '/images/og-default.jpg',
  socialProfiles: [] as string[],
  organizationId: 'https://pauch.vip/#organization',
  websiteId: 'https://pauch.vip/#website',
} as const;

export type SiteLocale = (typeof site.locales)[number];

export function absoluteUrl(path: string): string {
  return new URL(path, site.origin).toString();
}
