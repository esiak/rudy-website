import { test, expect } from '@playwright/test';
import { getLocalizedPath, locales } from '../src/i18n/routes';
import { t } from '../src/i18n/ui';
import { expectNoCspViolations } from './csp';

for (const locale of locales) {
  test(`${locale} sidebar offers an email link`, async ({ page }) => {
    await page.goto(getLocalizedPath('contact', locale));
    await expect(
      page.getByText(t(locale, 'contact.messageMeText')),
    ).toBeVisible();
    await expect(
      page.locator('a[href="mailto:pastel.web@rudypastel.com"]'),
    ).toBeVisible();
  });
}

test('no CSP violations on /en/contact/', async ({ page }) => {
  await expectNoCspViolations(page, '/en/contact/');
});
