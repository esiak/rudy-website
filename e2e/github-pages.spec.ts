import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { getLocalizedPath, locales } from '../src/i18n/routes';
import { csp } from '../src/lib/csp';
import { t } from '../src/i18n/ui';

const oldUrls: [string, string][] = [
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

for (const [from, to] of oldUrls) {
  test(`${from} ends on ${to}`, async ({ page }) => {
    await page.goto(from);
    await expect(page).toHaveURL(new RegExp(`${to}$`));
  });
}

const rootLocales: [string, string][] = [
  ['fr-FR', '/fr/'],
  ['en-US', '/en/'],
  ['de-DE', '/de/'],
  ['it-IT', '/de/'],
];

for (const [locale, target] of rootLocales) {
  test.describe(`browser language ${locale}`, () => {
    test.use({ locale });

    test(`/ forwards to ${target}`, async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveURL(new RegExp(`${target}$`));
    });
  });
}

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, locale: 'fr-FR' });

  test('/ ends on /de/', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/de\/$/);
  });
});

for (const locale of locales) {
  test(`${locale} contact page has the email text and no form`, async ({
    page,
  }) => {
    await page.goto(getLocalizedPath('contact', locale));
    await expect(
      page.getByText(t(locale, 'contact.messageMeText')),
    ).toBeVisible();
    await expect(
      page.locator('a[href="mailto:pastel.web@rudypastel.com"]'),
    ).toBeVisible();
    await expect(page.locator('form')).toHaveCount(0);
  });
}

for (const path of [
  '/de/kontakt/danke/',
  '/fr/contact/merci/',
  '/en/contact/thanks/',
]) {
  test(`${path} is a 404`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
  });
}

for (const file of ['index', 'de/index', 'en/contact/index', '404']) {
  test(`dist/${file}.html carries the CSP meta tag`, () => {
    const html = readFileSync(`dist/${file}.html`, 'utf8');
    expect(html).toContain('http-equiv="Content-Security-Policy"');
    expect(html).toContain(csp);
  });
}

for (const path of ['/de/', '/en/contact/', '/404.html']) {
  test(`no CSP violations on ${path}`, async ({ page }) => {
    const problems: string[] = [];
    await page.exposeFunction('reportViolation', (m: string) =>
      problems.push(m),
    );
    await page.addInitScript(() => {
      document.addEventListener('securitypolicyviolation', (e) =>
        (
          window as unknown as { reportViolation: (m: string) => void }
        ).reportViolation(e.violatedDirective),
      );
    });
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const meta = await page
      .locator('meta[http-equiv="Content-Security-Policy"]')
      .getAttribute('content');
    expect(meta).toBe(csp);
    expect(problems).toEqual([]);
  });
}
