export const locales = ['de', 'fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'de';

export type PageKey =
  'home' | 'services' | 'about' | 'contact' | 'imprint' | 'privacy';

export const routes = {
  home: { de: '', fr: '', en: '' },
  services: { de: 'leistungen', fr: 'services', en: 'services' },
  about: { de: 'ueber-mich', fr: 'a-propos', en: 'about' },
  contact: { de: 'kontakt', fr: 'contact', en: 'contact' },
  imprint: { de: 'impressum', fr: 'mentions-legales', en: 'imprint' },
  privacy: { de: 'datenschutz', fr: 'confidentialite', en: 'privacy' },
} satisfies Record<PageKey, Record<Locale, string>>;

export function getLocale(url: URL): Locale {
  const first = url.pathname.split('/')[1];
  return locales.find((locale) => locale === first) ?? defaultLocale;
}

export function getLocalizedPath(pageKey: PageKey, locale: Locale): string {
  const slug = routes[pageKey][locale];
  return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

export function getAlternates(
  pageKey: PageKey,
  current: Locale,
): { locale: Locale; path: string }[] {
  return locales
    .filter((locale) => locale !== current)
    .map((locale) => ({ locale, path: getLocalizedPath(pageKey, locale) }));
}
