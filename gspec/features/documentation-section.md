---
name: documentation-section
spec-version: v1
description: Documentation section framework — content authoring, docs layout, sidebar nav, table of contents, prev/next, and anchor links
---

# Documentation Section

## 1. Overview

**Feature name:** Documentation Section

**Summary:** The documentation area of the site — a content-authored set of pages with a dedicated docs layout, a sidebar navigation listing all pages, a table of contents on each page, prev/next page links, and anchor links on every heading.

**Problem being solved:** A developer tool's documentation is its most consumed surface after the landing page. Without a dedicated docs section, content must be scattered across one-off pages or pushed back to the source repository's README, neither of which scales. A unified docs section with sidebar navigation, in-page navigation, and deep-linking lets readers move efficiently, share specific concepts, and treat the site as the canonical reference.

This matters now because the docs section is what converts a curious landing-page visitor into an adopting user, and it's what existing users return to repeatedly.

## 2. Users & Use Cases

**Primary users:** Adopters and active users — developers learning the tool, configuring it, looking up commands or options, and sharing concepts with teammates.

**Key use cases:**

1. A new adopter follows a "Getting Started" page step-by-step, scrolling through ordered sections and following prev/next links to continue.
2. An existing user opens a specific reference page from a search result and uses the on-page table of contents to jump directly to the relevant subsection.
3. A teammate is sent a deep link to a specific heading anchor in a concept explanation; the link opens the page scrolled to that exact section.
4. An AI agent fetches a specific docs page to ground its reasoning, finding consistent structure (heading hierarchy, anchor ids) that makes content easy to extract.

## 3. Scope

**In scope:**

- A content authoring model that lets documentation pages be authored as Markdown/MDX with frontmatter metadata (at minimum: title, description, and ordering hints).
- A docs page layout: header (from site shell), sidebar navigation, main content area, table of contents, footer (from site shell).
- A sidebar navigation listing every docs page, organized into named groups, with active-state styling for the current page.
- A table of contents (TOC) on each docs page, derived from the page's headings, with active-section highlighting as the reader scrolls.
- Prev/next navigation links at the bottom of each page based on the sidebar order.
- Anchor links on every heading (h2 and below) that allow deep-linking and copying the anchor URL.
- Responsive behavior: sidebar collapses or moves into a drawer on mobile; TOC may be hidden or repositioned on smaller viewports.
- Empty-state handling when the docs set has only one page (no prev/next, simplified sidebar).

**Out of scope:**

- Search within the docs (covered by `[[docs-search]]`).
- A code-block component with syntax highlighting and copy-to-clipboard (covered by `[[code-snippets]]`).
- Site-wide header, footer, and primary navigation (covered by `[[site-shell]]`).
- Per-page meta tags and social cards (covered by `[[seo-metadata]]`).
- Versioned docs (multiple versions of the same docs set).
- Internationalization or translated docs.
- Auto-generated API reference from source code.
- Inline page editing or contribution flows.

**Deferred ideas:**

- A "Edit this page on the source repository" link in each page footer.
- A "Last updated" date on each page.
- A "Was this helpful?" feedback prompt.
- Breadcrumb navigation above the page title.
- Per-page Open Graph images auto-generated from page titles.
- Multi-version documentation with a version switcher.

## 4. Capabilities

- [x] **P0**: Docs pages are authored as Markdown/MDX with frontmatter
  - Each docs page is a single Markdown/MDX file
  - Each file declares at minimum a title and a description in its frontmatter
  - Files can declare an optional ordering hint and an optional group/section name
  - Build fails with a clear error if required frontmatter is missing

- [x] **P0**: Docs pages render inside a dedicated docs layout
  - Layout includes the site shell's header and footer
  - Layout includes a sidebar navigation on the left (or below the header on mobile)
  - Layout includes a main content area for the page's rendered Markdown
  - Layout includes a table of contents adjacent to the main content on desktop viewports

- [x] **P0**: The sidebar navigation lists every docs page
  - Each docs page appears in the sidebar with its title from frontmatter
  - Pages are organized into named groups based on their frontmatter group/section hint
  - The current page is visually marked as active in the sidebar
  - Clicking a sidebar item navigates to that page

- [x] **P0**: A table of contents is generated from each page's headings
  - TOC includes all h2 and h3 headings on the page
  - Clicking a TOC item scrolls to the corresponding heading
  - The TOC item for the currently visible section is visually highlighted as the reader scrolls
  - If a page has no h2 headings, the TOC is hidden or shows an empty-state placeholder

- [x] **P0**: Every heading has an anchor link
  - Every h2, h3, h4 heading on a docs page has a stable, slug-based id
  - Each heading exposes an anchor affordance (e.g., a "#" link that becomes visible on hover or focus) that copies a direct URL to that heading
  - Loading a URL with an anchor fragment scrolls the page to that heading on initial render

- [x] **P0**: Prev/next navigation appears at the bottom of each page
  - The bottom of each page shows a link to the previous and the next docs page based on the sidebar order
  - The first page in the set shows only a "next" link; the last shows only a "previous" link
  - Each link includes the destination page's title for context

- [x] **P0**: Docs are fully responsive across common device sizes
  - On desktop (1024px+): sidebar visible on the left, TOC visible on the right, main content in the center
  - On tablet (768px): sidebar and TOC may collapse or merge; main content remains prominent
  - On mobile (375px): sidebar moves into a drawer or expandable menu, TOC moves to a collapsible position or is hidden
  - No horizontal scrolling on any viewport

- [x] **P1**: The sidebar preserves scroll position across navigations
  - When navigating between docs pages, the sidebar's own scroll position is preserved so long sidebars don't reset to the top on every click

- [x] **P1**: Empty-state handling when only one docs page exists
  - When the docs set has only one page, prev/next links are hidden
  - The sidebar still renders but does not show grouping headers if no groups are defined

- [x] **P2**: Semantic structure supports accessibility
  - Sidebar uses a `<nav>` element with an accessible name
  - TOC uses a `<nav>` element with an accessible name
  - Main content uses the `<main>` landmark from the shell
  - Heading anchor links have descriptive accessible names (e.g., "Link to section: <heading text>")
  - All interactive elements are keyboard-accessible with visible focus indicators

## 5. Dependencies

- **Feature dependencies:**
  - `[[site-shell]]` — docs pages render inside the site's base layout, header, and footer.
  - `[[code-snippets]]` — docs pages render code blocks using the shared component.
  - `[[seo-metadata]]` — each docs page emits its own title and description meta tags via the shared mechanism.
- **External dependencies:** A Markdown/MDX rendering pipeline (provided by the chosen static-site framework — covered in `gspec/stack.md`).

## 6. Assumptions & Risks

**Assumptions:**

- The set of docs pages is small enough at launch that a single flat or shallowly-grouped sidebar is sufficient — deep, nested navigation is deferred.
- Authors will follow consistent heading practices (a single h1 per page, sequential h2/h3 nesting).
- The frontmatter ordering hint is acceptable for now; a more sophisticated ordering mechanism (e.g., a manifest file) can be added later if needed.
- The static-site framework chosen for the project supports content collections with frontmatter validation.

**Key risks:**

- **Sidebar drift.** As docs grow, ad-hoc additions can scramble the sidebar order. *Mitigation:* require an explicit ordering hint in frontmatter; build fails if order is ambiguous.
- **Stale TOC on dynamic content.** A TOC built at render time can mismatch if content is mutated client-side. *Mitigation:* docs content is server-rendered at build time; no client-side mutation of headings.
- **Heading slug collisions.** Two headings with the same text produce the same slug. *Mitigation:* slug generation appends a numeric suffix on collision, and the build emits a warning when collisions occur.
- **Mobile sidebar accessibility.** Drawer-style mobile menus are a common source of focus-management bugs. *Mitigation:* prefer a disclosure-style sidebar over a modal drawer; test with keyboard and screen reader.

## 7. Success Metrics

1. Every docs page renders inside the docs layout with sidebar, TOC, and prev/next links present.
2. Every heading on every docs page has a working anchor that produces a shareable, deep-linkable URL.
3. The docs section is fully usable on desktop, tablet, and mobile viewports with no horizontal overflow.
4. New docs pages can be added by creating a single Markdown/MDX file — no other site changes required.

## 8. Implementation Context

> This feature PRD is portable and project-agnostic. During implementation, consult the project's `gspec/profile.md` (target users, positioning), `gspec/style.html` (design system), `gspec/stack.md` (technology choices), and `gspec/practices.md` (development standards) to resolve project-specific context.
