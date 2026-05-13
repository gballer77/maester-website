---
name: dark-mode
spec-version: v1
description: Light/dark theme toggle with system preference detection and persistent user choice
---

# Dark Mode

## 1. Overview

**Feature name:** Dark Mode

**Summary:** A site-wide light/dark theme system. The site respects the visitor's operating-system preference by default, exposes a header toggle that lets the visitor override the choice, and remembers that choice across pages and visits.

**Problem being solved:** Many developers work in dark environments and expect dev-tool sites to follow suit. A site that ships only a light theme reads as dated and causes eye strain for visitors who use system-wide dark mode. Conversely, ignoring the system preference and forcing dark on everyone alienates visitors who prefer light. The standard solution is to follow the system, allow override, and persist the override.

This matters now because the theme system shapes the design tokens used by every other feature; retrofitting dark mode after the site has launched is more invasive than building it in from the start.

## 2. Users & Use Cases

**Primary users:** All site visitors, particularly developers whose operating system or terminal is configured for dark mode.

**Key use cases:**

1. A visitor whose operating system is set to dark mode lands on the site for the first time and immediately sees a dark theme without taking any action.
2. A visitor on a dark-mode system prefers the light theme for this particular site, toggles to light via the header, and sees the choice persist on every subsequent page and visit.
3. A visitor opens a deep-linked docs page from a shared URL; the page loads in the correct theme without a visible flash of the opposite theme before the script runs.
4. A visitor changes their system preference between visits; if they have never explicitly set a theme on the site, the site follows the new system preference automatically.

## 3. Scope

**In scope:**

- Detection of the visitor's system preference (light or dark) at first visit.
- A visible toggle control in the site header that switches between light and dark themes.
- Persistent storage of the visitor's explicit choice so it survives navigation and reload.
- A "follow system" mode that defers to the operating system preference.
- A mechanism to prevent a "flash of incorrect theme" on initial page load.
- Light and dark color tokens defined as part of the design system, with both themes available on every page.

**Out of scope:**

- Per-page theme overrides (every page uses the site-wide theme).
- More than two themes (e.g., custom palettes, high-contrast variants).
- Server-side detection or storage of the visitor's preference.
- Theme-aware syntax highlighting of code blocks beyond what the code-block component already provides.
- Theme-aware images (e.g., automatically swapping diagrams between light and dark variants). Images should be theme-neutral or stylable via CSS where feasible.

**Deferred ideas:**

- A high-contrast or "accessibility" theme variant.
- Sepia or solarized custom themes.
- Theme-aware diagram swapping for illustrations and screenshots.
- Animated transitions between themes.
- Auto-switching themes based on time of day.

## 4. Capabilities

- [x] **P0**: The site detects and applies the visitor's system theme preference on first visit
  - On a fresh visit (no stored preference), the site reads the operating system's color-scheme preference
  - The applied theme matches the system preference (light or dark)
  - If the OS preference changes during a session and no explicit choice has been stored, the site updates to match

- [x] **P0**: The header exposes a theme toggle control
  - A theme toggle is visible in the header on every page (provided by `[[site-shell]]`)
  - The toggle is keyboard-accessible with a visible focus indicator
  - The toggle has a descriptive accessible name (e.g., "Toggle theme")
  - The toggle's current state is communicated to assistive technologies

- [x] **P0**: Toggling the theme persists the choice across navigation and reload
  - When the visitor changes the theme via the toggle, the choice is stored locally
  - Subsequent navigations and reloads load the page with the stored choice applied
  - The stored choice persists across browser sessions (subject to standard local-storage retention rules)

- [x] **P0**: Pages load in the correct theme with no visible flash of the wrong theme
  - On initial page load, the document renders in the correct theme before paint
  - There is no perceptible flash of light theme on a dark-preferred device (or vice versa)
  - The mechanism that prevents the flash runs without requiring large client-side JavaScript

- [x] **P0**: Both themes are fully supported across the entire site
  - Every page renders correctly in both themes
  - All design tokens (colors, borders, shadows) have light and dark variants
  - Text contrast meets WCAG AA in both themes
  - Images and visual elements remain legible in both themes (or are explicitly noted as theme-neutral)

- [x] **P1**: The toggle exposes a way to revert to "follow system"
  - The toggle allows the visitor to clear their explicit choice and return to system-preference mode
  - This may be exposed as a third toggle state (light / dark / system) or via a secondary control
  - When in "follow system" mode, no preference is stored locally

- [x] **P2**: The theme system gracefully handles storage restrictions
  - If local storage is unavailable (e.g., private browsing modes that disallow it), the toggle still works for the current page but the choice is not persisted
  - The site does not raise unhandled errors when persistence fails

## 5. Dependencies

- **Feature dependencies:**
  - `[[site-shell]]` — the theme toggle lives in the header defined by the site shell.
- **External dependencies:** Browser support for the `prefers-color-scheme` media query and local storage (universally available in modern browsers).

## 6. Assumptions & Risks

**Assumptions:**

- The design system provides light and dark variants of every color token used on the site.
- Local storage is an acceptable persistence mechanism (no need for cookies or server-side storage).
- Visitors using modern browsers have `prefers-color-scheme` support; legacy fallback is not required.
- Images on the site are either theme-neutral or designed to look acceptable on both light and dark backgrounds.

**Key risks:**

- **Flash of incorrect theme.** The most visible failure mode of a dark-mode implementation. *Mitigation:* the theme is applied via an inline script or stylesheet attribute before the page's main content paints — confirmed by visual inspection on a slow network.
- **Theme-specific images become broken.** Logos, diagrams, or screenshots that look fine on a light background may become illegible on dark. *Mitigation:* explicitly audit every image; for v1, prefer theme-neutral assets, and defer per-theme image swapping.
- **Accessibility regressions.** Dark themes are a common source of low-contrast text. *Mitigation:* WCAG AA contrast is required for both themes — checked in CI where feasible.
- **Storage failure modes.** Private-browsing modes can disable local storage. *Mitigation:* the toggle gracefully degrades — current-page behavior works, persistence fails silently.

## 7. Success Metrics

1. The site loads in the correct theme on first visit based on system preference, with no visible flash of the opposite theme.
2. The theme toggle in the header successfully switches between light and dark on every page.
3. A toggled theme choice persists across navigation and reload in supported browsers.
4. Text contrast meets WCAG AA on every page in both themes.

## 8. Implementation Context

> This feature PRD is portable and project-agnostic. During implementation, consult the project's `gspec/profile.md` (target users, positioning), `gspec/style.html` (design system), `gspec/stack.md` (technology choices), and `gspec/practices.md` (development standards) to resolve project-specific context.
