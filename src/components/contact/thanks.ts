import { getLocalizedPath } from '../../i18n/routes';
import type { Locale } from '../../i18n/routes';

export const thanksSlugs = {
  de: 'danke',
  fr: 'merci',
  en: 'thanks',
} satisfies Record<Locale, string>;

export function getThanksPath(locale: Locale): string {
  return `${getLocalizedPath('contact', locale)}${thanksSlugs[locale]}/`;
}
