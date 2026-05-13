# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-05-13

### Added
- Initial scaffold of the Maester website — Astro 5 + Tailwind v4 + GitHub Pages target.
- Site shell with header, footer, primary navigation, mobile navigation, theme toggle, and skip-to-main link.
- Home page with hero, concept overview, key benefits, and copyable install snippet.
- About page covering project story, mission, maintainership, and ways to get involved.
- Documentation section with sidebar grouping, table of contents, prev/next navigation, and anchor links on every heading.
- Examples gallery with category filtering and three seed examples.
- Changelog page generated from this file at build time.
- Docs search via Pagefind with ⌘K shortcut and palette UI.
- Dark mode with system-preference detection, header toggle, and persistent override.
- SEO metadata: per-page Open Graph and Twitter tags, canonical URLs, generated sitemap, and `robots.txt`.
- CI/CD pipeline (GitHub Actions): build → unit tests → Pagefind index → lychee link/asset integrity check → deploy to GitHub Pages.
