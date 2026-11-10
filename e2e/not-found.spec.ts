import { existsSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { expectNoCspViolations } from './csp';

test('the build produces dist/404.html', () => {
  expect(existsSync('dist/404.html')).toBe(true);
});

test('an unknown path shows the 404 page', async ({ page }) => {
  await page.goto('/this-page-does-not-exist/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Deutsch' })).toHaveAttribute(
    'href',
    '/de/',
  );
  await expect(page.getByRole('link', { name: 'Français' })).toHaveAttribute(
    'href',
    '/fr/',
  );
  await expect(page.getByRole('link', { name: 'English' })).toHaveAttribute(
    'href',
    '/en/',
  );
});

test('no CSP violations on the 404 page', async ({ page }) => {
  await expectNoCspViolations(page, '/this-page-does-not-exist/');
});
