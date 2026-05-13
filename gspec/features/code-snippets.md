---
name: code-snippets
spec-version: v1
description: Reusable code-block component with syntax highlighting, copy-to-clipboard, optional filename label, and optional line highlighting
---

# Code Snippets

## 1. Overview

**Feature name:** Code Snippets

**Summary:** A reusable code-block component used everywhere code appears on the site — landing page install snippet, documentation examples, configuration excerpts, and CLI usage. The component handles syntax highlighting, copy-to-clipboard, an optional filename label, and optional line highlighting.

**Problem being solved:** Developer-tool documentation depends heavily on readable, copyable code. A bare `<pre><code>` block is illegible without syntax highlighting and frustrating to use without a copy button. Reimplementing code styling on every page leads to inconsistency and missed accessibility/usability details. A single shared component ensures every code snippet on the site looks and behaves identically.

This matters now because the home page's install snippet and every docs page's examples all depend on this component. It is foundational, not optional.

## 2. Users & Use Cases

**Primary users:** All site readers — developers reading docs, copying install commands, evaluating example configurations, or following step-by-step setup instructions.

**Key use cases:**

1. A new adopter on the home page clicks the copy button on the install snippet and pastes the command directly into their terminal without manual selection.
2. A developer reading a configuration example sees the filename labeled above the snippet (e.g., `config.json`) and knows exactly which file the example belongs to.
3. A developer following a tutorial sees specific lines of a longer example highlighted to indicate the parts that changed since the previous step.
4. A reader on a mobile device taps a code snippet and is able to copy the entire snippet despite the limited screen width.

## 3. Scope

**In scope:**

- A code-block component that accepts a language identifier and applies syntax highlighting consistent with the project's design system.
- A copy-to-clipboard button visible on every code block, with clear feedback on success.
- An optional filename label rendered above the code block.
- Optional line highlighting via a metadata syntax on the code block (e.g., highlighting specific lines or line ranges).
- Horizontal scrolling within the code block when content exceeds the available width (no page-level overflow).
- Accessible markup and keyboard interaction for the copy button.
- Responsive behavior — the component is usable on desktop, tablet, and mobile.

**Out of scope:**

- An interactive code playground or sandbox.
- Editable/runnable code (the component is read-only).
- Diff rendering with old/new line markers as a primary feature (line highlighting is the closest analog; full diff support is deferred).
- Image-based or screenshot-style code embeds.
- Per-snippet "show more / show less" collapse controls.
- Programmatic translation of code between languages.

**Deferred ideas:**

- Tabbed code blocks (e.g., showing the same example in multiple languages with a tab switcher).
- Inline diff rendering with addition/removal markers.
- A "show line numbers" toggle.
- A code-block annotation system (e.g., callouts pointing at specific lines).

## 4. Capabilities

- [ ] **P0**: Code blocks render with syntax highlighting for declared languages
  - When a code block declares a language, tokens are colored according to the project's design system
  - When no language is declared, the code is rendered as plain monospaced text with no highlighting
  - Unknown or unsupported languages fall back to plain monospaced text without raising a build error
  - Highlighting works for at least the languages relevant to the project (the build documents the supported list)

- [ ] **P0**: Every code block has a copy-to-clipboard button
  - The button is visually present on every code block, positioned consistently (e.g., top-right corner)
  - Clicking or tapping the button copies the code block's text content to the clipboard
  - The button provides clear feedback on successful copy (e.g., changes label or icon for a short interval)
  - The button is keyboard-accessible with a visible focus indicator

- [ ] **P0**: A code block can display an optional filename label
  - When a filename is provided, it renders as a label above the code block
  - When no filename is provided, no label area is rendered (no empty space)
  - The filename label uses styling distinct from the code content but visually associated with it

- [ ] **P1**: A code block supports optional line highlighting
  - The component accepts a metadata syntax declaring which line numbers or ranges to highlight (e.g., `{2,4-6}`)
  - Highlighted lines are visually distinct from non-highlighted lines (e.g., background color or marker)
  - Out-of-range line numbers are ignored without error

- [ ] **P0**: Long code blocks scroll horizontally within their container
  - When code content is wider than the container, the code block scrolls horizontally within itself
  - Horizontal scrolling does not cause the page itself to overflow
  - The copy button remains accessible regardless of scroll position

- [ ] **P0**: The component is fully responsive across common device sizes
  - The code block adapts cleanly to desktop, tablet, and mobile viewports
  - The copy button remains tappable on mobile (meets minimum tap-target size)
  - Filename labels remain readable at all sizes

- [ ] **P1**: Copy behavior degrades gracefully when clipboard access is unavailable
  - If the clipboard API is unavailable (e.g., insecure context, restrictive browser policy), the button shows a clear fallback state
  - The component never throws an unhandled error on copy failure

- [ ] **P2**: The component is accessible to assistive technologies
  - The code block is announced to screen readers as a code region
  - The copy button has a descriptive accessible name (e.g., "Copy code to clipboard")
  - Success feedback is communicated to assistive technologies (e.g., via a live region)

## 5. Dependencies

- **Feature dependencies:** None. Code Snippets is a building-block component used by other features.
- **External dependencies:**
  - A syntax-highlighting engine (specific tool defined by `gspec/stack.md`).
  - The browser Clipboard API for copy behavior; no third-party service is required.

## 6. Assumptions & Risks

**Assumptions:**

- All site content is rendered server-side or at build time; syntax highlighting can happen at build time rather than client-side.
- The set of languages the project needs to highlight is bounded and known (at least: shell, JSON, YAML, and the primary languages used in the project).
- Visitors using the site have modern browsers with Clipboard API support.

**Key risks:**

- **Highlighting bundle size.** Some syntax highlighters ship large language grammars that can bloat the build. *Mitigation:* highlight at build time and ship only the rendered HTML/CSS, not the highlighter library, to the client.
- **Copy-button accessibility.** Copy buttons are a common source of inaccessible UI. *Mitigation:* explicit accessible name and live-region feedback are required.
- **Long-line readability.** Very wide code blocks become unreadable when horizontally scrolling. *Mitigation:* horizontal scrolling is per-block, not page-level; consider line-wrapping as a future enhancement.
- **Theme drift.** Syntax-highlight color palettes can diverge from the site's broader design tokens. *Mitigation:* the highlight palette is derived from or aligned with the design system, not chosen ad hoc.

## 7. Success Metrics

1. Every code block on the site renders with consistent styling, syntax highlighting (where a language is declared), and a copy-to-clipboard button.
2. The copy button successfully copies code content to the clipboard in supported browsers, with clear feedback on success.
3. Code blocks containing long lines scroll horizontally without causing page-level horizontal overflow.
4. The component is the single source of code-block markup across the site — no page renders its own bespoke code styling.

## 8. Implementation Context

> This feature PRD is portable and project-agnostic. During implementation, consult the project's `gspec/profile.md` (target users, positioning), `gspec/style.html` (design system), `gspec/stack.md` (technology choices), and `gspec/practices.md` (development standards) to resolve project-specific context.
