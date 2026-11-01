import { describe, expect, it } from 'vitest';
import { locales } from './routes';
import { t, ui } from './ui';

describe('t', () => {
  it('returns the string for each locale', () => {
    expect(t('en', 'button.contactMe')).toBe('Contact me');
    expect(t('de', 'nav.about')).toBe('Über mich');
    expect(t('fr', 'nav.about')).toBe('À propos');
  });

  it('has the same keys in every locale, with no empty values', () => {
    const keys = Object.keys(ui.de).sort();
    for (const locale of locales) {
      expect(Object.keys(ui[locale]).sort()).toEqual(keys);
      for (const value of Object.values(ui[locale])) {
        expect(value.trim()).not.toBe('');
      }
    }
  });
});
