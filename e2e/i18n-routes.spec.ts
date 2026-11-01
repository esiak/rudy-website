import { test, expect } from '@playwright/test';
import { locales, routes, getLocalizedPath } from '../src/i18n/routes';
import type { PageKey } from '../src/i18n/routes';

// Every page in every language loads, is marked with its language and has
// exactly one non-empty main heading. The heading text itself is page copy,
// so each page's own spec checks it.
for (const locale of locales) {
  for (const pageKey of Object.keys(routes) as PageKey[]) {
    const path = getLocalizedPath(pageKey, locale);
    test(`${path} renders`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      const heading = page.locator('h1');
      await expect(heading).toHaveCount(1);
      await expect(heading).not.toBeEmpty();
    });
  }
}
