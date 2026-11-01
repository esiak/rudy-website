import { test, expect } from '@playwright/test';
import { locales, routes, getLocalizedPath } from '../src/i18n/routes';
import type { PageKey } from '../src/i18n/routes';
import { t } from '../src/i18n/ui';

for (const locale of locales) {
  for (const pageKey of Object.keys(routes) as PageKey[]) {
    const path = getLocalizedPath(pageKey, locale);
    test(`${path} renders its stub page`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveText(t(locale, `nav.${pageKey}`));
    });
  }
}
