import { expect, test } from '@playwright/test';

const portraitAlt = 'Dr. Rudy Pastel – Data Scientist';

const pages = [
  {
    path: '/de/leistungen/',
    contact: '/de/kontakt/',
    h1: 'Leistungen',
    h2s: [
      'Programmierung und Datenanalyse mit R',
      'Entwicklung interaktiver Shiny-Apps',
      'SQL-Datenmanagement',
      'Automatisierung und Visualisierung von Geschäftsprozessen',
      'Vorhersage- und Frühwarnsysteme',
      'ETL-Lösungen',
      'Chancen für die Zukunft',
      'Lassen Sie uns reden!',
    ],
  },
  {
    path: '/fr/services/',
    contact: '/fr/contact/',
    h1: 'Services',
    h2s: [
      'Programmation R et Analyse de Données',
      "Développement d'Applications Interactives avec Shiny",
      'Gestion des Données SQL',
      "Automatisation et Visualisation des Processus d'Affaires",
      "Systèmes de Prévision et d'Alerte Précoce",
      'Solution ETL',
      "Opportunités pour l'Avenir",
      'Parlons-en.',
    ],
  },
  {
    path: '/en/services/',
    contact: '/en/contact/',
    h1: 'Services',
    h2s: [
      'R Programming and Data Analysis',
      'Development of Interactive Shiny Apps',
      'SQL Data Management',
      'Automation and Visualization of Business Processes',
      'Forecasting and Early Warning Systems',
      'ETL Solutions',
      'Future Opportunities',
      'Let us talk',
    ],
  },
];

for (const { path, contact, h1, h2s } of pages) {
  test.describe(path, () => {
    test('content and outline', async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(h1);
      await expect(page.locator('h2')).toHaveText(h2s);
      await expect(page.locator('main :is(h3,h4,h5,h6)')).toHaveCount(0);
      await expect(
        page.locator('main a[href="mailto:pastel.web@rudypastel.com"]'),
      ).toHaveCount(1);
      await expect(page.locator(`main a[href="${contact}"]`)).toHaveCount(2);
      await expect(page.locator(`img[alt="${portraitAlt}"]`)).toHaveCount(1);
    });

    for (const width of [375, 768, 1280]) {
      test(`no horizontal scroll at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await page.goto(path);
        const fits = await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        );
        expect(fits).toBe(true);
      });
    }
  });
}
