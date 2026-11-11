# Rebuild rudypastel.com in Astro

This spec covers rebuilding https://rudypastel.com (currently WordPress 6.6 with
Astra, Elementor Pro, Polylang and CookieLawInfo) as a static Astro site. The
work is split into GitHub issues labeled `astro-rebuild`. Each issue links back
to a section of this file.

## Goals

- Same content, structure and look as the current site, in German, French and
  English.
- A fully static build: no server, no database, no WordPress.
- No cookies at all, so the site needs no cookie banner.
- Faster and more accessible than today: Lighthouse Performance, Accessibility,
  Best Practices and SEO each ≥ 95 on mobile for every page.
- Clean URLs, with 301 redirects from every old WordPress URL.
- Content is kept in files (Markdown/JSON) and can be edited without touching
  layout code.

## Out of scope

- A blog, an RSS feed or comments. The old site exposes `/feed/` but has no
  posts.
- Analytics or tracking. If they're wanted later, they need a privacy review and
  an update to the privacy policy.
- A CMS editing UI. Content stays in Git for now.
- Rewriting copy. Text moves over as-is, apart from the legal-page changes in
  [Legal pages](#legal-pages).

## Source material

The current site's text and images are saved in
[`docs/source-content/`](source-content/), one Markdown file per page and
language, plus `images/`. Treat these files as the source of truth for copy.
Each file's first line names the URL it came from.

| Page | DE | FR | EN |
|---|---|---|---|
| Home | `de/home-de.md` | `fr/home-fr.md` | `en/home-en.md` |
| Services | `de/leistungen-de.md` | `fr/mes-services.md` | `en/my-services.md` |
| About | `de/ueber-mich.md` | `fr/elementor-2193.md` | `en/about-me.md` |
| Contact | `de/kontakt.md` | `fr/contact-fr-2.md` | `en/contact-en.md` |
| Imprint | `de/impressum.md` | `fr/impressumfr.md` | `en/imprint.md` |
| Privacy | `de/datenschutz.md` | `fr/confidentialite.md` | `en/privacy-policy.md` |

Images (`docs/source-content/images/`):

| File | Use |
|---|---|
| `24220_012-H600.jpg` (449×600) | Home hero portrait |
| `24220_024-Kopie.jpg` (350×457) | About page portrait |
| `Icon_pastel.png` (221×211) | Site icon / favicon |
| `computer.png`, `settings.png`, `ads.png` (256×256) | Service card icons (R, SQL, Shiny) |
| `sebastiankaiser-336x336-1.jpg` | Testimonial author photo |

## Stack

| Concern | Choice |
|---|---|
| Framework | Astro (latest stable), `output: 'static'`, TypeScript `strict` |
| Package manager | npm, with `package-lock.json` committed |
| Styling | Plain CSS with custom properties (design tokens) and scoped component styles. No CSS framework. |
| Content | Astro content collections with Zod schemas |
| i18n | Astro's built-in `i18n` routing |
| Images | `astro:assets` (`<Image>` / `<Picture>`) for responsive WebP/AVIF |
| Fonts | Poppins, self-hosted with `@fontsource/poppins` (no Google Fonts requests) |
| Lint / format | ESLint (`eslint-plugin-astro`) and Prettier (`prettier-plugin-astro`) |
| Tests | Vitest for logic (i18n helpers, content schemas); Playwright for smoke tests of the built site |
| Hosting | GitHub Pages, deployed by GitHub Actions (`.github/workflows/deploy.yml`) |

`package.json` must define the `lint`, `typecheck` (`astro check`), `test` and
`build` scripts, because `factory/checks.sh` runs them. `npm run dev -- --port
<port>` must start the dev server on the given port. `AGENTS.md` must be
updated to describe the stack, setup, dev server and validation.

## Information architecture

German is the default language. The old site redirected `/` to German.

| Page | DE | FR | EN |
|---|---|---|---|
| Home | `/de/` | `/fr/` | `/en/` |
| Services | `/de/leistungen/` | `/fr/services/` | `/en/services/` |
| About | `/de/ueber-mich/` | `/fr/a-propos/` | `/en/about/` |
| Contact | `/de/kontakt/` | `/fr/contact/` | `/en/contact/` |
| Imprint | `/de/impressum/` | `/fr/mentions-legales/` | `/en/imprint/` |
| Privacy | `/de/datenschutz/` | `/fr/confidentialite/` | `/en/privacy/` |
| 404 | `/404.html`, shown in the visitor's language where the path tells it, German otherwise |

- `/` is a client-side language redirect: a script walks `navigator.languages`
  and goes to `/fr/` or `/en/` when the first of de/fr/en in the list is French
  or English, and to `/de/` otherwise. Without JavaScript, a `<noscript>` meta
  refresh sends the visitor to `/de/`.
- Every page is mapped to its counterpart in the other two languages, so the
  language switcher and the `hreflang` links lead to the same page, not the
  home page.
- Trailing slashes are always present.

### Old URL redirects (meta refresh)

Astro's `redirects` option builds each one as a static page with a meta refresh
and a canonical link to the new URL (not a 301).

| Old | New |
|---|---|
| `/de/home-de/` | `/de/` |
| `/fr/home-fr/` | `/fr/` |
| `/en/home-en/` | `/en/` |
| `/de/leistungen-de/` | `/de/leistungen/` |
| `/fr/mes-services/` | `/fr/services/` |
| `/en/my-services/` | `/en/services/` |
| `/fr/elementor-2193/` | `/fr/a-propos/` |
| `/en/about-me/` | `/en/about/` |
| `/fr/contact-fr-2/` | `/fr/contact/` |
| `/en/contact-en/` | `/en/contact/` |
| `/fr/impressumfr/` | `/fr/mentions-legales/` |
| `/en/privacy-policy/` | `/en/privacy/` |
| `/de/feed/`, `/fr/feed/`, `/en/feed/`, `/*/comments/feed/` | the language's home |

`/de/ueber-mich/`, `/de/kontakt/`, `/de/impressum/`, `/de/datenschutz/` and
`/fr/confidentialite/` keep their current URLs.

## Design

Match the current look; don't redesign. Values taken from the live site:

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#0170B9` | Hero and Services section backgrounds, links |
| `--color-accent` | `#FDAE00` | Primary CTA button ("Contact me") |
| `--color-navy` | `#1336AB` | Secondary button, section headings (h3) |
| `--color-header` | `#3A3A3A` | Top bar background, body text |
| `--color-text-muted` | `#4B4F58` | Secondary text |
| `--color-surface-alt` | `#F5F5F5` | Alternating section background |
| `--color-surface` | `#FFFFFF` | Page background |
| `--font-heading` | Verdana, Helvetica, Arial, sans-serif | h1 36px/600, h2 30px/400, h3 22px/600 |
| `--font-body` | Poppins, sans-serif | Body 14–16px, weight 300 |
| `--radius` | `3px` | Buttons |

- White text on `--color-primary`, and dark text on the accent button where
  white fails, must meet WCAG AA contrast. Adjust shades slightly if needed and
  note the change in the PR.
- Responsive from 320px up. The header collapses into a menu button below
  768px, as it does today.
- Layout: a single centered content column, max width about 1140px.

### Shared chrome

- **Header:** dark top bar with the "Dr. Rudy Pastel – Data Scientist" site
  title (links to the language's home), navigation (Home, Services, About,
  Contact) with the current page marked, and a DE / FR / EN switcher with the
  current language marked. Below 768px the navigation sits behind an
  accessible menu button (`aria-expanded`, Escape closes it, focus is
  managed).
- **Footer:** "© <current year> Rudy Pastel", plus links to Privacy and Imprint
  in the current language.
- A "skip to content" link, `<html lang>` set per language, and one `<h1>` per
  page.

## Pages

### Home
Sections in order, with the backgrounds of the current site:
1. **Hero** (primary blue): name (h1), "Freelance Data Scientist" tagline,
   qualification line, portrait, "Contact me" (accent) and "More info" (navy)
   buttons linking to Contact and About.
2. **Franco-German partner** (white): heading and short paragraph.
3. **References** (light grey): intro, then 10 client cards (client, period,
   description) in a responsive grid, newest first as on the current site.
4. **Example project** (white): "Chemical compound replication" text plus a
   "Contact me" button.
5. **Services** (primary blue): intro plus three cards (R, SQL, Shiny), each
   with an icon, title and text.
6. **Testimonials** (light grey): quote, author name and role, author photo.
7. **Closing CTA**: "I look forward to your challenges", signature, "Contact
   me" button.

References, services and testimonials come from content collections, not
hard-coded markup.

### Services
An intro with a "Let's talk" email link and a Contact button, then one section
per service: R programming and data analysis, interactive Shiny apps, SQL data
management, automation and visualization of business processes, forecasting
and early-warning systems, ETL solutions, then "Future opportunities" and a
closing "Let's talk" CTA. Text comes from the source files.

### About
Portrait, "Data analysis is my passion" intro, a "Let's talk" email link and
button, then Education, Personal note, Skills and tools, Expertise, Language
skills, the customer testimonial (shared with Home) and a closing "Let's talk"
CTA.

### Contact
- The "Message me" text and a `mailto:` link to `pastel.web@rudypastel.com`.
  There is no contact form.

### Legal pages
- Imprint and Privacy are rendered from Markdown in all three languages.
- The **imprint** moves over unchanged.
- The **privacy policy** must be updated for the new setup: remove the
  sections about WordPress, Elementor, CookieLawInfo, cookies and any
  plugins that are gone, and describe GitHub (GitHub Pages) as host (server
  logs). There is no form processor. **Rudy has to review and approve the changed text before
  launch.** The PR has to list every changed paragraph.

## SEO and metadata

- A unique `<title>` and meta description per page and language. Titles keep
  the current pattern: "<Page> | Dr. Rudy Pastel".
- `<link rel="canonical">`, `hreflang` alternates for de/fr/en and
  `x-default` (→ `/de/` equivalent) on every page.
- Open Graph and Twitter card tags, with the hero portrait as the default
  image.
- `sitemap-index.xml` (`@astrojs/sitemap` with i18n) and `robots.txt` that
  points to it.
- `Person` JSON-LD on the home page (name, job title, email, `sameAs` left
  empty unless profiles are given).
- Favicon and apple-touch icon made from `Icon_pastel.png`.

## Accessibility and quality bar (every issue)

- WCAG 2.2 AA: semantic landmarks, alt text on informative images (empty
  `alt` on decorative ones), visible focus styles, keyboard-reachable
  controls, `prefers-reduced-motion` honored.
- No layout shift from images or fonts (`width`/`height` on images,
  `font-display: swap`).
- No client-side JavaScript except the mobile menu toggle and the language
  redirect on `/`; both work as progressive enhancement.
- `bash factory/checks.sh` passes.

## Hosting and deploy

- `.github/workflows/deploy.yml` builds with `npm run build` and deploys `dist`
  to GitHub Pages on every push to `main` (and on manual dispatch). Node comes
  from `.nvmrc`.
- `site: 'https://rudypastel.com'` in `astro.config.mjs`; no `base`.
- Redirects as above, and the `/` language redirect.
- The Content Security Policy is a `<meta http-equiv>` tag (self only, no
  inline scripts or styles), defined in `src/lib/csp.ts`. GitHub Pages cannot
  set headers, so `frame-ancestors`, `X-Frame-Options`, `Permissions-Policy`,
  `Referrer-Policy`, `X-Content-Type-Options`, HSTS and the long cache headers
  are dropped.
- The WordPress paths (`/wp-admin/*` and so on) fall through to `404.html`
  instead of returning 410.
- Launch (enabling Pages, the custom domain and HTTPS, switching DNS, shutting
  down Netlify, retiring WordPress) is a manual checklist, tracked in its own
  issue and not built by the factory.

## Story order

```
#1 Scaffold ─┬─ #2 i18n routing ─┬─ #3 Layout & chrome ─┬─ #5 Home
             │                   │                      ├─ #6 Services
             │                   │                      ├─ #7 About
             │                   │                      ├─ #8 Contact
             │                   │                      └─ #9 Legal pages
             └───────────────────┴─ #4 Content collections ─┘ (#5, #6, #7)
#10 SEO & metadata      after #5–#9
#11 Hosting config, redirects, 404, headers   after #2
#12 Launch checklist    manual, last
```

Issue numbers above match the GitHub issues (#1–#12). Each
GitHub issue names its real dependencies.
