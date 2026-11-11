import { defineConfig } from 'astro/config';

// Old WordPress URLs; each becomes a static page with a meta refresh.
const redirects = {
  '/de/home-de/': '/de/',
  '/fr/home-fr/': '/fr/',
  '/en/home-en/': '/en/',
  '/de/leistungen-de/': '/de/leistungen/',
  '/fr/mes-services/': '/fr/services/',
  '/en/my-services/': '/en/services/',
  '/fr/elementor-2193/': '/fr/a-propos/',
  '/en/about-me/': '/en/about/',
  '/fr/contact-fr-2/': '/fr/contact/',
  '/en/contact-en/': '/en/contact/',
  '/fr/impressumfr/': '/fr/mentions-legales/',
  '/en/privacy-policy/': '/en/privacy/',
  '/de/feed/': '/de/',
  '/fr/feed/': '/fr/',
  '/en/feed/': '/en/',
  '/de/comments/feed/': '/de/',
  '/fr/comments/feed/': '/fr/',
  '/en/comments/feed/': '/en/',
};

export default defineConfig({
  site: 'https://rudypastel.com',
  output: 'static',
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  trailingSlash: 'always',
  redirects,
  i18n: {
    locales: ['de', 'fr', 'en'],
    defaultLocale: 'de',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
