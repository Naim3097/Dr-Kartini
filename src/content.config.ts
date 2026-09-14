import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.object({ q: z.string(), a: z.string() });
const source = z.object({
  title: z.string(),
  publisher: z.string(),
  url: z.url(),
});

/**
 * Dermatology condition pages: /dermatology/<id>/
 * Each file is a MedicalWebPage about one MedicalCondition.
 */
const conditions = defineCollection({
  loader: glob({ base: './src/content/conditions', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      navTitle: z.string(),
      metaTitle: z.string().max(65),
      metaDescription: z.string().min(110).max(165),
      summary: z.string(),
      alternateNames: z.array(z.string()).default([]),
      malayName: z.string().optional(),
      wikipedia: z.url().optional(),
      keyFacts: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      symptoms: z.array(z.string()).default([]),
      treatments: z.array(z.string()).default([]),
      whenToSee: z.array(z.string()).default([]),
      faqs: z.array(faq).default([]),
      relatedConditions: z.array(z.string()).default([]),
      relatedArticles: z.array(z.string()).default([]),
      relatedVideos: z.array(z.string()).default([]),
      sources: z.array(source).default([]),
      targetKeywords: z.array(z.string()).default([]),
      image: image().optional(),
      imageAlt: z.string().optional(),
      order: z.number().default(100),
      datePublished: z.coerce.date(),
      lastReviewed: z.coerce.date(),
    }),
});

/**
 * Articles: /articles/<id>/
 */
const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      metaTitle: z.string().max(65),
      metaDescription: z.string().min(110).max(165),
      summary: z.string(),
      keyTakeaways: z.array(z.string()).default([]),
      category: z.enum([
        'dermatology',
        'animal-welfare',
        'environment',
        'community',
        'perspectives',
        'press-statements',
      ]),
      tags: z.array(z.string()).default([]),
      lang: z.enum(['en', 'ms']).default('en'),
      datePublished: z.coerce.date(),
      dateModified: z.coerce.date().optional(),
      medicallyReviewed: z.boolean().default(false),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      faqs: z.array(faq).default([]),
      relatedConditions: z.array(z.string()).default([]),
      relatedArticles: z.array(z.string()).default([]),
      relatedVideos: z.array(z.string()).default([]),
      sources: z.array(source).default([]),
      targetKeywords: z.array(z.string()).default([]),
      legacyUrl: z.string().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { conditions, articles };
