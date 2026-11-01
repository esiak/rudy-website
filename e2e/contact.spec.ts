import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { parse } from 'smol-toml';
import { getLocalizedPath, locales } from '../src/i18n/routes';
import { t } from '../src/i18n/ui';
import { getThanksPath } from '../src/components/contact/thanks';

const config = parse(readFileSync('netlify.toml', 'utf8')) as unknown as {
  headers: { for: string; values: Record<string, string> }[];
};
const csp = config.headers.find((h) => h.for === '/*')!.values[
  'Content-Security-Policy'
];

test.describe('built HTML', () => {
  for (const locale of locales) {
    const path = getLocalizedPath('contact', locale);
    test(`${locale} form has Netlify markup`, () => {
      const html = readFileSync(`dist${path}index.html`, 'utf8');
      const form = html.match(/<form[^>]*>/)![0];
      expect(form).toContain('name="contact"');
      expect(form).toContain('method="POST"');
      expect(form).toContain('data-netlify="true"');
      expect(form).toContain('netlify-honeypot="bot-field"');
      expect(form).toContain(`action="${getThanksPath(locale)}"`);
      expect(html).toMatch(
        /<input[^>]*type="hidden"[^>]*name="form-name"[^>]*value="contact"/,
      );
      expect(html).toMatch(
        new RegExp(
          `<input[^>]*type="hidden"[^>]*name="language"[^>]*value="${locale}"`,
        ),
      );
      expect(html).toMatch(/<input[^>]*name="bot-field"/);
      expect(html).not.toMatch(/<script>[^<]|<style|style="/);
      expect(html).not.toMatch(/src="https?:\/\/|recaptcha/);
    });
  }
});

test('fields are labelled and required', async ({ page }) => {
  await page.goto('/en/contact/');
  const name = page.getByLabel('Name');
  const email = page.getByLabel('Email');
  const message = page.getByLabel('Message');
  for (const field of [name, email, message]) {
    await expect(field).toBeVisible();
    await expect(field).toHaveAttribute('required', '');
  }
  await expect(name).toHaveAttribute('autocomplete', 'name');
  await expect(email).toHaveAttribute('autocomplete', 'email');
  await expect(email).toHaveAttribute('type', 'email');
  await expect(message).toHaveAttribute('autocomplete', 'off');
});

test('empty submit shows English errors', async ({ page }) => {
  await page.goto('/en/contact/');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page).toHaveURL(/\/en\/contact\/$/);
  const expected = {
    name: t('en', 'form.error.nameRequired'),
    email: t('en', 'form.error.emailRequired'),
    message: t('en', 'form.error.messageRequired'),
  };
  for (const [key, text] of Object.entries(expected)) {
    const field = page.locator(`#contact-${key}`);
    await expect(field).toHaveAttribute('aria-invalid', 'true');
    await expect(field).toHaveAttribute(
      'aria-describedby',
      `contact-${key}-error`,
    );
    await expect(page.locator(`#contact-${key}-error`)).toHaveText(text);
  }
  await expect(page.locator('#contact-name')).toBeFocused();
});

test('invalid email message appears and clears', async ({ page }) => {
  await page.goto('/en/contact/');
  await page.getByLabel('Name').fill('Ada');
  await page.getByLabel('Email').fill('not-an-email');
  await page.getByLabel('Message').fill('Hello');
  await page.getByRole('button', { name: 'Submit' }).click();
  const email = page.locator('#contact-email');
  await expect(email).toHaveAttribute(
    'aria-describedby',
    'contact-email-error',
  );
  await expect(page.locator('#contact-email-error')).toHaveText(
    t('en', 'form.error.emailInvalid'),
  );
  await email.fill('ada@example.com');
  await expect(email).not.toHaveAttribute('aria-describedby', /.*/);
  await expect(email).not.toHaveAttribute('aria-invalid', /.*/);
  await expect(page.locator('#contact-email-error')).toHaveText('');
});

test('errors are in the page language', async ({ page }) => {
  await page.goto('/de/kontakt/');
  await page.getByRole('button', { name: t('de', 'form.submit') }).click();
  await expect(page.locator('#contact-name-error')).toHaveText(
    t('de', 'form.error.nameRequired'),
  );
});

test('works without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  await page.goto('/en/contact/');
  await expect(page.locator('form[name="contact"]')).not.toHaveAttribute(
    'novalidate',
    /.*/,
  );
  for (const id of ['name', 'email', 'message']) {
    await expect(page.locator(`#contact-${id}`)).toHaveAttribute(
      'required',
      '',
    );
  }
  await context.close();
});

test('keyboard reaches all fields in order', async ({ page }) => {
  await page.goto('/en/contact/');
  await page.getByLabel('Name').focus();
  await page.keyboard.type('Ada');
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Email')).toBeFocused();
  await page.keyboard.type('ada@example.com');
  await page.keyboard.press('Tab');
  await expect(page.getByLabel('Message')).toBeFocused();
  await page.keyboard.type('Hello');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Submit' })).toBeFocused();
  await page.locator('#contact-name').focus();
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('input[name="bot-field"]')).not.toBeFocused();
});

for (const locale of locales) {
  test(`${locale} sidebar and privacy note`, async ({ page }) => {
    await page.goto(getLocalizedPath('contact', locale));
    await expect(
      page.getByText(t(locale, 'contact.messageMeText')),
    ).toBeVisible();
    await expect(
      page.locator('a[href="mailto:pastel.web@rudypastel.com"]'),
    ).toBeVisible();
    await expect(
      page.locator(`form a[href="${getLocalizedPath('privacy', locale)}"]`),
    ).toHaveText(t(locale, 'form.privacyLink'));
  });

  test(`${locale} thanks page`, async ({ page }) => {
    const response = await page.goto(getThanksPath(locale));
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      t(locale, 'contact.thanksTitle'),
    );
    const home = page
      .locator('main')
      .getByRole('link', { name: t(locale, 'contact.backHome') });
    await expect(home).toHaveAttribute('href', `/${locale}/`);
  });
}

test('no CSP violations on /en/contact/', async ({ page }) => {
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
  await page.goto('/en/contact/');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('#contact-name-error')).not.toBeEmpty();
  expect(problems).toEqual([]);
});
