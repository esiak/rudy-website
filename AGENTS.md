# rudy-website

A website. The repo is at an early stage: no framework or toolchain has been
chosen yet. Update this file when one is.

## Setup

A fresh checkout needs nothing yet. Once the site has a `package.json`, install
with the package manager its lockfile belongs to (`npm ci`, `pnpm install
--frozen-lockfile` or `yarn install --frozen-lockfile`), and list any env files
to copy here (for example `cp .env.example .env`).

## Dev server

None yet. When one exists, document how to start it on a given port, e.g.
`npm run dev -- --port <port>`. Factory reviewers start it on the port their
prompt gives them.

## Validation

Run `bash factory/checks.sh`. It installs dependencies and runs the `lint`,
`typecheck`, `test` and `build` scripts that `package.json` defines, and
passes while there is no `package.json`. Keep this section and that script in
step.

## Software factory

`/factory run` builds every open GitHub issue labeled `factory` through
intake → spec → build → gate → review → approve, one PR per issue. State is in
`factory/jobs/` (gitignored); `factory/bin/job` is its only writer. Checks:
`factory/checks.sh`. Dashboard: `cd factory && python3 -m http.server`, then
open http://localhost:8000/dashboard.html.
