---
spec-version: v1
---

# Product Profile: Maester Website

## 1. Product Overview

### Product Name
Maester Website — the official online home for the Maester open-source CLI.

### Tagline
The canonical site for Maester: explains what it is, how it works, and how to use it — built for developers and AI-assisted engineering teams.

### Category
Open-source dev-tool project website (marketing landing + documentation hub).

### Product Type
Open source. Companion site to the Maester project, maintained by the same project and released as part of the same effort. Non-commercial.

### Current Stage
Concept / pre-MVP. The Astro + GitHub Pages scaffolding is being put in place; the first landing and about pages will be the initial deliverables, with the docs section following.

---

## 2. Mission & Vision

### Mission Statement
Be the canonical web presence for Maester. Explain what Maester is, why it exists, and how to use it clearly enough that a developer evaluating it on first contact — or an AI agent retrieving the site for context — comes away with an accurate, complete, current picture.

The core problem solved is that an OSS CLI relying solely on a long README sets a low bar: it's hard to scan, hard to share specific concepts from, and easy to overlook the parts that explain *why* the tool exists. A dedicated site gives Maester a coherent narrative, well-structured docs, and a polished first impression.

### Vision Statement
Become the single page (and docs section) that every Maester user — human or AI agent — lands on first. As Maester grows from a single-source-type tool to one that aggregates from Git, hosted document tools, and the web, the website should grow with it, staying the authoritative reference that keeps the project comprehensible at every stage.

---

## 3. Target Audience

### Primary Users
Developers, tech leads, maintainers, and AI-assisted engineering teams who are either evaluating Maester for the first time or actively using it.

Pain points:

- A README on GitHub is the default landing page for most OSS CLIs and is rarely well-suited to communicating a *concept model* (Maester's maester/citadel split needs more than prose to land).
- New users can't tell from a README whether the tool fits their workflow without scrolling through implementation details.
- Existing users need quick, reliable access to CLI flags, configuration schemas, and examples.
- AI agents grounding their context on Maester benefit from a single source of truth at a stable URL.

Goals:

- Decide quickly whether Maester is the right tool for their multi-repo documentation problem.
- Set up their first source repo (a maester) and aggregation repo (a citadel) without trial and error.
- Look up CLI flags and config options as authoritative reference.
- Share deep links to specific concepts when onboarding teammates.

### Secondary Users
- Documentation owners, DX engineers, and platform engineers researching multi-repository documentation tooling.
- AI coding agents retrieving site content to ground their reasoning when assisting human developers with Maester configuration.

These users skim the site rather than walk through it linearly — the structure needs to support both modes.

### Stakeholders
- **Maester's maintainers** — own the tool and the site together; site updates ride alongside tool releases.
- **Open-source contributors** — rely on the site to find clear contribution and governance paths back to the GitHub repo.
- **The Maester community** — both individual adopters and teams who rely on the site staying accurate as they roll Maester out internally.

---

## 4. Value Proposition

### Core Value
One authoritative, well-designed web home for Maester that makes the tool's purpose, architecture, and usage instantly comprehensible — replacing the "scroll through a README on GitHub" first impression with a focused landing page and a structured docs section.

Visitors choose the site over the README because the README cannot be designed for first-impression clarity, conceptual diagramming, multi-page structure, and quick reference lookup all at once.

### Key Benefits
- **Clear positioning in seconds.** A landing page communicates what Maester is and isn't — preventing the most common confusion (it's not a docs platform, not a CMS, not a crawler).
- **Conceptual fluency.** The maester/citadel model gets a dedicated explanation page with diagrams, not just paragraphs.
- **Up-to-date reference.** Getting Started, Configuration, and CLI Reference pages function as the official documentation, kept current with Maester releases.
- **Single stable entry point.** The site is what `npm`, GitHub, and external blog posts link to — one URL to remember, share, and bookmark.
- **AI-agent-ready content.** Pages are structured for retrieval by agents grounding their context, not only for human reading.

### Differentiation
A polished, single-source landing-plus-docs site is rare for early-stage OSS CLIs — most stop at a README until much later. By front-loading a dedicated site, Maester:

- Signals seriousness to evaluators (a real site implies a real project).
- Lets the unusual two-level configuration model (maester sources + citadels) be explained with diagrams rather than prose-only.
- Gives the project a place to grow into examples, recipes, changelogs, and an llms.txt-style agent endpoint without re-platforming.

---

## 5. Product Description

### What It Is
A static website built with Astro and deployed to GitHub Pages. It comprises:

- A **marketing landing page** that introduces Maester, its concept model, and its value proposition, with primary calls-to-action to GitHub and npm.
- An **About page** explaining the project's mission and origin.
- A **Documentation section** covering Concepts (including the maester/citadel model), Getting Started, Configuration, and CLI Reference.
- Standard supporting elements: site navigation, footer, links out to the Maester GitHub repo and npm package.

The site is content-driven: pages and docs are authored in Markdown/MDX and rendered through Astro layouts. It ships zero JavaScript by default. There is no backend, no database, no authenticated content.

### What It Isn't
- **Not Maester itself** — this is the project's web presence, not the CLI.
- **Not an interactive playground or hosted service** — visitors don't run Maester from the site.
- **Not a blog, news feed, or community forum** — community discussion stays on GitHub.
- **Not a commercial offering** — there is nothing to buy or subscribe to.
- **Not a generic "company site"** — the site exists to serve one open-source project, not a portfolio.

---

## 6. Use Cases & Scenarios

### Primary Use Cases
- A developer arrives from a Google search for "documentation aggregation cli" and reads the landing page to decide whether Maester is worth a deeper look.
- A teammate is sent a link to the Concepts page to understand the maester/citadel split before configuring their repo.
- A new adopter follows the Getting Started page step-by-step to set up their first maester and citadel.
- An existing user opens the CLI Reference to look up a flag they've forgotten.
- An AI coding agent retrieves the Configuration page to ground its suggestions when assisting a developer with a maester config file.

### Success Stories
Not applicable — site is at concept stage with no shipped deployment yet.

---

## 7. Market & Competition

OSS-ecosystem framing rather than commercial-market framing.

### Ecosystem Context
The site sits in the landscape of polished OSS dev-tool project websites — peers include the official sites for projects like Astro, Vite, Bun, Biome, and Turborepo. The bar these projects set is the implicit standard: a developer evaluating a new dev tool now expects more than a GitHub README. A dedicated site has become table stakes for OSS tools that want to be taken seriously.

Demand is reinforced by AI-assisted engineering workflows: agents that retrieve documentation perform better when content lives at stable, well-structured URLs rather than scattered across READMEs and gists.

### Alternatives & Comparable Approaches
- **The Maester GitHub README** — the default fallback. Easiest to maintain but worst for first-impression clarity.
- **The npm package page** — search-driven, minimal styling, limited to one block of prose.
- **Third-party blog posts and tutorials** — fragmented, often dated, uncurated.
- **README-rendered subpages on GitHub** — slightly better than one long README but still not designed for marketing/discovery.

The website fills the gap between these — one canonical, well-designed entry point that covers both first-impression marketing and structured reference documentation.

---

## 8. Business Model

Not applicable — this is the website for an open-source project with no commercial model. There is nothing to monetize and no customer acquisition funnel.

### Sustainability & Governance
- **Hosting cost:** zero. Served from GitHub Pages free tier; static assets only.
- **Maintainership:** owned by the Maester maintainers as part of the project. Site changes ship alongside Maester releases.
- **Contribution model:** mirrors Maester's own — PRs welcome, content changes go through the same review process as code changes.
- **Domain:** to be defined. Until a custom domain is configured, the site is served from its GitHub Pages project URL.

---

## 9. Brand & Positioning

### Brand Personality
Inherits Maester's voice: knowledgeable, steady, pragmatic, developer-friendly. There is a light thematic identity around "knowledge / aggregation / citadel" (the project's metaphor), but the theme must not obscure the tool's purpose or read as gimmicky. Visual style is clean, modern, and technology-forward — matching the existing `gspec/style.html` direction.

Tone is direct and confident without being marketing-y. Avoid superlatives ("revolutionary", "ultimate"). Lead with concrete capabilities and a clear concept model.

### Positioning Statement
For developers and AI-assisted engineering teams working across multiple repositories and knowledge sources, the **Maester Website** is the official project home that explains what Maester is, how its source-and-aggregator model works, and how to use it — because adopting an unfamiliar dev tool starts with one page that has to get it right.

### Key Messaging
- "Aggregate documentation across repositories — without taking ownership away from them."
- "Source-owned configuration. Central aggregation. Zero magic."
- "Built for an era of AI-assisted engineering."
- "One command to set up a maester. One command to set up a citadel. The rest is just configuration."

### Elevator Pitch
The Maester Website is the open-source companion site to Maester, a Node CLI that aggregates project documentation from many sources — starting with Git repositories — into a central knowledge home. The site explains the maester/citadel model, walks new users through setup, and serves as the authoritative reference for configuration and CLI usage.

---

## 10. Success Metrics

### Adoption & Engagement Metrics
- Unique visitors to the landing page (sourced from organic search, npm referrals, GitHub README clicks).
- Click-through rate from landing page to GitHub and to npm install commands.
- Page views on documentation pages — especially Getting Started, Configuration, and CLI Reference.
- Average time on the landing page and scroll depth (a useful proxy for "the concept landed").
- Search engine ranking for queries like "maester cli", "documentation aggregation cli", and "multi-repo docs aggregator".

### Business Metrics
Not applicable — non-commercial project.

### Project Health Metrics
- CI/CD pipeline is green on every push to `main`.
- Lighthouse scores remain in the high 90s across performance, accessibility, best practices, and SEO.
- Asset and link-integrity checks pass on every deploy — no broken images, stylesheets, scripts, or in-site links.
- Site content stays in sync with the latest shipped Maester features (no broken `npx` examples, no stale CLI flags in the reference).
- Time from a Maester release to a corresponding site update is short (target: same-day for breaking changes).

---

## 11. Public-Facing Information

### Website Copy Elements
- **Homepage headline:** Maester
- **Homepage subheadline:** Aggregate documentation from many sources into one central knowledge home — built for developers and AI agents.
- **About summary:** Maester is an open-source Node CLI and helper library for teams whose knowledge is spread across multiple sources. Each source (a *maester*) declares its relevant docs, and a *citadel* gathers them into a structured knowledge base that is easier to read, update, and reason over. This site is the project's official home — concepts, setup, configuration, and reference all in one place.
- **Product description (for npm and GitHub):** The official site for Maester. Documents the maester/citadel model, walks new users through setup, and serves as the canonical reference for Maester's CLI and configuration.

### Social Media Presence
Not directly run from the site. The site itself links out to the Maester GitHub and npm pages, and discussion happens there. If a social presence is added later, it would be GitHub- and developer-community-oriented (Mastodon, Bluesky, dev.to) rather than broad consumer channels — consistent with Maester's own communication strategy.

### Press & Media
Not applicable at concept stage. Media kit may become relevant if Maester reaches broader visibility.

---

## 12. Product Roadmap Vision

### Current Focus
- Build out the **landing page**: hero, concept overview (maester + citadel), value proposition, and primary CTAs to GitHub and npm.
- Build out the **About page** with the project's story and mission.
- Establish the foundational layouts, site navigation, footer, and styling consistent with `gspec/style.html`.
- Wire up the GitHub Pages deploy workflow, with correct base-path handling per `gspec/stack.md`.

### Near-Term (Next)
- Add a **Documentation section** with Concepts, Getting Started, Configuration, and CLI Reference pages, sourced from Markdown/MDX content collections.
- Add **concept diagrams** — particularly the maester/citadel relationship — using SVG or static images.
- Add lightweight SEO setup (meta tags, Open Graph, sitemap, robots.txt).
- Add an automated **asset/link integrity check** to CI per the practices document.
- Add an **Examples / Recipes** section showcasing real maester and citadel configurations from open repos.
- Add a **Changelog** page generated from Maester's release notes.
- Add **search** over the docs (client-side index, no hosted search service).

### Long-Term Vision (Later)
- Add an **agent-friendly content endpoint** (e.g., `llms.txt`) so AI agents can ground their context on the site with less retrieval overhead.
- Consider a **custom domain** once one is chosen; remove the GitHub Pages base path at that point.
- Consider **versioned docs** if Maester's CLI or config schema ever introduces breaking changes that warrant maintaining a previous-version reference.

---

## 13. Risks & Assumptions

### Key Assumptions
- The Maester project reaches a usable MVP that warrants a dedicated marketing and documentation site.
- A static site (Astro + GitHub Pages) remains sufficient for projected traffic — no SSR, no backend, no dynamic content needed.
- The audience prefers a dedicated site over the GitHub README for evaluation and reference.
- Site content can be kept current alongside Maester's release cadence — meaning the same maintainers update both, in lockstep.
- AI agents that fetch documentation content benefit meaningfully from a structured site, not just a README.

### Risks
- **Content drift.** As Maester evolves, the site falls behind the CLI — examples break, flags get renamed, the concept model shifts. The site loses credibility.
- **Bus factor.** A single maintainer owns both tool and site; site updates may be deprioritized when Maester development is hot.
- **Concept clarity.** If the maester/citadel split doesn't land clearly on the landing page, the site fails its primary job and visitors bounce to alternatives.
- **Base-path fragility.** GitHub Pages project-site base paths are an easy source of broken asset URLs; a misstep can ship a 404-ridden site.
- **Domain decision deferred.** Operating indefinitely on a `github.io` URL caps perceived credibility and complicates branding.

### Mitigation Strategies
- **Couple site updates to Maester releases.** Treat a site update as part of the release checklist for any breaking or user-visible change.
- **CI guardrails.** Build verification and asset/link integrity checks (per `gspec/practices.md`) block obvious regressions before deploy. Lighthouse audits are monitored as a project health signal (see Success Metrics) but are not a blocking step.
- **Examples sourced from real fixtures.** Wherever possible, the docs use example configs drawn from Maester's own test fixtures so they can't drift silently.
- **Diagrams + prose for concepts.** The maester/citadel model gets both a diagram and an explanation — neither alone is sufficient for first-time understanding.
- **Base-path discipline.** Internal links and assets are always prefixed via `import.meta.env.BASE_URL` per the stack document, so a domain switch is a one-config-line change.
- **Plan for a custom domain early.** Once Maester is published to npm and reaches a stable name, decide on a domain and migrate before too much content accumulates and base-path references multiply.
