---
name: examples-page
spec-version: v1
description: Curated gallery of example configurations and use cases for the developer tool
---

# Examples Page

## 1. Overview

**Feature name:** Examples Page

**Summary:** A chronological, blog-style stream of example use cases for the developer tool. Each example is a self-contained post showing a title, a publication date, category tags, a short dek, and a rich-markdown body explaining the scenario and the value it brings. Posts may optionally include a link out to a fuller resource (e.g., a sample repository or a dedicated docs page) where visitors can find the working configuration. Posts are ordered newest-first so the page reads like a running feed of curated patterns. The format is positioned to help visitors recognize their own situation in an example before clicking through (or, when no link is provided, before reading the body in full).

**Problem being solved:** Documentation explains concepts and options exhaustively. Examples make those options concrete. Many developers learn fastest by skimming a list of "here's what this looks like in practice" and copying the example that matches their use case. Without a curated examples page, visitors have to either piece things together from docs or hunt through external blog posts and repositories — both of which are higher friction and less reliable.

This matters now because examples are one of the highest-converting elements on a dev-tool site. A developer who sees a recognizable pattern in an example is much more likely to adopt the tool than one who has to translate abstract docs into their own setup.

## 2. Users & Use Cases

**Primary users:** Developers actively evaluating or onboarding to the tool, looking for a starting point that resembles their own situation.

**Key use cases:**

1. A developer with a specific use case in mind (e.g., a particular kind of repository structure) scans the examples gallery, finds the matching card, and copies the snippet to use as a starting point.
2. A developer evaluating the tool browses the examples to understand the range of configurations the tool supports before deciding to adopt it.
3. A developer reading the docs follows a link from a concept page to a matching example to see the concept applied in practice.
4. An AI agent retrieving the examples page surfaces concrete configurations as grounding when assisting a developer with their own setup.

## 3. Scope

**In scope:**

- A landing page for the examples section presenting all available examples as a single-column chronological stream, newest-first.
- Each post shows: example title, publication date, category tags, a short dek, and a rich-markdown body (with subheadings, lists, blockquotes, and inline code) explaining the use case in detail and the value it brings. Posts may optionally include an outbound link to a fuller resource (e.g., a sample repository, a dedicated docs page, or an in-page expanded view) for the working configuration.
- Filtering by category/tag — at minimum, a simple set of category labels above the stream.
- Responsive layout: comfortable reading width on desktop, full-width on mobile.
- A consistent authoring format so adding a new example does not require custom-page code.

**Out of scope:**

- A fully runnable in-browser playground or sandbox.
- Per-example tutorials with multi-step walkthroughs (those belong in the docs section as dedicated pages).
- Auto-generation of examples from the source repository.
- User-submitted examples or a community-contribution workflow.
- Per-example comments, ratings, or sharing controls.

**Deferred ideas:**

- A search input scoped to examples (the docs search already covers most needs).
- A "copy entire example" download (e.g., zipped starter project) directly from the page.
- Embedded live previews or rendered output for each example.
- An "examples by stack" or "examples by team size" matrix filter.
- A "submit your example" link with a contribution path.

## 4. Capabilities

- [x] **P0**: The examples landing page presents every available example as a chronological stream
  - All examples render as posts in a single-column, newest-first stream
  - Each post includes the example's title, publication date, category tags, and short dek
  - The page has a clear heading and brief intro explaining what the section is
  - The newest example appears at the top; older examples appear below in date order

- [x] **P0**: Each example post carries a publication date
  - Each example declares a `date` field in its source frontmatter (ISO-8601)
  - The date is displayed in a human-friendly form on the post and exposed to assistive tech via `<time datetime>`
  - Stream order is driven by `date` (descending); ties are broken deterministically (e.g., by title)
  - Build fails with a clear error if `date` is missing or unparseable

- [x] **P0**: Each example post shows a rich-markdown body explaining the use case and its value
  - Each post includes a longer-form explanation (beyond the short dek) covering the scenario the example addresses and the value it brings
  - The body is authored as Markdown/MDX prose and may use the full vocabulary: subheadings, lists, blockquotes, inline code, emphasis
  - The body's typography (headings, lists, blockquotes, inline code) is styled for comfortable reading at the stream's column width
  - The working configuration for the example is reached via the post's outbound link rather than embedded in the post

- [x] **P0**: Each example post may optionally link to a fuller resource
  - Posts may declare an outbound `link` — to a sample repository, a dedicated docs page, or an expanded in-page view — but it is not required
  - When `link` is present, it renders as a visually distinct "See full example" affordance at the foot of the post
  - When `link` is absent, the post renders cleanly with no empty footer or broken link
  - Outbound links to external resources open according to standard link behavior (no forced new tabs unless the visitor explicitly opts in)

- [x] **P0**: Examples can be filtered by category/tag
  - Each example declares one or more category labels in its source
  - The page exposes a way to filter the stream by category (e.g., tag pills above the stream)
  - When no filter is applied, all examples are visible
  - Filter state is reflected in the URL so a filtered view can be shared via link

- [x] **P0**: The page is fully responsive across common device sizes
  - On desktop (1024px+), the stream renders in a centered, comfortably-readable column
  - On tablet (768px), spacing and padding adjust without changing the single-column structure
  - On mobile (375px), posts fill the viewport with reduced padding
  - No horizontal scrolling on any viewport

- [x] **P0**: New examples can be added without page-template changes
  - Examples are authored in a consistent format (e.g., one Markdown/MDX file per example or a single registry file)
  - Adding a new example requires creating or editing one source file, with no changes to the page template
  - Build fails with a clear error if a required example field (title, description, date, category) is missing; `link` is optional

- [x] **P1**: The page structure supports scannability
  - Visitors can skim the stream and read titles, dates, and deks to gauge each post's relevance in seconds
  - Post titles and dates are visually prominent so scanning is title-driven, not body-driven
  - Spacing and grouping prevent the stream from feeling like a wall of text

- [x] **P2**: Semantic structure supports accessibility
  - Each post is a single accessible region with a clear name
  - Dates are marked up with `<time datetime>` for assistive tech
  - Outbound links have descriptive accessible names (not just "Learn more")
  - Category filters are keyboard-accessible with visible focus indicators
  - The stream order reflects a sensible reading order for screen readers

## 5. Dependencies

- **Feature dependencies:**
  - `[[site-shell]]` — the page renders inside the site's base layout, header, and footer.
  - `[[seo-metadata]]` — the page declares its own title, description, and social card metadata via the shared mechanism.
- **External dependencies:** Source content for each example (titles, descriptions, prose bodies, and outbound URLs) — this is project-authored content, not third-party data.

## 6. Assumptions & Risks

**Assumptions:**

- A useful initial set of examples exists or can be drafted before the page ships — likely 3–8 examples at minimum.
- Categories or tags are a sufficient organizational mechanism at this scale; deeper navigation (sub-categories, multi-tag intersections) is not needed.
- Outbound links to sample repositories or dedicated docs pages are an acceptable substitute for in-page expanded views in v1, but the body itself is expected to stand alone when no link is provided.

**Key risks:**

- **Empty page problem.** A stream with only one or two examples looks worse than no stream at all. *Mitigation:* defer launch of the page until a critical mass of examples (≥ 3) is ready.
- **Stale outbound links.** Sample repositories or external resources can move or rot. *Mitigation:* outbound URLs (when provided) are part of example frontmatter; the asset/link integrity check (per `gspec/practices.md`) catches breakage in CI. Authors may also omit `link` entirely when no stable external resource exists.
- **Post heterogeneity.** Examples with vastly different body lengths can make the stream feel uneven. *Mitigation:* author bodies to a similar shape (lede → scenario → approach → value list); rely on the outbound link for the full working configuration.
- **Stale dates.** A blog-style stream creates an implicit recency signal; an example that was last meaningful 18 months ago can mislead. *Mitigation:* update an example's `date` when its content materially changes, and prune or archive examples that no longer represent current best practice.
- **Category proliferation.** Without discipline, every example acquires its own category and the filter becomes useless. *Mitigation:* the project defines an explicit, limited set of categories; the build fails if an example uses an unknown category.

## 7. Success Metrics

1. The examples landing page lists at least 3 examples at launch, each with a title, date, description, and rich-markdown body explaining the use case and its value. An outbound link may be included but is not required.
2. The stream is ordered newest-first by `date`, and adding a newer example reorders the stream automatically on rebuild.
3. The page renders correctly and is fully usable across desktop, tablet, and mobile viewports.
4. A filtered view (by category/tag) can be shared via URL and produces the same filtered state on load.
5. Adding a new example requires editing only its own source file — verified by adding a test example and confirming it appears in the stream on the next build.

## 8. Implementation Context

> This feature PRD is portable and project-agnostic. During implementation, consult the project's `gspec/profile.md` (target users, positioning), `gspec/style.html` (design system), `gspec/stack.md` (technology choices), and `gspec/practices.md` (development standards) to resolve project-specific context.
