import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf-8');
const lines = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

const imprintSources = {
  de: 'docs/source-content/de/impressum.md',
  fr: 'docs/source-content/fr/impressumfr.md',
  en: 'docs/source-content/en/imprint.md',
};
const forbidden = [
  'cookie',
  'wordpress',
  'elementor',
  'cookielawinfo',
  'plugin',
  'ttdsg',
  'fingerprint',
  'dogado',
  'e-recht24',
];

describe.each(['de', 'fr', 'en'] as const)('legal content (%s)', (locale) => {
  it('imprint equals the source minus comment and leftover lines', () => {
    const source = lines(read(imprintSources[locale]));
    const expected = source.slice(1, -3);
    const actual = lines(
      read(`src/components/legal/content/${locale}/imprint.md`).replace(
        /\\$/gm,
        '',
      ),
    );
    expect(actual).toEqual(expected);
  });

  it('privacy has no legacy references', () => {
    const text = read(
      `src/components/legal/content/${locale}/privacy.md`,
    ).toLowerCase();
    for (const word of forbidden) {
      expect(text).not.toContain(word);
    }
  });
});
