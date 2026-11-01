import { describe, expect, it } from 'vitest';
import { home } from './home';
import { locales } from './routes';

describe('home copy', () => {
  const keys = Object.keys(home.de);

  it('has the same keys in every locale', () => {
    for (const locale of locales) {
      expect(Object.keys(home[locale]).sort()).toEqual([...keys].sort());
    }
  });

  for (const locale of locales) {
    it(`has a non-empty string for every key in ${locale}`, () => {
      const copy = home[locale] as Record<string, unknown>;
      for (const key of keys) {
        expect(typeof copy[key], key).toBe('string');
        expect((copy[key] as string).trim(), key).not.toBe('');
      }
    });
  }
});
