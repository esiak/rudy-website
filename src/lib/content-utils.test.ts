import { describe, expect, it } from 'vitest';
import { locales } from '../i18n/routes';
import {
  formatPeriod,
  localizeReferences,
  localizeServices,
  localizeTestimonials,
  sortByOrder,
  type ReferenceEntry,
  type ServiceEntry,
  type TestimonialEntry,
} from './content-utils';

const load = <T>(files: Record<string, unknown>) =>
  Object.entries(files).map(([path, mod]) => ({
    id: path.split('/').pop()!.replace('.json', ''),
    data: (mod as { default: T }).default,
  }));

const references = load<ReferenceEntry['data']>(
  import.meta.glob('../content/references/*.json', { eager: true }),
);
const services = load<ServiceEntry<string>['data']>(
  import.meta.glob('../content/services/*.json', { eager: true }),
);
const testimonials = load<TestimonialEntry<string>['data']>(
  import.meta.glob('../content/testimonials/*.json', { eager: true }),
);

describe('formatPeriod', () => {
  it('formats an ongoing period per locale', () => {
    expect(formatPeriod('2023-06', 'ongoing', 'de')).toBe('seit 06/2023');
    expect(formatPeriod('2023-06', 'ongoing', 'fr')).toBe('depuis 06/2023');
    expect(formatPeriod('2023-06', 'ongoing', 'en')).toBe('since 06/2023');
  });

  it('formats a closed period the same in every locale', () => {
    for (const locale of locales) {
      expect(formatPeriod('2023-07', '2023-09', locale)).toBe(
        '07/2023 - 09/2023',
      );
    }
  });
});

describe('sortByOrder', () => {
  it('sorts ascending, stably, without mutating the input', () => {
    const input = [
      { order: 3, name: 'c' },
      { order: 1, name: 'a1' },
      { order: 2, name: 'b' },
      { order: 1, name: 'a2' },
    ];
    const copy = structuredClone(input);
    const sorted = sortByOrder(input);
    expect(sorted.map((i) => i.name)).toEqual(['a1', 'a2', 'b', 'c']);
    expect(sorted).not.toBe(input);
    expect(input).toEqual(copy);
  });
});

describe('real content', () => {
  const clients = [
    'München RE',
    'BMW AG',
    'BDO AG',
    'Munich Re',
    'Munich Re',
    'Munich Re',
    'Symrise AG',
    'Symrise AG',
    'Lowell Financial Services GmbH',
    'Volkswagen Data Lab Munich',
  ];
  const firstPeriod = {
    de: 'seit 06/2023',
    fr: 'depuis 06/2023',
    en: 'since 06/2023',
  };

  it('returns 10 references per locale in source order', () => {
    for (const locale of locales) {
      const items = localizeReferences(references, locale);
      expect(items).toHaveLength(10);
      expect(items.map((i) => i.client)).toEqual(clients);
      expect(items[0].period).toBe(firstPeriod[locale]);
    }
  });

  it('returns 3 services in key order per locale', () => {
    for (const locale of locales) {
      const items = localizeServices(services, locale);
      expect(items.map((i) => i.key)).toEqual(['r', 'sql', 'shiny']);
    }
  });

  it('returns 1 testimonial per locale', () => {
    for (const locale of locales) {
      expect(localizeTestimonials(testimonials, locale)).toHaveLength(1);
    }
  });
});
