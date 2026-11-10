import { test, expect } from '@playwright/test';

test('the German home page is served', async ({ page }) => {
  const response = await page.goto('/de/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('h1')).toHaveText('Dr. Rudy Pastel');
});
