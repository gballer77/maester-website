---
name: site-shell
spec-version: v1
description: Site-wide chrome — header, footer, primary navigation, and base layout used by every page
---

# Site Shell

## 1. Overview

**Feature name:** Site Shell

**Summary:** The site-wide chrome that wraps every page — header with project name and primary navigation, footer with project credits and external links, mobile-responsive navigation, and the base page layout that all routes inherit.

**Problem being solved:** A documentation/marketing site needs a consistent navigational and visual frame so visitors always know where they are, how to move between sections, and how to reach the project's repository and package registry. Without a unified shell, each page reinvents its own header and footer — leading to inconsistency, duplication, and a worse experience for both human readers and AI agents fetching pages.

This matters now because the site's first deliverables (landing page, about, documentation) all depend on a shared shell. Building those features before the shell forces rework or fragmented decisions about navigation.

## 2. Users & Use Cases

**Primary users:** All site visitors — end users (developers evaluating or using the tool), administrators/maintainers (project maintainers updating site content), and AI agents retrieving pages for context.

**Key use cases:**

1. A first-time visitor arrives at the landing page, sees the project name and a clear primary nav, and uses it to move into the documentation.
2. A returning visitor lands deep inside the docs from a search result and uses the header nav to get to the home page or the repository.
3. A mobile visitor lands on any page and opens the navigation through a touch-friendly menu without horizontal scrolling.
4. An AI agent fetches a deep page and finds consistent navigation context (project name, section markers) at the top of the document.

## 3. Scope

**In scope:**

- A site-wide header showing the project name (and optional wordmark/icon), with a primary navigation menu listing the top-level sections of the site.
- A site-wide footer showing project credits, license note, copyright line, and external links to the source repository and package registry.
- Mobile-responsive navigation: a touch-friendly menu surface that appears below a defined breakpoint, with a clear open/close affordance.
- A base page layout that wraps every page's content with the header above and the footer below.
- Active-state styling for the current section in the primary nav.
- A skip-to-main-content link for accessibility.

**Out of scope:**

- Page-level content (covered by individual page features such as `[[home-page]]`, `[[about-page]]`).
- Theme toggling (covered by `[[dark-mode]]`).
- Search input (covered by `[[docs-search]]`).
- Documentation-specific sidebar navigation or table of contents (covered by `[[documentation-section]]`).
- Per-page metadata and social cards (covered by `[[seo-metadata]]`).
- Internationalization or multi-language switching.

**Deferred ideas:**

- A version-switcher in the header for multi-version documentation.
- A "What's new" indicator that highlights recent changelog entries.
- A navbar announcement bar for project-wide notices.
- Sticky / scroll-aware header behavior with shrink-on-scroll.

## 4. Capabilities

- [ ] **P0**: Every page renders inside a consistent shell with a header at the top and a footer at the bottom
  - Navigating between any two pages preserves the header and footer without flicker or relayout
  - The shell's structure is defined in one base layout, not duplicated per page
  - Pages declare their main content area; the shell wraps it

- [ ] **P0**: The header displays the project name and primary navigation
  - Project name (and optional icon/wordmark) is visible on every page and links to the home page
  - Primary navigation lists the site's top-level sections — at minimum: Home, Docs, Examples, Changelog, About
  - Clicking a nav item navigates to that section without a full page rebuild artifact (i.e., no flash of missing nav)

- [ ] **P0**: The current section is visually indicated in the primary nav
  - When the user is on a page belonging to a top-level section, that section's nav item shows an active state (e.g., underline, bold, color change)
  - Active state is determined by the page's URL path, not hardcoded per page
  - Only one nav item is active at a time

- [ ] **P0**: Navigation is fully usable on mobile viewports
  - Below a defined breakpoint, the inline nav collapses into a menu trigger (e.g., a button)
  - Activating the trigger opens a touch-friendly menu surface that lists all primary nav items
  - The menu can be closed via the trigger, an explicit close affordance, or by tapping a nav item
  - Menu state does not leak between pages

- [ ] **P0**: The footer shows project credits and external links
  - Footer includes project name, copyright/license line, and a link out to the source repository
  - Footer includes a link to the package registry listing for the project
  - Footer remains visible at the bottom of every page

- [ ] **P0**: The shell is fully responsive across common device sizes
  - Layout adapts cleanly to desktop (1024px+), tablet (768px), and mobile (375px) viewports
  - No horizontal scrolling on any viewport
  - Header and footer remain readable and usable at all sizes

- [ ] **P1**: Keyboard users can skip directly to main content
  - A "skip to main content" link is the first focusable element on every page
  - The link is visually hidden until focused, then becomes clearly visible
  - Activating the link moves focus and scrolls to the page's main content region

- [ ] **P1**: The shell uses semantic HTML landmarks
  - The header uses a `<header>` element with a `role` or implicit landmark
  - The primary nav uses a `<nav>` element with an accessible name
  - The footer uses a `<footer>` element
  - The main content region uses a `<main>` element with a stable id

- [ ] **P2**: The shell exposes a slot or mechanism for per-page extensions
  - A page can inject content into a defined slot (e.g., a sub-header, breadcrumb area) without modifying the shell itself
  - When a page does not use the slot, the slot collapses cleanly without visual artifacts

## 5. Dependencies

- **External dependencies:** A source repository URL and a package registry URL to point the footer links at. These are project metadata, not third-party services.
- **Feature dependencies:** None. Site Shell is the foundation that every other page-level feature depends on.

## 6. Assumptions & Risks

**Assumptions:**

- The project has at least one external code home (a source repository) and at least one distribution channel (a package registry or equivalent) that the footer should link to.
- The top-level site sections are known in advance and stable; new sections are added rarely.
- All pages render server-side or at build time — no authenticated state needs to be reflected in the shell.

**Key risks:**

- **Inconsistent shell adoption.** If pages bypass the base layout and build their own structure, the shell becomes a documentation-only convention. *Mitigation:* the base layout is the only sanctioned way to author a page; per-page extensions go through defined slots.
- **Mobile menu accessibility regressions.** Custom mobile menus are a common source of accessibility bugs (focus traps, missing aria attributes, broken keyboard handling). *Mitigation:* keep the mobile menu interaction minimal, prefer disclosure-style menus over modal drawers, test with keyboard and screen reader.
- **Footer link rot.** External links can move or get renamed. *Mitigation:* derive footer link URLs from a single configuration source so a change is one line, not many.

## 7. Success Metrics

1. Every page on the site renders the same header and footer with no visual drift across routes.
2. Primary navigation works on every supported viewport size (desktop, tablet, mobile) with no horizontal overflow.
3. Keyboard users can reach every primary navigation item and the skip-to-main-content link without using a mouse.
4. The shell scores at least 95 on Lighthouse accessibility for any page that uses it.

## 8. Implementation Context

> This feature PRD is portable and project-agnostic. During implementation, consult the project's `gspec/profile.md` (target users, positioning), `gspec/style.html` (design system), `gspec/stack.md` (technology choices), and `gspec/practices.md` (development standards) to resolve project-specific context.
