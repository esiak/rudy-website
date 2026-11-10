# rudy-website

A website built with Astro (static output, `output: 'static'`), TypeScript
(`strict`), npm, ESLint + Prettier, Vitest for logic and Playwright for smoke
tests of the built site.

Key paths: `src/pages/` (routes), `e2e/` (Playwright specs), `astro.config.mjs`,
`tsconfig.json`, `eslint.config.js`, `.prettierrc`, `vitest.config.ts`,
`playwright.config.ts`, `netlify.toml`, `.nvmrc`.
`src/i18n/` holds the route map (`routes.ts`) and UI
strings (`ui.ts`); new pages and strings must be added for all three languages.
Content: `src/content.config.ts` (collections), `src/content/` (one JSON file
per entry), `src/assets/` (images) and `src/lib/` (content helpers). Every
localized content field needs `de`, `fr` and `en`.
Services page: `src/components/services/` (page component and styles); its
copy is in `src/content/services-page/page.json` (`servicesPage` collection).
`src/components/Testimonial.astro` is the shared testimonial component (props: one
entry from `getTestimonials`); page-specific components live in
`src/components/<page>/`.
Home lives in `src/pages/[locale]/index.astro` with its components in
`src/components/home/` and copy in `src/i18n/home.ts`; `BaseLayout`'s `fullWidth`
prop is for pages built from full-bleed sections.
`src/components/contact/` holds the contact form and its script. The thanks
pages live outside the route map (slugs in `src/components/contact/thanks.ts`).
Legal pages: `src/components/legal/` (component, styles and Markdown content); the
page files are in `src/pages/{de,fr,en}/`; privacy changes are tracked in
`docs/privacy-changes.md`.

## Setup

`npm ci`. No env files needed.

## Dev server

`npm run dev -- --port <port>`

## Validation

Run `bash factory/checks.sh`. It runs `npm ci`, then `lint`, `typecheck`,
`test` and `build`:

- `npm run lint`: `eslint .` and `prettier --check .`.
- `npm run typecheck`: `astro check`.
- `npm test`: `vitest run` (unit tests in `src/**/*.test.ts`), then installs the
  Playwright Chromium browser itself and runs `playwright test`, which builds
  and serves the site and runs the specs in `e2e/`.
- `npm run build`: `astro build` into `dist/`.

Keep this section and that script in step.

## Deploy

Netlify builds from `netlify.toml`. The Node version is pinned in `.nvmrc`,
`netlify.toml` (`NODE_VERSION`) and `package.json` `engines`; keep them in
step. The redirects mirror `docs/rebuild-spec.md`. The CSP forbids inline
scripts and styles, so keep `inlineStylesheets: 'never'` in `astro.config.mjs`
and add no inline `<script>`, `<style>` or `style` attributes.

## Software factory

`/factory run` builds every open GitHub issue labeled `factory` through
intake → spec → build → gate → review → approve, one PR per issue. State is in
`factory/jobs/` (gitignored); `factory/bin/job` is its only writer. Checks:
`factory/checks.sh`. Dashboard: `cd factory && python3 -m http.server`, then
open http://localhost:8000/dashboard.html.
