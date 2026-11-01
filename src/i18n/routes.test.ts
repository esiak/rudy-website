import { describe, expect, it } from 'vitest';
import {
  getAlternates,
  getLocale,
  getLocalizedPath,
  locales,
  routes,
} from './routes';
import type { PageKey } from './routes';

const pageKeys = Object.keys(routes) as PageKey[];

const expected: Record<PageKey, string[]> = {
  home: ['/de/', '/fr/', '/en/'],
  services: ['/de/leistungen/', '/fr/services/', '/en/services/'],
  about: ['/de/ueber-mich/', '/fr/a-propos/', '/en/about/'],
  contact: ['/de/kontakt/', '/fr/contact/', '/en/contact/'],
  imprint: ['/de/impressum/', '/fr/mentions-legales/', '/en/imprint/'],
  privacy: ['/de/datenschutz/', '/fr/confidentialite/', '/en/privacy/'],
};

describe('routes', () => {
  it('has a slug for every page and locale', () => {
    for (const key of pageKeys) {
      for (const locale of locales) {
        const slug = routes[key][locale];
        if (key === 'home') expect(slug).toBe('');
        else expect(slug.length).toBeGreaterThan(0);
      }
    }
  });

  it('has no duplicate slugs within a locale', () => {
    for (const locale of locales) {
      const slugs = pageKeys.map((key) => routes[key][locale]);
      expect(new Set(slugs).size).toBe(slugs.length);
    }
  });

  it('builds localized paths', () => {
    for (const key of pageKeys) {
      locales.forEach((locale, i) => {
        expect(getLocalizedPath(key, locale)).toBe(expected[key][i]);
      });
    }
  });

  it('returns the other two locales as alternates', () => {
    for (const key of pageKeys) {
      for (const current of locales) {
        const others = locales.filter((l) => l !== current);
        expect(getAlternates(key, current)).toEqual(
          others.map((locale) => ({
            locale,
            path: getLocalizedPath(key, locale),
          })),
        );
      }
    }
  });

  it('detects the locale from a URL', () => {
    expect(getLocale(new URL('https://x.test/de/kontakt/'))).toBe('de');
    expect(getLocale(new URL('https://x.test/fr/a-propos/'))).toBe('fr');
    expect(getLocale(new URL('https://x.test/en/'))).toBe('en');
    expect(getLocale(new URL('https://x.test/'))).toBe('de');
    expect(getLocale(new URL('https://x.test/it/about/'))).toBe('de');
  });
});
