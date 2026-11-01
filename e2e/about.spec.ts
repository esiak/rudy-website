import { test, expect } from '@playwright/test';
import { aboutCopy } from '../src/components/about/copy';
import { t } from '../src/i18n/ui';

const pages = [
  { locale: 'de', path: '/de/ueber-mich/', contact: '/de/kontakt/' },
  { locale: 'fr', path: '/fr/a-propos/', contact: '/fr/contact/' },
  { locale: 'en', path: '/en/about/', contact: '/en/contact/' },
] as const;

for (const p of pages) {
  test.describe(p.locale, () => {
    const copy = aboutCopy[p.locale];

    test('content', async ({ page }) => {
      const response = await page.goto(p.path);
      expect(response?.status()).toBe(200);

      const h1 = page.locator('h1');
      await expect(h1).toHaveCount(1);
      await expect(h1).toHaveText(t(p.locale, 'nav.about'));

      for (const heading of [
        copy.passionHeading,
        copy.educationHeading,
        copy.personalHeading,
        copy.skillsHeading,
        copy.expertiseHeading,
        copy.languagesHeading,
        copy.testimonialsHeading,
        copy.closingHeading,
      ]) {
        await expect(
          page.getByRole('heading', { level: 2, name: heading, exact: true }),
        ).toBeVisible();
      }

      await expect(
        page.locator('img[alt="Dr. Rudy Pastel – Data Scientist"]'),
      ).toBeVisible();
      await expect(
        page.locator('a[href="mailto:pastel.web@rudypastel.com"]'),
      ).toBeVisible();

      for (const label of [copy.contactLabel, copy.cvLabel]) {
        const links = page.locator('main a', { hasText: label });
        expect(await links.count()).toBeGreaterThan(0);
        for (const link of await links.all()) {
          await expect(link).toHaveAttribute('href', p.contact);
        }
      }

      await expect(
        page
          .locator('section', {
            has: page.getByRole('heading', { name: copy.expertiseHeading }),
          })
          .locator('li'),
      ).toHaveCount(4);

      const figure = page.locator('figure');
      await expect(figure).toContainText('Dr. Sebastian Kaiser');
      await expect(figure.locator('blockquote')).not.toBeEmpty();
      await expect(
        figure.locator('img[alt="Dr. Sebastian Kaiser"]'),
      ).toBeVisible();
    });

    for (const width of [375, 768, 1280]) {
      test(`no horizontal overflow at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto(p.path);
        const fits = await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        );
        expect(fits).toBe(true);
      });
    }
  });
}
