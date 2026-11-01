import { test, expect } from '@playwright/test';

test('home page is served and shows the under-construction text', async ({
  page,
}) => {
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.getByText('Website under construction')).toBeVisible();
});
