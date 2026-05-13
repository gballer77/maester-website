---
description: Static Astro website, not intended for anything dynamic, served out via github pages
name: static-website-pages
spec-version: v1
---

# Technology Stack Definition

## 1. Overview

This is a **static documentation and marketing site** that explains the product, its workflow, and how to use it. Deployed to GitHub Pages, built with Astro.

### Architecture Style
- Static site generated at build time with Astro. Zero server-side runtime, no API, no database.
- Content-driven architecture — pages are authored in Markdown/MDX and rendered through Astro layouts.

### Deployment Target
- **GitHub Pages** — static hosting via GitHub Actions build-and-deploy workflow

### Scale & Performance Requirements
- Minimal — static HTML/CSS/JS served via GitHub Pages CDN. Target: perfect Lighthouse scores.

---

## 2. Core Technology Stack

### Programming Languages

- **Astro Components (.astro)** — Astro's template syntax, compiles to static HTML
- **Markdown / MDX** — Content authoring format for documentation pages
- **JavaScript (ES Modules)** — For any client-side interactivity and Astro configuration

### Runtime Environment

- **Node.js 20 LTS** — Used for Astro site generation. Pinned in CI via GitHub Actions `setup-node`.
- **No container runtime** — Not needed for a static site.

---

## 3. Frontend Stack

### Framework

- **Astro 5.x** — Static site generator optimized for content-driven websites
- **Why Astro:**
  - Zero-JS-by-default output — ideal for a documentation/marketing site
  - First-class Markdown/MDX support for content pages
  - Built-in GitHub Pages deployment support
  - Islands architecture allows interactive components only where needed
  - Excellent performance out of the box (perfect Lighthouse scores)

### Build Tools

- **Astro's built-in Vite pipeline** — Astro uses Vite internally; no separate bundler configuration needed
- **`@astrojs/tailwind`** — Official Astro integration for Tailwind CSS

### State Management

Not Applicable — static site with no client-side application state. Any interactivity (e.g., mobile nav toggle, copy-to-clipboard) uses vanilla JS or Astro's `<script>` tags.

### Styling Technology

- **Tailwind CSS v4** — Utility-first CSS framework
- **Why Tailwind:**
  - Astro's officially recommended CSS solution with first-class integration
  - Zero runtime cost in static output — all CSS is purged and inlined at build time
  - Rapid prototyping without writing custom CSS files
  - Excellent responsive design utilities built in
  - `@tailwindcss/typography` plugin for long-form Markdown content styling
- **Design token mapping:** Visual design values defined in `gspec/style.html` map to Tailwind's `theme.extend` configuration in `tailwind.config.mjs`. Custom colors, fonts, and spacing scales are defined there as Tailwind theme tokens rather than as raw CSS variables. The canonical token values are the CSS custom properties in the `<style>` block of `gspec/style.html` — inspect those when extracting design tokens.

---

## 4. Backend Stack

Not Applicable — fully static site. Pre-rendered HTML served from GitHub Pages.

---

## 5. Infrastructure & DevOps

### Cloud Provider

- **GitHub** — The sole infrastructure provider:
  - **GitHub Pages** — Static site hosting
  - **GitHub Actions** — CI/CD pipeline

### Container Orchestration

Not Applicable.

### CI/CD Pipeline

- **GitHub Actions**

| Stage | Trigger | Steps |
|-------|---------|-------|
| Build | Push to main (website paths changed), PRs to main | Checkout → Node 20 → Install deps → `astro build` |
| Test | Build success | Run **lychee** (link/asset integrity checker) against the built output in `pages/dist/`. Crawl every page, verify every referenced asset and in-project link resolves with a success response, apply the configured `base` prefix. Internal failures block the pipeline; external-URL failures warn but do not block. |
| Deploy | Test success on main | Deploy build output to GitHub Pages via `actions/deploy-pages` |

- Path filtering scopes the workflow so non-website changes don't trigger deploys.
- The Test stage is the project's standing CI guardrail per `gspec/practices.md` — a failed link/asset check is a shipping defect and blocks deploy.

### Infrastructure as Code

Not Applicable — GitHub Pages requires no IaC. Configuration lives in `astro.config.mjs` and the GitHub Actions workflow YAML.

---

## 6. Data & Storage

### File Storage

- **GitHub Pages CDN** — Serves all static assets (HTML, CSS, JS, images)

### Data Warehouse / Analytics

Not Applicable.

---

## 7. Authentication & Security

Not Applicable — public static site with no user accounts, login, or protected resources.

---

## 8. Monitoring & Observability

Not Applicable — static site with no runtime to monitor. GitHub Pages provides basic traffic analytics if needed.

---

## 9. Testing Infrastructure

### Testing Frameworks

- **Website build verification** — `astro build` succeeds without errors (run in CI)
- **Asset & link integrity check (lychee)** — Required CI guardrail per `gspec/practices.md`. `lychee` crawls the built output in `pages/dist/`, verifies every referenced asset and in-project link resolves, and blocks the deploy on internal failures. External-URL failures warn but do not block. Runs as the Test stage after Build and before Deploy.
- **Lighthouse CI** (optional) — Automated performance/accessibility audits in the deploy pipeline
- No unit or E2E tests needed for a static content site — the static site has no non-trivial runtime logic to unit-test; the asset/link integrity check is the project's standing test coverage

### Test Data Management

Not Applicable.

### Performance Testing

Not Applicable — static assets served from CDN.

---

## 10. Third-Party Integrations

### External Services

- **GitHub Pages** — Website hosting
- No other third-party services

### API Clients

Not Applicable.

---

## 11. Development Tools

### Package Management

- **npm** — Package manager
- Website has its own `package.json` in the `pages/` directory, separate from the CLI's root `package.json`
- Key dependencies:
  - `astro` — Static site generator
  - `@astrojs/tailwind` — Tailwind CSS integration
  - `tailwindcss` — Utility-first CSS framework
  - `@tailwindcss/typography` — Prose styling for Markdown content

### Project Structure

```
pages/
├── src/
│   ├── pages/        # Astro file-based routing
│   ├── layouts/      # Page layouts (BaseLayout.astro, DocsLayout.astro)
│   ├── components/   # Reusable UI components
│   └── content/      # Markdown/MDX content collections
├── public/           # Static assets (images, favicon, etc.)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

Living specifications live separately at the repo root in `gspec/` (not co-located with the website code) — `gspec/profile.md`, `gspec/stack.md`, `gspec/style.html`, `gspec/practices.md`, and per-feature PRDs under `gspec/features/`.

### Code Quality Tools

- **Prettier** — Consistent formatting across Astro, JS, and Markdown files (with `prettier-plugin-astro`)
- No linter needed at current project scale

### Local Development

- `npm run dev` — Astro dev server with hot reload
- No Docker, no database, no environment variables required

---

## 12. Migration & Compatibility

### Legacy System Integration

Not Applicable.

### Upgrade Path

- **Astro:** Follow major version upgrade guides. Astro has a strong commitment to smooth upgrades.
- **Tailwind CSS:** v4 is current. Tailwind's upgrade tooling (`@tailwindcss/upgrade`) automates major version migrations.
- **Node.js:** Track LTS releases. Currently Node 20, move to Node 22 LTS when ready.

---

## 13. Technology Decisions & Tradeoffs

### Key Architectural Decisions

| Decision | Rationale | Alternatives Considered |
|----------|-----------|------------------------|
| **Astro over Next.js/Docusaurus** | Zero-JS static output, first-class Markdown support, perfect for docs/marketing. No SSR or client-side routing needed. | Next.js (overkill, ships unnecessary JS), Docusaurus (opinionated, React dependency), Hugo (Go templating less flexible) |
| **Tailwind over vanilla CSS** | Rapid styling, consistent design system, excellent Astro integration, zero runtime cost after build. | Vanilla CSS (slower to prototype), UnoCSS (smaller ecosystem), Open Props (less utility coverage) |
| **Separate package.json for website** | Keeps website dependencies isolated from CLI dependencies. Clean separation of concerns. | Shared root package.json (dependency conflicts, bloated CLI package) |

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Astro breaking changes | Pin major version, test builds in CI, upgrade intentionally |
| Tailwind v4 is relatively new | First-class Astro support, large community, easy fallback to v3 |
| GitHub Pages limitations | Static site is tiny; unlikely to hit limits. Could move to Cloudflare Pages or Netlify if needed |

---

## 14. Technology-Specific Practices

### Framework Conventions & Patterns

- Use `.astro` components for all pages and layouts — avoid unnecessary framework islands (React, Vue, etc.) unless interactive behavior demands it
- Use Astro's built-in `<Content />` component for rendering Markdown content
- Use Astro's file-based routing in `src/pages/`
- Use `src/layouts/` for page layouts (e.g., `BaseLayout.astro`, `DocsLayout.astro`)
- Use `src/components/` for reusable UI components
- Prefer Astro's scoped `<style>` blocks for component-specific styles that don't map well to Tailwind utilities
- Use content collections (`src/content/`) for structured Markdown content with schema validation
- Use `getStaticPaths()` for dynamic routes when generating pages from collections

### GitHub Pages Base Path

When a site is deployed to GitHub Pages as a project site (served from `https://<user>.github.io/<repo>/` rather than a custom domain at the root), Astro must be told about the subpath. Without this, generated asset URLs (e.g. `/_astro/*.css`) point at the domain root and 404.

- **Set `base` in `astro.config.mjs`** to the repo name with a leading slash — e.g. `base: '/<repo-name>'`. The `base` should match the GitHub Pages subpath exactly.
- **Don't hardcode absolute internal links.** Any `href="/..."` or `src="/..."` to an in-site route or public asset must be prefixed with the base. Compute it once per component:
  ```astro
  ---
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  ---
  <a href={`${base}/about`}>About</a>
  <link rel="icon" href={`${base}/favicon.svg`} />
  ```
  External URLs (`https://...`, `mailto:`, `tel:`) and in-page anchors (`#section`) are unaffected and should stay as-is.
- **Custom domain at the root:** If the site is later moved to a custom apex/subdomain, remove the `base` setting so links resolve at `/` again. Keep the `${base}` pattern in components — with `base: '/'` it resolves to an empty string and the links still work.
- **Never invent a domain name.** Only use a custom domain if it is explicitly defined in `profile.md`. If `profile.md` does not specify one, assume the site is served from the default GitHub Pages project URL (`https://<user>.github.io/<repo>/`) and configure `base` accordingly. Do not write placeholder domains (e.g. `example.com`, `mysite.com`) into `astro.config.mjs`, `CNAME`, meta tags, canonical URLs, sitemaps, or documentation — leave them unset or use the GitHub Pages URL until the real domain is provided.

### Library Usage Patterns

#### Tailwind CSS in Astro
- Configure design tokens in `tailwind.config.mjs` under `theme.extend` — map from `gspec/style.html` definitions (the CSS custom properties in its `<style>` block are the canonical token values)
- Use `@apply` sparingly and only in Astro `<style>` blocks for repeated patterns — prefer utility classes in templates
- Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) rather than custom media queries
- Use `@tailwindcss/typography` with the `prose` class for all long-form Markdown content

### Language Idioms

- **ES Modules** — Use `import`/`export` exclusively
- **`node:` prefix for built-in modules** — e.g., `import { readFileSync } from 'node:fs'`

### Stack-Specific Anti-Patterns

- **Don't add React/Vue/Svelte islands** unless a component genuinely requires client-side interactivity — the site should ship zero JS by default
- **Don't use `client:load`** without justification — prefer `client:visible` or `client:idle` if interactivity is truly needed
- **Don't install a CSS-in-JS library** alongside Tailwind — pick one styling approach
- **Don't over-engineer navigation or routing** — Astro's file-based routing handles everything a docs site needs
