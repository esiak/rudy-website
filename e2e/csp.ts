import { expect, type Page } from '@playwright/test';

// The site's content security policy. The tests send it as a header so they
// don't depend on how the host delivers it.
export const csp =
  "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'";

// Serves every document with the CSP and collects violations.
export async function watchCsp(page: Page): Promise<string[]> {
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
  await page.exposeFunction('reportViolation', (m: string) => problems.push(m));
  await page.addInitScript(() => {
    document.addEventListener('securitypolicyviolation', (e) =>
      (
        window as unknown as { reportViolation: (m: string) => void }
      ).reportViolation(e.violatedDirective),
    );
  });
  return problems;
}

export async function expectNoCspViolations(page: Page, path: string) {
  const problems = await watchCsp(page);
  await page.goto(path);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  expect(problems).toEqual([]);
}
