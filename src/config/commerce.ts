import type { SiteLocale } from './site';

export const commerce = {
  enabled: true,
  orderChannel: 'telegram' as const,
  orderUrl: 'https://t.me/m/8ebhN3f-MDMy',
  deliveryEnabled: true,
  deliveryAreas: {
    chisinau: true,
    nationwide: true,
  },
  deliveryCopy: {
    en: 'Delivery in Chișinău in 1–2 hours after confirmation. Delivery is also available across Moldova.',
    ro: 'Livrare în Chișinău în 1–2 ore după confirmare. Livrarea este disponibilă și în toată Moldova.',
    ru: 'Доставка по Кишинёву в течение 1–2 часов после подтверждения. Доставка также доступна по всей Молдове.',
  } satisfies Record<SiteLocale, string>,
  paymentMethods: ['cash-on-delivery'] as const,
  showPrices: false,
  showAvailability: false,
  enableOfferSchema: false,
  currency: 'MDL' as const,
  dataRevision: '2026-07-14-cash-only',
} as const;

export function validateCommerceConfig(): string[] {
  const errors: string[] = [];
  if (!commerce.enabled) errors.push('Commerce must remain enabled by owner decision.');
  if (commerce.enabled) {
    try {
      const url = new URL(commerce.orderUrl);
      if (url.protocol !== 'https:' || url.hostname !== 't.me') {
        errors.push('The active order URL must be an HTTPS t.me URL.');
      }
    } catch {
      errors.push('Commerce is enabled but orderUrl is invalid.');
    }
  }
  if (commerce.deliveryEnabled) {
    for (const locale of ['en', 'ro', 'ru'] as const) {
      if (!commerce.deliveryCopy[locale]?.trim()) errors.push(`Missing delivery copy for ${locale}.`);
    }
  }
  if (commerce.enableOfferSchema && (!commerce.showPrices || !commerce.showAvailability)) {
    errors.push('Offer schema requires visible maintained prices and availability.');
  }
  return errors;
}

const commerceErrors = validateCommerceConfig();
if (commerceErrors.length) throw new Error(commerceErrors.join('\n'));
