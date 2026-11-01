import { existsSync, readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { parse } from 'smol-toml';

const config = parse(readFileSync('netlify.toml', 'utf8')) as unknown as {
  headers: { for: string; values: Record<string, string> }[];
};
const csp = config.headers.find((h) => h.for === '/*')!.values[
  'Content-Security-Policy'
];

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

for (const path of ['/', '/this-page-does-not-exist/']) {
  test(`no CSP violations on ${path}`, async ({ page }) => {
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
    await page.exposeFunction('reportViolation', (m: string) =>
      problems.push(m),
    );
    await page.addInitScript(() => {
      document.addEventListener('securitypolicyviolation', (e) =>
        (
          window as unknown as { reportViolation: (m: string) => void }
        ).reportViolation(e.violatedDirective),
      );
    });
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(problems).toEqual([]);
  });
}
