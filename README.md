# Maester Website

The official site for [Maester](https://github.com/baller-software/maester) — a Node CLI for aggregating documentation from many sources into one central knowledge home. This repository builds and serves the marketing landing page, documentation, examples gallery, and changelog at <https://baller-software.github.io/maester-website>.

The site is a static Astro 5 project. There is no backend, no database, and zero JavaScript shipped on routes that don't need interactivity.

## Prerequisites

- **Node.js** 20 LTS or newer (per `gspec/stack.md` §2)
- **npm** 10 or newer (ships with Node 20)

Optional, only needed if you run the integrity check locally:

- **lychee** — install via `brew install lychee` on macOS, or download a release binary from <https://github.com/lycheeverse/lychee>

## Local Development

```sh
git clone https://github.com/baller-software/maester-website.git
cd maester-website
npm install
npm run dev
```

The dev server runs at <http://localhost:4321/maester-website/> (the base path matches the production deploy).

## Available Scripts

| Command               | Description                                                                    |
|-----------------------|--------------------------------------------------------------------------------|
| `npm run dev`         | Start the Astro dev server with hot reload                                     |
| `npm run build`       | Build the production site into `dist/`                                         |
| `npm run preview`     | Serve the built `dist/` locally                                                |
| `npm test`            | Run the Vitest unit tests in `tests/`                                          |
| `npm run search:index`| Generate the Pagefind search index inside `dist/pagefind/` (post-build)        |
| `npm run check:links` | Run lychee against `dist/` to verify every referenced asset and in-site link  |
| `npm run format`      | Format every supported file with Prettier                                      |

The CI pipeline runs `build` → `test` → `search:index` → `check:links` → deploy on every push to `main`.

## Environment Variables

No environment variables are required for local development. Two optional build-time overrides exist:

| Variable             | Purpose                                                          |
|----------------------|------------------------------------------------------------------|
| `PUBLIC_SITE_URL`    | Override the production hostname when building for a custom host |
| `PUBLIC_BASE_PATH`   | Override the base path when not deploying as a GitHub Pages project site |

When unset, both fall back to the values in `src/config/site.ts`.

## Project Structure

```text
maester-website/
├── astro.config.mjs   # Astro 5 config (site URL, base path, integrations, Shiki themes)
├── tsconfig.json
├── package.json
├── CHANGELOG.md       # Keep-a-Changelog source for the /changelog page
├── lychee.toml        # Link/asset integrity checker config
├── public/            # Static assets served verbatim (favicon, OG image, diagrams, robots.txt)
├── src/
│   ├── pages/         # File-based routes
│   ├── layouts/       # BaseLayout, DocsLayout
│   ├── components/    # Shell, docs, code, seo, home, about, examples, changelog
│   ├── content/       # Astro content collections (docs/, examples/) + Zod schemas
│   ├── config/        # site.ts — single source of truth for URLs, names, maintainer
│   ├── lib/           # Pure helpers (url, slug, changelog parser)
│   ├── styles/        # global.css — design tokens, base resets, Tailwind directives
│   └── scripts/       # theme-init.ts — inline pre-paint script
├── tests/             # Vitest unit tests mirroring src/lib/
├── gspec/             # Living product specifications (read-only at runtime)
└── .github/workflows/ # GitHub Actions CI/CD
```

See `gspec/architecture.md` for the full technical blueprint.

## Living Specifications

Product, technical, and design decisions for this site live in `gspec/`:

- `gspec/profile.md` — what the product is and who it's for
- `gspec/stack.md` — technology choices
- `gspec/style.html` — visual design system
- `gspec/architecture.md` — technical blueprint
- `gspec/practices.md` — development standards
- `gspec/features/*.md` — per-feature requirements

When you change code that contradicts a spec, update the spec.

## Deployment

See [`DEPLOYMENT.md`](./DEPLOYMENT.md).
