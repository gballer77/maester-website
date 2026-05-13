---
name: examples-page
spec-version: v1
description: Curated gallery of example configurations and use cases for the developer tool
---

# Examples Page

## 1. Overview

**Feature name:** Examples Page

**Summary:** A curated gallery of example use cases for the developer tool. Each example is a self-contained card showing a title, a short description, the relevant code/configuration snippet, and a link out to a fuller resource (e.g., a sample repository or a dedicated docs page). Visitors browse the gallery to find a working starting point that matches their situation.

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

- A landing page for the examples section listing all available examples as cards in a grid.
- Each card shows: example title, short description, a small visible code/configuration snippet preview (or an inline expanded view), and an outbound link to a fuller resource (e.g., a sample repository, a dedicated docs page, or an in-page expanded view).
- Filtering or grouping by category/tag — at minimum, a simple set of category labels above the grid.
- Responsive layout: grid on desktop, single column on mobile.
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

- [ ] **P0**: The examples landing page lists every available example in a grid
  - All examples render as cards in a grid layout
  - Each card includes the example's title and short description
  - Cards have consistent height/width within a row to maintain visual rhythm
  - The page has a clear heading and brief intro explaining what the section is

- [ ] **P0**: Each example card shows a visible code or configuration preview
  - Each card includes a small preview of the example's primary code or configuration content (provided by `[[code-snippets]]`)
  - The preview is truncated or scrollable when content exceeds the card's allotted height
  - The preview does not overflow the card or break the grid

- [ ] **P0**: Each example card links to a fuller resource
  - Each card includes at least one outbound link — to a sample repository, a dedicated docs page, or an expanded in-page view
  - Links are visually distinct from card body text
  - Outbound links to external resources open according to standard link behavior (no forced new tabs unless the visitor explicitly opts in)

- [ ] **P0**: Examples can be grouped or filtered by category/tag
  - Each example declares one or more category labels in its source
  - The page exposes a way to filter or visually group examples by category (e.g., tag pills above the grid, or labeled sections)
  - When no filter is applied, all examples are visible
  - Filter state is reflected in the URL so a filtered view can be shared via link

- [ ] **P0**: The page is fully responsive across common device sizes
  - On desktop (1024px+), examples render in a multi-column grid
  - On tablet (768px), the grid reflows to fewer columns
  - On mobile (375px), examples render as a single column
  - No horizontal scrolling on any viewport

- [ ] **P0**: New examples can be added without page-template changes
  - Examples are authored in a consistent format (e.g., one Markdown/MDX file per example or a single registry file)
  - Adding a new example requires creating or editing one source file, with no changes to the page template
  - Build fails with a clear error if a required example field (title, description, category, snippet) is missing

- [ ] **P1**: The page structure supports scannability
  - Visitors can skim the entire gallery to understand the range of examples in under 30 seconds
  - Card titles are visually prominent so scanning is title-driven, not body-driven
  - Spacing and grouping prevent the gallery from feeling like a wall of text

- [ ] **P2**: Semantic structure supports accessibility
  - Each card is a single accessible region with a clear name
  - Card outbound links have descriptive accessible names (not just "Learn more")
  - Category filters are keyboard-accessible with visible focus indicators
  - The grid order reflects a sensible reading order for screen readers

## 5. Dependencies

- **Feature dependencies:**
  - `[[site-shell]]` — the page renders inside the site's base layout, header, and footer.
  - `[[code-snippets]]` — example previews use the shared code-block component.
  - `[[seo-metadata]]` — the page declares its own title, description, and social card metadata via the shared mechanism.
- **External dependencies:** Source content for each example (titles, descriptions, snippets, and outbound URLs) — this is project-authored content, not third-party data.

## 6. Assumptions & Risks

**Assumptions:**

- A useful initial set of examples exists or can be drafted before the page ships — likely 3–8 examples at minimum.
- Categories or tags are a sufficient organizational mechanism at this scale; deeper navigation (sub-categories, multi-tag intersections) is not needed.
- Outbound links to sample repositories or dedicated docs pages are an acceptable substitute for in-page expanded views in v1.

**Key risks:**

- **Empty page problem.** A gallery with only one or two examples looks worse than no gallery at all. *Mitigation:* defer launch of the page until a critical mass of examples (≥ 3) is ready.
- **Stale outbound links.** Sample repositories or external resources can move or rot. *Mitigation:* outbound URLs are part of example frontmatter; the asset/link integrity check (per `gspec/practices.md`) catches breakage in CI.
- **Card heterogeneity.** Examples with vastly different snippet sizes can make cards visually jarring. *Mitigation:* enforce a maximum preview height with truncation; rely on the outbound link for the full content.
- **Category proliferation.** Without discipline, every example acquires its own category and the filter becomes useless. *Mitigation:* the project defines an explicit, limited set of categories; the build fails if an example uses an unknown category.

## 7. Success Metrics

1. The examples landing page lists at least 3 examples at launch, each with a title, description, preview, and outbound link.
2. The page renders correctly and is fully usable across desktop, tablet, and mobile viewports.
3. A filtered view (by category/tag) can be shared via URL and produces the same filtered state on load.
4. Adding a new example requires editing only its own source file — verified by adding a test example and confirming it appears in the gallery on the next build.

## 8. Implementation Context

> This feature PRD is portable and project-agnostic. During implementation, consult the project's `gspec/profile.md` (target users, positioning), `gspec/style.html` (design system), `gspec/stack.md` (technology choices), and `gspec/practices.md` (development standards) to resolve project-specific context.
