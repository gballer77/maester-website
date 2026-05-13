---
name: seo-metadata
spec-version: v1
description: Per-page metadata, social cards, sitemap, robots.txt, and canonical URLs for search and sharing
---

# SEO & Metadata

## 1. Overview

**Feature name:** SEO & Metadata

**Summary:** A cross-cutting feature that ensures every page on the site emits the metadata search engines and link previews need: title and description meta tags, Open Graph and Twitter card tags, a canonical URL, a generated sitemap, and a robots.txt. Each page declares its own title and description; the shared mechanism handles everything else.

**Problem being solved:** A static site that lacks proper metadata gets indexed poorly, previews badly when shared on chat platforms or social media, and signals incorrectly to search engines about which URL is canonical. Without a shared metadata layer, each page is responsible for redoing the same meta-tag boilerplate, which guarantees inconsistency and drift. AI agents fetching pages also benefit from clean, structured metadata for grounding.

This matters now because every page-level feature in the site depends on a working metadata layer to be properly shareable, discoverable, and indexable. It must be in place before the site is promoted publicly.

## 2. Users & Use Cases

**Primary users:**

- Site visitors discovering the site through search engines.
- People sharing site links in chat apps, social platforms, or email clients that render link previews.
- AI agents and crawlers indexing the site for retrieval.
- Site maintainers who need their pages to be indexed and shareable without writing meta-tag boilerplate per page.

**Key use cases:**

1. A developer searches for the project's name and finds it ranked highly with a clear title and description in the search results.
2. A user shares a link to a specific docs page in a chat platform; the preview shows the page's title, description, and a project-themed social card image.
3. A search engine crawls the site and reads a sitemap that lists every page, helping the entire site get indexed without manual submission.
4. An AI agent fetches a page and reads structured metadata (title, description, canonical URL) directly from the document head.

## 3. Scope

**In scope:**

- A shared mechanism for each page to declare its title, description, and (optionally) a custom social card image.
- Automatic emission of the following per page: `<title>` tag, meta description, canonical URL, Open Graph tags, and Twitter card tags.
- A default site-wide social card image used when a page does not provide its own.
- A sitemap.xml generated at build time listing every page on the site.
- A robots.txt that allows indexing and references the sitemap.
- A site-wide default title pattern (e.g., `Page Title — Site Name`) and a default description used as a fallback when a page does not provide one.

**Out of scope:**

- Auto-generation of per-page social card images from page content (deferred).
- Structured-data markup beyond the basic metadata (e.g., JSON-LD for articles, breadcrumbs, FAQs).
- Analytics tracking, conversion pixels, or marketing tags.
- Search-engine submission automation.
- Multi-language hreflang tags.

**Deferred ideas:**

- Auto-generated Open Graph images per page (rendered at build time from page title).
- JSON-LD structured data for articles, breadcrumbs, or organizations.
- An `llms.txt` or similar agent-friendly content index.
- Per-page noindex flags for opting specific pages out of indexing.
- Locale and hreflang support for multi-language sites.

## 4. Capabilities

- [x] **P0**: Every page declares its own title and description via a shared mechanism
  - Each page provides a title and a description through a single, consistent API (e.g., frontmatter, layout prop, or component slot)
  - The shared mechanism emits these as `<title>` and `<meta name="description">` in the rendered HTML
  - If a page omits the title or description, the build fails with a clear error identifying the offending page
  - The title pattern follows a site-wide template (e.g., `<page title> — <site name>`)

- [x] **P0**: Open Graph and Twitter card meta tags are emitted on every page
  - Each page emits `og:title`, `og:description`, `og:url`, `og:image`, and `og:type` tags
  - Each page emits the equivalent Twitter card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
  - Values are derived from the page's own title and description, falling back to site-wide defaults where appropriate
  - Tag emission happens automatically — pages do not have to author OG/Twitter tags by hand

- [x] **P0**: A site-wide default social card image is used when a page does not provide its own
  - The site declares a default social card image in one place (e.g., a config file)
  - Pages may override the default by providing a custom image path
  - The default image is used on every page that does not override it
  - The image's URL is absolute (not relative) in the emitted tags

- [x] **P0**: A canonical URL is emitted on every page
  - Each page emits a `<link rel="canonical">` with its absolute URL
  - Canonical URLs use the site's production hostname, not a build-environment hostname
  - URLs include the project's base path if the site is served from a subpath

- [x] **P0**: A sitemap.xml is generated at build time
  - The sitemap lists every public page rendered by the build
  - URLs in the sitemap are absolute and use the production hostname
  - The sitemap conforms to the standard sitemap.xml schema
  - The sitemap is available at `/sitemap.xml` (or the equivalent path with the project's base path applied)

- [x] **P0**: A robots.txt is served at the site root
  - The robots.txt allows indexing of the site (no global disallow)
  - The robots.txt includes a `Sitemap:` directive pointing at the absolute sitemap URL
  - The robots.txt is available at `/robots.txt` (or the equivalent path with the project's base path applied)

- [x] **P1**: Site-wide fallback metadata is defined in one place
  - The site declares a default title, description, and social card image in a single configuration source
  - Pages inherit these defaults unless they explicitly override
  - Changing a default updates every page that does not override it without per-page edits

- [x] **P2**: Per-page metadata is visible during preview / development
  - In a development or preview build, the rendered metadata can be inspected via standard browser developer tools without obfuscation
  - The build does not strip comments or attributes that aid metadata debugging

## 5. Dependencies

- **Feature dependencies:**
  - `[[site-shell]]` — metadata is injected into the document head defined by the base layout.
- **External dependencies:**
  - The site's production hostname (project metadata).
  - A default social card image asset.

## 6. Assumptions & Risks

**Assumptions:**

- The site has a known production hostname before the metadata layer is wired up.
- All public pages should be indexed by default; opt-outs are deferred to a future capability.
- A single default social card image is sufficient for v1; per-page generated images are deferred.
- The chosen static-site framework supports build-time metadata injection (covered in `gspec/stack.md`).

**Key risks:**

- **Wrong canonical hostnames.** If canonical URLs accidentally use a build-environment hostname (e.g., `localhost` or a preview URL), search engines may not index the production site correctly. *Mitigation:* the production hostname is read from a single configuration source, not hardcoded across pages.
- **Stale defaults.** A site-wide fallback that no one revisits can become outdated. *Mitigation:* fallback values live in a clearly named configuration file, not scattered.
- **Base-path subtleties.** Sites served from a subpath (e.g., a project page on a code-hosting platform) must include the base path in canonical URLs and in sitemap entries. *Mitigation:* URL generation goes through a single helper that applies the base path consistently.
- **Missing per-page metadata.** Pages added later may forget to declare titles or descriptions. *Mitigation:* the build fails if required metadata is missing, surfacing the problem at PR time instead of in production.

## 7. Success Metrics

1. Every page emits a `<title>`, meta description, canonical URL, Open Graph tags, and Twitter card tags — verifiable by inspecting the rendered HTML of any page.
2. Sharing a link to any page on the site in a major chat/social platform produces a complete preview with title, description, and image.
3. A valid sitemap.xml lists every public page, and robots.txt references it correctly.
4. Search engines can crawl the site without encountering meta-tag errors or canonical conflicts.

## 8. Implementation Context

> This feature PRD is portable and project-agnostic. During implementation, consult the project's `gspec/profile.md` (target users, positioning), `gspec/style.html` (design system), `gspec/stack.md` (technology choices), and `gspec/practices.md` (development standards) to resolve project-specific context.
