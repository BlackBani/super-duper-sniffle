import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';

export const prerender = true;

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character]!);

export const GET: APIRoute = async () => {
  const [products, posts] = await Promise.all([getCollection('products'), getCollection('blog')]);
  const entries = [];
  for (const locale of site.locales) {
    for (const { data: product } of products) {
      entries.push({ page: `/${locale}/product/${product.slug}/`, image: product.image, title: product.translations[locale].name });
    }
    for (const { data: post } of posts) {
      if (post.image) entries.push({ page: `/${locale}/blog/${post.translations[locale].slug}/`, image: post.image, title: post.translations[locale].title });
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries.map(({ page, image, title }) => `  <url><loc>${site.origin}${escapeXml(page)}</loc><image:image><image:loc>${site.origin}${escapeXml(image)}</image:loc><image:title>${escapeXml(title)}</image:title></image:image></url>`).join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
