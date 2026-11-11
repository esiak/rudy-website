import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { csp } from './lib/csp';

const read = (path: string) => readFileSync(path, 'utf8');

describe('GitHub Pages setup', () => {
  it('has no netlify.toml', () => {
    expect(existsSync('netlify.toml')).toBe(false);
  });

  it('sets the site and no base', () => {
    const config = read('astro.config.mjs');
    expect(config).toContain("site: 'https://rudypastel.com'");
    expect(config).not.toContain('base:');
  });

  it('deploys dist with the Pages actions', () => {
    const workflow = read('.github/workflows/deploy.yml');
    expect(workflow).toContain('node-version-file: .nvmrc');
    expect(workflow).toContain('path: dist');
    expect(workflow).toContain('actions/deploy-pages');
  });

  it('keeps the CSP strict', () => {
    expect(csp).toContain("script-src 'self'");
    expect(csp).toContain("style-src 'self'");
    expect(csp).not.toContain('unsafe-inline');
    expect(csp).not.toContain('unsafe-eval');
    expect(csp).not.toContain('frame-ancestors');
  });

  it('names GitHub and not Netlify in the privacy texts', () => {
    for (const lang of ['de', 'fr', 'en']) {
      const text = read(`src/components/legal/content/${lang}/privacy.md`);
      expect(text).toContain('GitHub, Inc.');
      expect(text.toLowerCase()).not.toContain('netlify');
    }
  });
});
