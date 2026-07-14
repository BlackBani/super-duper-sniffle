import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const productsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    slug: z.string(),
    brand: z.string(),
    strength: z.number(),
    strengthCategory: z.enum(['easy', 'medium', 'strong', 'hardcore']),
    flavorCategory: z.enum(['mint', 'citrus', 'berry', 'coffee', 'tropical']),
    pouchesPerCan: z.number().default(20),
    image: z.string(),
    featured: z.boolean().default(false),
    productId: z.string().optional(),
    brandId: z.string().optional(),
    variantName: z.string().optional(),
    aliases: z.array(z.string()).default([]),
    manufacturer: z.string().optional(),
    countryOfOrigin: z.string().optional(),
    sku: z.string().optional(),
    gtin: z.string().optional(),
    nicotineMgPerPouch: z.number().positive().optional(),
    nicotineMgPerGram: z.number().positive().optional(),
    netWeightG: z.number().positive().optional(),
    pouchWeightG: z.number().positive().optional(),
    pouchFormat: z.enum(['mini', 'slim', 'regular', 'large']).optional(),
    flavorTags: z.array(z.string()).default([]),
    price: z.number().nonnegative().optional(),
    currency: z.literal('MDL').optional(),
    availability: z.enum(['in-stock', 'low-stock', 'out-of-stock', 'preorder', 'unknown']).default('unknown'),
    orderUrl: z.url().optional(),
    officialSourceUrls: z.array(z.url()).default([]),
    verifiedAt: z.string().optional(),
    productStatus: z.enum(['active', 'discontinued', 'unverified']).default('unverified'),
    translations: z.object({
      en: z.object({
        name: z.string(),
        description: z.string(),
      }),
      ru: z.object({
        name: z.string(),
        description: z.string(),
      }),
      ro: z.object({
        name: z.string(),
        description: z.string(),
      }),
    }),
  }),
});

const localizedBrandSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const brandsCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/brands' }),
  schema: z.object({
    brandId: z.string(),
    slug: z.string(),
    displayName: z.string(),
    aliases: z.array(z.string()).default([]),
    manufacturer: z.string().optional(),
    countryOfOrigin: z.string().optional(),
    officialSourceUrls: z.array(z.url()).default([]),
    verifiedAt: z.string(),
    logo: z.string().optional(),
    heroImage: z.string().optional(),
    status: z.enum(['verified', 'partial', 'discontinued']),
    representedProductSlugs: z.array(z.string()).default([]),
    translations: z.object({
      en: localizedBrandSchema,
      ro: localizedBrandSchema,
      ru: localizedBrandSchema,
    }),
  }),
});

// FAQ item schema
const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

// Blog post translation schema
const blogTranslationSchema = z.object({
  title: z.string(),
  slug: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  excerpt: z.string(),
  content: z.string(),
  h2s: z.array(z.string()).optional(),
  faq: z.array(faqItemSchema).optional(),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/blog' }),
  schema: z.object({
    postId: z.string(), // Translation group ID (e.g., "P001")
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    image: z.string().optional(),
    hub: z.enum(['switching', 'strength', 'selection', 'safety']),
    targetKeyword: z.string(),
    disclaimerType: z.enum(['general', 'safety']).default('general'),
    relatedPosts: z.array(z.string()).optional(), // Array of postIds
    ctaTargets: z.array(z.string()).optional(), // Collection URLs
    translations: z.object({
      en: blogTranslationSchema,
      ru: blogTranslationSchema,
      ro: blogTranslationSchema,
    }),
  }),
});

// Hub page schema
const hubCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/hubs' }),
  schema: z.object({
    hubId: z.string(),
    translations: z.object({
      en: z.object({
        title: z.string(),
        slug: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
        intro: z.string(),
      }),
      ru: z.object({
        title: z.string(),
        slug: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
        intro: z.string(),
      }),
      ro: z.object({
        title: z.string(),
        slug: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
        intro: z.string(),
      }),
    }),
    featuredPosts: z.array(z.string()), // postIds
    featuredCollections: z.array(z.string()), // collection slugs
  }),
});

export const collections = {
  products: productsCollection,
  blog: blogCollection,
  hubs: hubCollection,
  brands: brandsCollection,
};
