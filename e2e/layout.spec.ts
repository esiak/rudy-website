import { test, expect } from '@playwright/test';

const pages = [
  {
    locale: 'de',
    path: '/de/ueber-mich/',
    others: ['/fr/a-propos/', '/en/about/'],
    privacy: '/de/datenschutz/',
    imprint: '/de/impressum/',
  },
  {
    locale: 'fr',
    path: '/fr/a-propos/',
    others: ['/de/ueber-mich/', '/en/about/'],
    privacy: '/fr/confidentialite/',
    imprint: '/fr/mentions-legales/',
  },
  {
    locale: 'en',
    path: '/en/about/',
    others: ['/de/ueber-mich/', '/fr/a-propos/'],
    privacy: '/en/privacy/',
    imprint: '/en/imprint/',
  },
];

for (const p of pages) {
  test.describe(p.locale, () => {
    test('chrome markup', async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator('html')).toHaveAttribute('lang', p.locale);
      await expect(page.locator('main#content')).toHaveCount(1);

      await page.keyboard.press('Tab');
      const skip = page.locator('.skip-link');
      await expect(skip).toBeFocused();
      await expect(skip).toHaveAttribute('href', '#content');

      const switcher = page.locator('.lang-switcher');
      await expect(switcher.locator('a')).toHaveCount(2);
      const hrefs = await switcher
        .locator('a')
        .evaluateAll((els) => els.map((e) => e.getAttribute('href')));
      expect(hrefs).toEqual(p.others);
      await expect(switcher.locator(`[aria-current="true"]`)).toHaveText(
        p.locale.toUpperCase(),
      );
      await expect(
        switcher.locator('a', { hasText: p.locale.toUpperCase() }),
      ).toHaveCount(0);

      await expect(
        page.locator('.site-nav a[aria-current="page"]'),
      ).toHaveAttribute('href', p.path);
      const footer = page.locator('footer');
      await expect(footer.locator(`a[href="${p.privacy}"]`)).toHaveCount(1);
      await expect(footer.locator(`a[href="${p.imprint}"]`)).toHaveCount(1);
    });

    test('mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 700 });
      await page.goto(p.path);
      const button = page.locator('.menu-button');
      const nav = page.locator('.site-nav');
      await expect(button).toBeVisible();
      await expect(button).toHaveAttribute('aria-expanded', 'false');
      await expect(nav).toBeHidden();

      await button.click();
      await expect(button).toHaveAttribute('aria-expanded', 'true');
      await expect(nav).toBeVisible();
      await button.click();
      await expect(button).toHaveAttribute('aria-expanded', 'false');
      await expect(nav).toBeHidden();

      await button.focus();
      await page.keyboard.press('Enter');
      await expect(button).toHaveAttribute('aria-expanded', 'true');
      await expect(nav).toBeVisible();

      await page.locator('.site-nav a').first().focus();
      await page.keyboard.press('Escape');
      await expect(button).toHaveAttribute('aria-expanded', 'false');
      await expect(nav).toBeHidden();
      await expect(button).toBeFocused();
    });

    test('desktop also uses the menu button', async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 700 });
      await page.goto(p.path);
      const button = page.locator('.menu-button');
      const nav = page.locator('.site-nav');
      await expect(button).toBeVisible();
      await expect(nav).toBeHidden();
      await button.click();
      await expect(nav).toBeVisible();
      // A click outside the header (here the footer) closes the menu.
      await page.locator('footer p').click();
      await expect(nav).toBeHidden();
    });
  });
}

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 700 } });

  for (const p of pages) {
    test(`${p.locale} nav is visible`, async ({ page }) => {
      await page.goto(p.path);
      await expect(page.locator('.menu-button')).toBeHidden();
      await expect(page.locator('.site-nav a').first()).toBeVisible();
    });
  }
});
