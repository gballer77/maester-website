// Single source of truth for site identity, URLs, and outbound link targets.
// Every page, layout, and component that needs a project-identity value
// imports from here. A change is one edit, not many.
//
// Per gspec/architecture.md §3 and §9 (Technical Gap Analysis).

export const site = {
  name: 'Maester',
  tagline: 'The canonical home for the Maester open-source CLI.',
  description:
    'Aggregate documentation from many sources into one central knowledge home — built for developers and AI agents.',

  // Production hosting (GitHub Pages project site).
  // `productionUrl` is the origin only, per Astro's `site` config convention.
  // `basePath` is the project-site subpath. Together they form the canonical
  // URL: productionUrl + basePath + route. See astro.config.mjs.
  productionUrl: 'https://baller-software.github.io',
  basePath: '/maester-website',

  // This website's source repository.
  websiteRepoUrl: 'https://github.com/baller-software/maester-website',

  // The Maester CLI's source and distribution. The dot in the npm scope
  // mirrors the org's domain (baller.software); the GitHub org uses the
  // hyphenated form because GitHub org names cannot contain dots.
  cliRepoUrl: 'https://github.com/baller-software/maester',
  cliIssuesUrl: 'https://github.com/baller-software/maester/issues',
  cliDiscussionsUrl: 'https://github.com/baller-software/maester/discussions',
  cliRegistryUrl: 'https://www.npmjs.com/package/@baller.software/maester',
  cliPackageName: '@baller.software/maester',
  installCommand: 'npm install -g @baller.software/maester',

  // Default Open Graph image. Resolved through withBase() at emit time.
  // TODO: replace placeholder with a designed 1200×630 asset before
  //       public promotion (see gspec/architecture.md §9.10).
  defaultOgImage: '/og-default.png',

  // Top-level navigation order. Active state in PrimaryNav.astro matches
  // the longest prefix of Astro.url.pathname against each item's href.
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
    { label: 'Examples', href: '/examples' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'About', href: '/about' },
  ],

  maintainer: {
    name: 'Baller Software',
    url: 'https://github.com/baller-software',
    governance:
      'Maintained by Baller Software as part of its open-source work; contributions welcome through the source repository.',
  },
} as const;

export type SiteConfig = typeof site;
export type NavItem = (typeof site.nav)[number];
