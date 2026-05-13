---
name: home-page
spec-version: v1
description: Marketing landing page for an open-source developer tool — terminal-styled hero, problem framing, concept model, flow diagram, AI-workflows section, CLI taste, source-kind comparison, and three-step quick start
---

# Home Page

## 1. Overview

**Feature name:** Home Page

**Summary:** The site's landing page — the first impression for visitors evaluating the developer tool. It introduces the tool with a terminal-styled hero, sets up the problem it addresses, teaches its source-and-aggregator concept model, illustrates the end-to-end flow, demonstrates its value for AI coding workflows, summarises its CLI surface, compares its source-kind options, and offers a copyable install command alongside a three-step quick start.

**Problem being solved:** Developers evaluating an unfamiliar dev tool decide within seconds whether to read further or move on. A single page must communicate what the tool is, why it exists, and how to start using it — concisely and confidently. Without a focused landing page, the project relies on a README on a code-hosting site, which is poorly suited for first-impression marketing or for explaining a non-trivial concept model.

This matters now because the landing page is the entry point for every other promotion channel (search, package registry listings, blog mentions, shared links). It must exist before the rest of the site is meaningful.

## 2. Users & Use Cases

**Primary users:** Prospective adopters — developers, tech leads, and AI-assisted engineering teams visiting the site for the first time to evaluate the tool.

**Key use cases:**

1. A developer arrives from a search engine, reads the hero, scrolls through the concept overview, and clicks through to the documentation to learn more.
2. A developer arrives from the project's listing on a package registry, scrolls to the install snippet, copies the command, and is ready to try the tool within seconds.
3. A returning visitor lands on the home page to find the link out to the source repository (e.g., to file an issue or read recent commits).
4. An AI agent retrieving the page for context picks up a clear statement of what the tool is, what problem it solves, and how it is used.

## 3. Scope

**In scope:**

- A hero section with an ASCII-art rendering of the project name, a tagline, a 1–2 sentence value statement, a copyable install-command primary CTA, a secondary jump-to-concept CTA, and a runtime status meta row.
- A "problem" section presenting the pain points the tool addresses, with three cards and a supporting diagram.
- A two-role model section introducing the tool's primary source (maester) and aggregator (citadel) concepts, noting that a maester can be defined either at the source (resident) or at the citadel (traveling) — illustrated with inline configuration snippets.
- A flow/architecture diagram showing how sources feed into a central aggregator and out to consumers.
- An AI-workflows section explaining the tool's value for AI coding agents, with numbered value-prop cards, a side-by-side before/after agent-transcript demonstration, and a short subsection introducing the optional agent-skill integration with a row of supported-agent badges.
- A CLI table giving a brief "taste" of the tool's commands, with a clear link to the full CLI reference.
- A side-by-side comparison clarifying when to choose each source kind.
- A three-step quick start section ending in a prominent install-command affordance.
- Cross-cutting visual treatments that establish a terminal-flavored look-and-feel: a "kicker" tag above each major section heading, accent-coloured inline emphasis, a distinct accent colour for the citadel-side source variant, and a subtle scanline texture.
- Responsive layout for desktop, tablet, and mobile.

**Out of scope:**

- Full documentation content (covered by `[[documentation-section]]`).
- Story or origin content (covered by `[[about-page]]`).
- Examples / recipes gallery (covered by `[[examples-page]]`).
- Release notes (covered by `[[changelog-page]]`).
- Site-wide header, footer, or navigation (covered by `[[site-shell]]`).
- Per-page meta tags or social cards (covered by `[[seo-metadata]]`).
- The full CLI reference (covered by `[[documentation-section]]`); the home page surfaces only a brief taste with a link to the full reference.

**Deferred ideas:**

- An interactive tabbed terminal demo (e.g. switching between `init`, `sync`, and `summary` panes).
- A user/testimonial logos bar.
- Animated scroll interactions or parallax effects.
- A video demo or animated screencast in the hero.
- A "Who uses this" community showcase.
- A comparison table against alternative tools.

## 4. Capabilities

- [x] **P0**: The hero section communicates what the tool is at a glance
  - Project name is the most prominent element on the page
  - A tagline (one short sentence) immediately follows the name
  - A supporting 1–2 sentence value statement clarifies what the tool does and for whom
  - Primary CTAs are visible without scrolling on desktop viewports

- [x] **P0**: A concept overview section explains the tool's core model
  - Section presents the tool's primary concept(s) in brief prose
  - At least one supporting visual element accompanies the prose (diagram, illustration, or annotated example)
  - Section is visually distinct from the hero

- [x] **P0**: An install/usage snippet section shows a copyable one-line command
  - The snippet is rendered with monospaced styling and clear visual containment
  - A copy-to-clipboard affordance is present (provided by `[[code-snippets]]`)
  - The snippet shows the minimal command to start using the tool

- [x] **P0**: The page is fully responsive across common device sizes
  - Layout adapts cleanly to desktop (1024px+), tablet (768px), and mobile (375px) viewports
  - No horizontal scrolling on any viewport
  - Text remains readable and visual elements scale appropriately at all sizes
  - Primary CTAs remain prominent on mobile

- [x] **P1**: The page loads quickly and feels responsive
  - Largest Contentful Paint occurs within 2 seconds on a standard broadband connection
  - Images and visual elements are appropriately sized and optimized for web delivery
  - No layout shift after initial render

- [x] **P1**: The page structure supports scannability
  - Clear visual hierarchy guides the visitor from name → tagline → problem → concept → flow → AI value → CLI → compare → quick start
  - Sections are separated with adequate spacing to avoid a dense, text-heavy appearance
  - A first-time visitor can grasp the tool's purpose within 15 seconds of landing

- [x] **P2**: Semantic page structure supports accessibility
  - Page uses proper heading hierarchy (single h1 for the project name, logical h2/h3 nesting)
  - All visual elements have descriptive alternative text where appropriate
  - Page is fully navigable via keyboard, with visible focus indicators
  - Color contrast meets WCAG AA for all text

- [x] **P0**: The hero presents an ASCII-figlet project mark, a copyable install-command primary CTA, a secondary jump-to-concept CTA, and a runtime status meta row
  - The project name is rendered as multi-line ASCII art (a "figlet") styled with the accent colour, with a subtle accent-coloured glow
  - The hero's primary CTA is a copyable install command (with a `$` prompt prefix and a visible copy affordance) — replacing any prior repo/registry CTA buttons
  - A secondary "read the model" CTA links to the model section via an in-page anchor
  - A meta row below the CTAs lists at minimum: runtime/license, AI-tool compatibility, and a hosted-infrastructure note, each prefixed with a small status glyph

- [x] **P0**: A "problem" section establishes the pain points the tool solves
  - Section displays exactly three cards, each with a short title, a 1–2 sentence body, and a semantic glyph (error/warning)
  - The three cards collectively cover: documentation scattered across multiple repositories, centralised portals going stale, and AI agents lacking system-wide context
  - A supporting visual element (diagram or illustration) reinforces the "scattered" message with multiple disconnected source nodes
  - Section is preceded by a "kicker" tag and visually distinct from the hero

- [x] **P0**: A model section introduces the two roles (primary source and central aggregator) and notes that a maester can be defined either at the source or from the citadel
  - Two role cards are presented in a consistent layout: glyph, role tag, h3 heading, short body, and an inline configuration snippet (e.g. YAML)
  - The maester card explicitly calls out the two definition locations — at the source (a "resident" maester via `maester.yaml`) and at the citadel (a "traveling" maester via an `includes` list); the alt-purple accent marks the traveling variant for visual consistency with the source-modes section further down
  - Each card's snippet shows the canonical shape it represents — the source's `maester.yaml`, and the aggregator's `citadel.yaml` listing both a resident and a traveling source
  - The section is reachable via an in-page anchor (e.g. `#how`)

- [x] **P0**: A flow/architecture diagram visualises how sources feed into the aggregator and out to consumers
  - Diagram shows multiple resident maesters and at least one traveling maester feeding into a single aggregator node
  - The aggregator node shows a representative output directory tree
  - Arrows visually differentiate resident vs traveling maesters via colour (accent vs. alt-purple) and line style (solid vs. dashed)
  - At least one consumer destination (engineers, AI agents, CI) is shown on the receiving side

- [x] **P0**: An AI-workflows section explains the tool's value for AI coding agents and demonstrates it with a before/after comparison
  - Section displays four numbered value-prop cards (01–04), each with a short title and a 1–2 sentence body
  - A side-by-side "before / after" panel shows an agent transcript without the tool (agent guesses) vs. with the tool (agent reads the aggregated corpus), making the win concrete
  - The "before" pane is visually tagged in an error/warning colour; the "after" pane is tagged in a success colour
  - Section is reachable via an in-page anchor (e.g. `#ai`)

- [x] **P0**: The AI-workflows section introduces the optional agent-skill integration (the Grand Maester) so visitors learn it exists and which agents it supports
  - A short intro (1–2 sentences) inside the AI-workflows section explains that the tool ships an installable agent skill which turns the central aggregator into a first-class context surface for the host AI coding agent — so the agent reasons over aggregated content with citadel-, state-, and freshness-awareness instead of needing manual setup
  - A compact "supported agents" row lists the v1 target agents — Claude Code, Codex CLI, Cursor, and a generic `AGENTS.md` fallback — visually styled as small inline chips or badges
  - A character illustration of the Grand Maester accompanies the intro (sourced from `src/assets/illustration/grand-maester.png`), giving the subsection a clear visual anchor that personifies the agent-skill concept; the image has descriptive alt text and is sized to sit alongside the intro paragraph on desktop and stack above the prose on mobile
  - The subsection lives inside the existing AI-workflows section (no new top-level section, no new in-page anchor), placed after the before/after panel and visually separated from it by a sub-heading or small divider so it does not crowd the transcript demo
  - No copyable install snippet appears in this subsection; the install affordance remains the hero install CTA and the quick-start section, and install detail is deferred to the documentation section
  - The subsection is preceded by no new kicker tag (the section's existing kicker already covers the AI-workflows theme), preserving the home page's one-kicker-per-section rhythm

- [x] **P0**: A three-step quick start section shows the minimal init → publish → sync workflow
  - Three numbered step cards explain the init / publish / sync sequence with a short description and a code snippet for each
  - A prominent install-command affordance appears at the bottom of the section (mirroring the hero's install CTA)
  - Together with the hero install CTA, this section satisfies the install/usage snippet capability; a standalone install-snippet section is no longer required

- [x] **P0**: A resident-vs-traveling maester comparison section clarifies when to define a maester at the source vs at the citadel
  - Two side-by-side columns are visually tagged for the resident-maester variant (accent) and the traveling-maester variant (alt-purple)
  - Each column includes a tagline, a short description, and a definition list of comparison points: who declares the file list, where the maester lives, fallback behaviour when configuration is missing, and when to reach for that variant
  - The accent-vs-alt-purple visual distinction is consistent with the maester card's resident-vs-traveling sub-list in the model section

- [x] **P1**: A CLI table on the home page gives a brief 5-verb taste with a link to the full reference
  - Table displays the tool's primary commands in a 3-column layout: command, role, description
  - A short "global flags" list accompanies the table (verbose / quiet / json / no-colour / theme)
  - A clear link to the full CLI reference in the documentation section is present
  - Section is reachable via an in-page anchor (e.g. `#cli`)

- [x] **P1**: Each major content section is preceded by a monospace "kicker" tag for scannability
  - Each major section's h2 is preceded by a small monospace kicker label (e.g. `· the problem`, `· the model`, `· the flow`)
  - Kicker uses the muted foreground colour with a single accent-coloured marker character
  - Kicker style is consistent across every home-page section

- [x] **P1**: A subtle scanline texture establishes a terminal-flavoured atmosphere across the page
  - A very low-contrast repeating horizontal scanline pattern is applied as a fixed-position decorative background overlay
  - The texture sits below all content (does not interfere with text readability, focus rings, or click targets)
  - The texture honours the `prefers-reduced-motion` setting where applicable and does not affect colour-contrast compliance

- [x] **P2**: Inline emphasis (`<em>`) within home-page body copy renders in the accent colour to draw the eye to product terms
  - Within home-page prose, `<em>` styles in the accent colour, used to highlight the tool's named concepts (e.g. *maester*, *citadel*, *includes*)
  - Underlying semantic emphasis remains correct — `<em>` is used only for genuinely emphasised terms, not as a styling shortcut
  - The treatment is scoped to the home page (or applied site-wide if consistent with the design tokens)

## 5. Dependencies

- **Feature dependencies:**
  - `[[site-shell]]` — the page renders inside the site's base layout, header, and footer.
  - `[[code-snippets]]` — the install snippet uses the shared code-block component with copy-to-clipboard.
  - `[[seo-metadata]]` — the page declares its own title, description, and social card metadata via the shared mechanism.
- **External dependencies:** A package name for the install command and a source repository URL for the navigation link (the nav link itself is handled by `[[site-shell]]`). These are project metadata, not third-party services.

## 6. Assumptions & Risks

**Assumptions:**

- The project has a defined name, tagline, and at least a draft of its core value statement.
- A one-line install or usage command exists or can be drafted before the page ships.
- The tool's concept model can be summarized in a paragraph and one diagram. If the model is too complex for that, the home page links into the documentation rather than trying to fully teach the model.

**Key risks:**

- **Concept doesn't land.** The hardest part of a dev-tool landing page is communicating a non-trivial concept model briefly. *Mitigation:* the concept section is required to include both prose and a visual; if either is missing, the section is incomplete.
- **Information density.** The home page now spans many themed sections (problem, model, flow, AI workflows, CLI, compare, quick start). *Mitigation:* every section is preceded by a kicker tag and has a single dominant h2; sections are independently scannable, and primary value (hero install CTA, model section, AI before/after) is concentrated above the fold-cluster.
- **CTA ambiguity.** A copyable install command as primary CTA and a "read the model" jump as secondary CTA must remain visually distinct. *Mitigation:* the install command uses a filled/bordered terminal-style affordance and the secondary CTA is rendered as a ghost button.
- **Stale install snippet.** Install commands and package names change between releases. *Mitigation:* the snippet is sourced from the same configuration as `[[changelog-page]]` and the package metadata, not hardcoded in multiple places.
- **Traveling-maester concept underrepresented.** The citadel-side way to define a maester (a "traveling maester", backed by `includes:` in the source entry) is less obvious than the in-source case. *Mitigation:* the maester card's resident-vs-traveling sub-list, the flow diagram, the AI-workflows section, and the source-modes compare section each reinforce it in a different format; the alt-purple colour marks "traveling" consistently across all of them. The technical docs (`/docs/concepts/citadel`) keep the underlying `includes`-driven terminology for completeness.

## 7. Success Metrics

1. First-time visitors can identify the project name, what the tool does, and how to install it within 15 seconds of landing on the page.
2. The page renders correctly and is fully usable across desktop, tablet, and mobile viewports.
3. Primary actions receive measurable engagement (tracked via the project's analytics, if any) — a healthy floor would be > 10% of unique landing-page visitors either copying the install command or following a CTA into the documentation.
4. Largest Contentful Paint is under 2 seconds on a standard broadband connection.

## 8. Implementation Context

> This feature PRD is portable and project-agnostic. During implementation, consult the project's `gspec/profile.md` (target users, positioning), `gspec/style.html` (design system), `gspec/stack.md` (technology choices), and `gspec/practices.md` (development standards) to resolve project-specific context.
