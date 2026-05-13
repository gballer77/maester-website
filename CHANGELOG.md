# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-05-13

### Added
- Examples gallery at `/examples` with category filtering via URL state and three seed examples (multi-repo aggregator, CI-driven sync, raven-only citadel).
- Documentation section at `/docs` with sidebar grouping, scroll-spy table of contents, prev/next navigation, and click-to-copy heading anchors.
- Pagefind-powered docs search palette with `Cmd/Ctrl+K` shortcut.
- Changelog page generated at build time from this `CHANGELOG.md` (Keep-a-Changelog format).

### Changed
- `BaseLayout` now requires explicit `title` and `description` props and throws a build error when either is missing.

## [0.1.0] - 2026-05-13

### Added
- Initial scaffold of the Maester website — Astro 5 + Tailwind v4 + GitHub Pages target.
- Site shell with header, footer, primary navigation, mobile disclosure menu, three-state theme toggle, and skip-to-main link.
- Home page with hero, concept overview, key benefits, and copyable install snippet.
- About page covering project story, mission, maintainership, and ways to get involved.
- Reusable `CodeBlock` component with Shiki syntax highlighting (light + dark themes), filename label, line highlighting, and copy-to-clipboard button.
- Dark mode with system-preference detection, header toggle, and persistent override.
- SEO metadata: per-page Open Graph and Twitter tags, canonical URLs, generated sitemap, and `robots.txt`.
- CI/CD pipeline (GitHub Actions): build → unit tests → Pagefind index → lychee link/asset integrity check → deploy to GitHub Pages.
