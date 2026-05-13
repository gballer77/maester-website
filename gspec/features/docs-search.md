---
name: docs-search
spec-version: v1
description: Full-text search across all documentation pages with keyboard shortcut, result previews, and deep-linking to matched sections
---

# Docs Search

## 1. Overview

**Feature name:** Docs Search

**Summary:** A search experience scoped to the documentation section. Readers open a search palette via a header control or a keyboard shortcut, type a query, and get ranked results that link directly to matching pages — and ideally to matching headings within those pages.

**Problem being solved:** Documentation grows quickly. Even a well-organized sidebar becomes inadequate once readers want to jump directly to a specific concept or option rather than navigate sections to find it. A search experience that returns ranked hits — preferably with context snippets — turns the docs into a reference, not just a reading experience.

This matters now because once the documentation section exists and starts accumulating pages, the absence of search makes the docs frustrating to use as a reference. Adding search later, after readers have already developed workarounds, costs more credibility than building it in alongside the docs.

## 2. Users & Use Cases

**Primary users:** Active users of the developer tool — people who already know what they're looking for and want to find it without scanning the sidebar.

**Key use cases:**

1. A user remembers a specific term (e.g., a config option name) and wants to find every page that mentions it; they open the search palette, type the term, and click the most relevant result.
2. A user knows a concept by its colloquial name and searches for it; the search returns the page whose heading or title closely matches, even if the colloquial name appears only in the body.
3. A user opens the docs and immediately presses a keyboard shortcut (e.g., `Cmd/Ctrl+K`) to bring up the search palette without reaching for the mouse.
4. A returning user searches from a mobile device, scrolling through ranked results in a touch-friendly list.

## 3. Scope

**In scope:**

- A search index covering every documentation page (titles, headings, and body text).
- A search-trigger control in the site header (visible whenever the docs section is accessible).
- A keyboard shortcut to open the search palette (e.g., `Cmd+K` on macOS, `Ctrl+K` elsewhere).
- A search palette that accepts a query and shows ranked results below the input as the user types.
- Result entries that show the matched page title, the matched heading (where applicable), and a short snippet of surrounding text.
- Keyboard navigation within the search palette (arrow keys to move, enter to open, escape to dismiss).
- Deep-linking to a specific heading within a page when the match is for a heading.
- Responsive behavior — the search palette is usable on desktop, tablet, and mobile.

**Out of scope:**

- Search across pages outside the documentation section (e.g., the home page or the about page are not indexed for v1).
- Faceted filtering (by section, page type, etc.).
- A dedicated `/search` page with persistent results.
- Saved or recent searches across sessions.
- Search-result analytics or query logging.
- Server-side search infrastructure (search is client-side or build-time only for v1; see Assumptions for rationale).
- Multi-language search.

**Deferred ideas:**

- Faceted filtering by section or page type.
- A dedicated standalone `/search` page that supports linking to search results.
- Recent and popular searches displayed when the palette is opened empty.
- Server-side search backed by a hosted search service.
- Synonym handling and stemming improvements beyond what the search library provides by default.
- Cross-language / fuzzy search for non-English queries.

## 4. Capabilities

- [ ] **P0**: A search index covers every documentation page
  - The index is generated at build time from the docs content (titles, headings, body text)
  - Adding a new docs page automatically adds it to the index on the next build — no manual indexing step required
  - The index is small enough to ship with the static build without significantly inflating page weight (target: under 200 KB compressed for a small-to-medium docs set)

- [ ] **P0**: A search trigger is present in the site header on docs-accessible routes
  - The trigger is keyboard-accessible with a visible focus indicator
  - The trigger has a descriptive accessible name (e.g., "Search documentation")
  - Activating the trigger opens the search palette and moves focus to the search input

- [ ] **P0**: A keyboard shortcut opens the search palette
  - Pressing `Cmd+K` on macOS or `Ctrl+K` elsewhere opens the palette and moves focus to the input
  - The shortcut works from any page that has the search trigger available
  - The shortcut does not interfere with the browser's built-in shortcuts (e.g., does not block the address-bar focus shortcut)
  - The shortcut is discoverable via a visible hint near the search trigger (e.g., "⌘K")

- [ ] **P0**: The search palette accepts queries and shows ranked results as the user types
  - Typing in the input updates the result list with low latency (no perceptible delay for a small index)
  - Results are ordered by relevance, with title/heading matches ranked above body-only matches
  - An empty query state shows either nothing or a brief prompt; it does not show all pages
  - Result list is bounded to a reasonable maximum (e.g., 10–20 visible results) with scrolling for the remainder

- [ ] **P0**: Each result entry shows page title, matched heading, and a text snippet
  - Page title is always shown
  - If the match is in a specific heading (not just the page body), the heading is shown beneath the title
  - A short snippet of the surrounding text accompanies the result, with the matched query terms emphasized
  - Clicking or pressing enter on a result navigates to the page (and to the specific heading anchor when applicable)

- [ ] **P0**: The palette supports full keyboard navigation
  - Arrow keys move the highlighted result up or down
  - Enter opens the highlighted result
  - Escape closes the palette and returns focus to the trigger
  - The currently highlighted result is communicated to assistive technologies

- [ ] **P0**: The search palette is responsive across common device sizes
  - On desktop, the palette appears as a centered modal
  - On mobile, the palette occupies the screen in a touch-friendly layout
  - On every size, the input is the primary focus and the result list is scrollable
  - The palette does not cause page-level horizontal overflow

- [ ] **P1**: Empty-state handling when there are no results
  - When a query has zero matches, the palette shows a clear "no results" message with the query echoed back
  - The message suggests checking spelling or trying a different term

- [ ] **P2**: Search performance remains responsive at scale
  - With at least 100 docs pages, typed-query latency to first rendered result remains under 100 ms on a mid-range device
  - The palette does not block the main thread for a perceptible amount of time during query updates

## 5. Dependencies

- **Feature dependencies:**
  - `[[site-shell]]` — the search trigger lives in the header defined by the site shell.
  - `[[documentation-section]]` — the index is built from the docs content collection, and search results link to anchored headings within docs pages.
- **External dependencies:** A client-side search library (specific tool defined by `gspec/stack.md`). No third-party hosted search service is required for v1.

## 6. Assumptions & Risks

**Assumptions:**

- The docs corpus at launch is small enough that client-side indexing is performant. If the corpus grows beyond what a client-side index supports, a hosted search service can be introduced later behind the same UI.
- Adoption of `Cmd/Ctrl+K` is broad enough that visitors expect that shortcut on a developer-tool docs site.
- The chosen static-site framework supports build-time index generation from the docs content collection.

**Key risks:**

- **Index size bloat.** A naive index of all body text can become large enough to harm initial page load. *Mitigation:* tune the index to favor headings and titles; truncate body text contributions; ship the index as a lazy-loaded asset triggered when the user opens the palette.
- **Stale index.** If the index is generated at build time, content changes between builds are not searchable. This is acceptable for a static-site model — but it is a hard constraint to remember.
- **Keyboard shortcut conflicts.** `Cmd/Ctrl+K` can collide with extensions, password managers, or browser features. *Mitigation:* the shortcut is a convenience, not the only way to open the palette; the header trigger is always available.
- **Result quality on small queries.** Very short queries (1–2 characters) can return noisy results that overwhelm the palette. *Mitigation:* either suppress results until the query reaches a minimum length (e.g., 2 characters) or apply a more aggressive relevance threshold for short queries.

## 7. Success Metrics

1. Every docs page is indexed and findable via the search palette using a representative query.
2. Opening the search palette via the header trigger or the keyboard shortcut moves focus to the input and shows the first result within 200 ms of the first keystroke.
3. Result links navigate directly to the matched page — and to the matched heading anchor when applicable — with no broken links.
4. The search palette is fully usable via keyboard, including on mobile with an external keyboard.

## 8. Implementation Context

> This feature PRD is portable and project-agnostic. During implementation, consult the project's `gspec/profile.md` (target users, positioning), `gspec/style.html` (design system), `gspec/stack.md` (technology choices), and `gspec/practices.md` (development standards) to resolve project-specific context.
