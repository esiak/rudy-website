#!/usr/bin/env bash
# The repo's checks. Exit 0 only when the branch is fit to review.
#
# The gate runs this script from the main checkout with the job's worktree as
# the working directory. Keep it fast, deterministic and non-interactive: no
# watch modes, no prompts, nothing that rewrites files.
#
# rudy-website has no code or toolchain yet. Until it does, this runs whatever
# checks a package.json defines (lint, typecheck, test, build) and otherwise
# passes. Once the stack is chosen, replace this with its exact commands.
set -euo pipefail

if [[ -f package.json ]]; then
  if [[ -f pnpm-lock.yaml ]]; then
    pm=pnpm; pnpm install --frozen-lockfile
  elif [[ -f yarn.lock ]]; then
    pm=yarn; yarn install --frozen-lockfile
  elif [[ -f package-lock.json ]]; then
    pm=npm; npm ci --prefer-offline --no-audit --no-fund
  else
    echo "package.json has no lockfile; commit one so installs are reproducible." >&2
    exit 1
  fi

  has_script() { node -e "process.exit(require('./package.json').scripts?.['$1'] ? 0 : 1)"; }
  for s in lint typecheck test build; do
    if has_script "$s"; then
      echo "== $pm run $s"
      CI=1 "$pm" run "$s"
    fi
  done
else
  echo "No package.json yet: nothing to check."
fi
