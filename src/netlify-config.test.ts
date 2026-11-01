import { readFileSync } from 'node:fs';
import { parse } from 'smol-toml';
import { describe, expect, it } from 'vitest';

type Redirect = {
  from: string;
  to: string;
  status: number;
  force?: boolean;
  conditions?: { Language?: string[] };
};
type Header = { for: string; values: Record<string, string> };
type Config = {
  build: {
    command: string;
    publish: string;
    environment: Record<string, string>;
  };
  redirects: Redirect[];
  headers: Header[];
};

const config = parse(readFileSync('netlify.toml', 'utf8')) as unknown as Config;

const moved: [string, string][] = [
  ['/de/home-de/', '/de/'],
  ['/fr/home-fr/', '/fr/'],
  ['/en/home-en/', '/en/'],
  ['/de/leistungen-de/', '/de/leistungen/'],
  ['/fr/mes-services/', '/fr/services/'],
  ['/en/my-services/', '/en/services/'],
  ['/fr/elementor-2193/', '/fr/a-propos/'],
  ['/en/about-me/', '/en/about/'],
  ['/fr/contact-fr-2/', '/fr/contact/'],
  ['/en/contact-en/', '/en/contact/'],
  ['/fr/impressumfr/', '/fr/mentions-legales/'],
  ['/en/privacy-policy/', '/en/privacy/'],
  ['/de/feed/', '/de/'],
  ['/fr/feed/', '/fr/'],
  ['/en/feed/', '/en/'],
  ['/de/comments/feed/', '/de/'],
  ['/fr/comments/feed/', '/fr/'],
  ['/en/comments/feed/', '/en/'],
];
const gone = ['/wp-admin/*', '/wp-login.php', '/wp-content/*', '/xmlrpc.php'];

const headersFor = (path: string) =>
  config.headers.find((h) => h.for === path)?.values ?? {};

describe('netlify.toml', () => {
  it('has the build settings and a Node version matching .nvmrc', () => {
    expect(config.build.command).toBe('npm run build');
    expect(config.build.publish).toBe('dist');
    expect(config.build.environment.NODE_VERSION).toBe(
      readFileSync('.nvmrc', 'utf8').trim(),
    );
  });

  it('redirects / by language, in order', () => {
    const root = config.redirects.filter((r) => r.from === '/');
    expect(root).toEqual([
      {
        from: '/',
        to: '/fr/',
        status: 302,
        force: true,
        conditions: { Language: ['fr'] },
      },
      {
        from: '/',
        to: '/en/',
        status: 302,
        force: true,
        conditions: { Language: ['en'] },
      },
      { from: '/', to: '/de/', status: 302, force: true },
    ]);
    expect(config.redirects.slice(0, 3)).toEqual(root);
  });

  it.each(moved)('301 redirects %s to %s', (from, to) => {
    const rules = config.redirects.filter((r) => r.from === from);
    expect(rules).toEqual([{ from, to, status: 301, force: true }]);
  });

  it.each(gone)('returns 410 for %s', (from) => {
    const rules = config.redirects.filter((r) => r.from === from);
    expect(rules).toEqual([
      { from, to: '/404.html', status: 410, force: true },
    ]);
  });

  it('has no redirects beyond the expected table', () => {
    expect(config.redirects).toHaveLength(3 + moved.length + gone.length);
  });

  it('sets security headers on /*', () => {
    const values = headersFor('/*');
    const csp = values['Content-Security-Policy'];
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self'");
    expect(csp).toContain("style-src 'self'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).not.toContain("'unsafe-inline'");
    expect(csp).not.toContain("'unsafe-eval'");
    expect(values['X-Content-Type-Options']).toBe('nosniff');
    expect(values['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
    expect(values['Strict-Transport-Security']).toBe(
      'max-age=31536000; includeSubDomains',
    );
    expect(values['X-Frame-Options']).toBe('DENY');
    for (const feature of [
      'accelerometer',
      'autoplay',
      'camera',
      'display-capture',
      'geolocation',
      'gyroscope',
      'magnetometer',
      'microphone',
      'payment',
      'usb',
      'interest-cohort',
    ]) {
      expect(values['Permissions-Policy']).toContain(`${feature}=()`);
    }
  });

  it('caches /_astro/* as immutable', () => {
    expect(headersFor('/_astro/*')['Cache-Control']).toBe(
      'public, max-age=31536000, immutable',
    );
  });
});
