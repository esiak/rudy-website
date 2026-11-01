# rudy-website

A website built with Astro (static output, `output: 'static'`), TypeScript
(`strict`), npm, ESLint + Prettier, Vitest for logic and Playwright for smoke
tests of the built site.

Key paths: `src/pages/` (routes), `e2e/` (Playwright specs), `astro.config.mjs`,
`tsconfig.json`, `eslint.config.js`, `.prettierrc`, `vitest.config.ts`,
`playwright.config.ts`.

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

## Software factory

`/factory run` builds every open GitHub issue labeled `factory` through
intake → spec → build → gate → review → approve, one PR per issue. State is in
`factory/jobs/` (gitignored); `factory/bin/job` is its only writer. Checks:
`factory/checks.sh`. Dashboard: `cd factory && python3 -m http.server`, then
open http://localhost:8000/dashboard.html.
