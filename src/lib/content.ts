import { getCollection } from 'astro:content';
import type { Locale } from '../i18n/routes';
import {
  localizeReferences,
  localizeServices,
  localizeTestimonials,
} from './content-utils';

export const getReferences = async (locale: Locale) =>
  localizeReferences(await getCollection('references'), locale);

export const getServices = async (locale: Locale) =>
  localizeServices(await getCollection('services'), locale);

export const getTestimonials = async (locale: Locale) =>
  localizeTestimonials(await getCollection('testimonials'), locale);
