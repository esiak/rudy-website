import { expect, test } from '@playwright/test';

const pages = [
  { path: '/de/impressum/', h1: 'Impressum' },
  { path: '/fr/mentions-legales/', h1: 'Mentions légales' },
  { path: '/en/imprint/', h1: 'Imprint' },
  { path: '/de/datenschutz/', h1: 'Datenschutz' },
  { path: '/fr/confidentialite/', h1: 'Confidentialité' },
  { path: '/en/privacy/', h1: 'Privacy' },
];
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

for (const { path, h1 } of pages) {
  test(`${path} renders the legal text`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(h1);
    const ids = await page
      .locator('main h2')
      .evaluateAll((els) => els.map((el) => el.id));
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.every((id) => id !== '')).toBe(true);
    const body = (await page.locator('body').innerText()).toLowerCase();
    for (const word of forbidden) {
      expect(body).not.toContain(word);
    }
  });
}
