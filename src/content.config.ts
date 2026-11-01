import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z
  .object({
    de: z.string().min(1),
    fr: z.string().min(1),
    en: z.string().min(1),
  })
  .strict();

const month = z.string().regex(/^\d{4}-\d{2}$/);
const order = z.number().int().positive();

const references = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/references' }),
  schema: z.object({
    client: z.string(),
    start: month,
    end: z.union([month, z.literal('ongoing')]),
    description: localized,
    order,
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      key: z.enum(['r', 'sql', 'shiny']),
      icon: image(),
      title: localized,
      text: localized,
      order,
    }),
});

const servicesPage = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/services-page' }),
  schema: z.object({
    intro: z.array(localized),
    talk: localized,
    button: localized,
    sections: z.array(z.object({ title: localized, text: localized })),
    closing: z.object({ title: localized, text: localized }),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/testimonials' }),
  schema: ({ image }) =>
    z.object({
      quote: localized,
      authorName: z.string(),
      authorRole: z.string(),
      photo: image(),
      order,
    }),
});

export const collections = {
  references,
  services,
  servicesPage,
  testimonials,
};
