import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { parse } from 'smol-toml';

const config = parse(readFileSync('netlify.toml', 'utf8')) as unknown as {
  headers: { for: string; values: Record<string, string> }[];
};
const csp = config.headers.find((h) => h.for === '/*')!.values[
  'Content-Security-Policy'
];

const pages = [
  { locale: 'de', contact: '/de/kontakt/', about: '/de/ueber-mich/' },
  { locale: 'fr', contact: '/fr/contact/', about: '/fr/a-propos/' },
  { locale: 'en', contact: '/en/contact/', about: '/en/about/' },
];
const sections = [
  'hero',
  'partner',
  'references',
  'example',
  'services',
  'testimonials',
  'closing',
];

for (const { locale, contact, about } of pages) {
  const path = `/${locale}/`;

  test.describe(path, () => {
    test('loads with one h1 and the sections in order', async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText('Dr. Rudy Pastel');
      const ids = await page
        .locator('main > section')
        .evaluateAll((els) => els.map((el) => el.getAttribute('data-section')));
      expect(ids).toEqual(sections);
    });

    test('has cards, images and alt text', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('[data-card="reference"]')).toHaveCount(10);
      const services = page.locator('[data-card="service"]');
      await expect(services).toHaveCount(3);
      for (const img of await services.locator('img').all()) {
        await expect(img).toHaveAttribute('alt', '');
      }
      const portrait = page.locator('[data-section="hero"] img');
      expect(await portrait.getAttribute('alt')).toBeTruthy();
      const photo = page.locator('[data-section="testimonials"] img');
      expect(await photo.getAttribute('alt')).toBeTruthy();
      await expect(
        page.locator('[data-section="testimonials"] blockquote'),
      ).not.toBeEmpty();
      for (const img of await page.locator('main img').all()) {
        expect(await img.getAttribute('width')).toBeTruthy();
        expect(await img.getAttribute('height')).toBeTruthy();
      }
    });

    test('links to Contact and About and marks Home current', async ({
      page,
    }) => {
      await page.goto(path);
      const contactLinks = page.locator(`main a[href="${contact}"]`);
      await expect(contactLinks).toHaveCount(3);
      await expect(page.locator(`main a[href="${about}"]`)).toHaveCount(1);
      await expect(
        page.locator('header nav a[aria-current="page"]'),
      ).toHaveAttribute('href', path);
    });

    test('button focus outline contrasts with the section background', async ({
      page,
    }) => {
      await page.goto(path);
      const buttons = page.locator('main a.button');
      const count = await buttons.count();
      expect(count).toBe(4);
      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        await button.focus();
        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Tab');
        const { outline, background } = await button.evaluate((el) => ({
          outline: getComputedStyle(el).outlineColor,
          background: getComputedStyle(el.closest('section')!).backgroundColor,
        }));
        expect(outline).not.toBe(background);
      }
    });

    for (const width of [375, 768, 1280]) {
      test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        const overflow = await page.evaluate(
          () =>
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth,
        );
        expect(overflow).toBe(false);
      });
    }
  });
}

test('no CSP violations on /de/', async ({ page }) => {
  await page.route('**/*', async (route) => {
    const response = await route.fetch();
    const headers = { ...response.headers() };
    if (route.request().resourceType() === 'document') {
      headers['content-security-policy'] = csp;
    }
    await route.fulfill({ response, headers });
  });
  const problems: string[] = [];
  page.on('console', (msg) => {
    if (
      msg.type() === 'error' &&
      msg.text().includes('Content Security Policy')
    )
      problems.push(msg.text());
  });
  await page.exposeFunction('reportViolation', (m: string) => problems.push(m));
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (e) =>
      (
        window as unknown as { reportViolation: (m: string) => void }
      ).reportViolation(e.violatedDirective),
    );
  });
  await page.goto('/de/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(problems).toEqual([]);
});
