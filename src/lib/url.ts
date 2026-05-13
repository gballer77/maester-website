// Base-path-aware URL helpers.
//
// Per gspec/stack.md §14: every internal href/src must be prefixed with
// import.meta.env.BASE_URL. Centralize the logic so a domain switch is
// a single config change.

import { site } from '../config/site';

/**
 * Strip any trailing slash. Used to normalize base/production URLs before
 * concatenation so we don't produce double slashes.
 */
function stripTrailing(value: string): string {
  return value.replace(/\/+$/, '');
}

/**
 * Strip leading slashes. Used to normalize a path segment before joining
 * with a base.
 */
function stripLeading(value: string): string {
  return value.replace(/^\/+/, '');
}

/**
 * Resolve the runtime base path.
 *
 * Astro exposes the build-time base as import.meta.env.BASE_URL. We prefer
 * it when it carries meaningful content (i.e., something other than the
 * trivial '/') because that path captures any PUBLIC_BASE_PATH override
 * passed to astro.config.mjs at build time. When the env value is absent
 * or the trivial '/', we fall back to the configured site.basePath so
 * helpers remain testable in plain Node (Vitest sets BASE_URL to '/'
 * by default).
 */
function resolveBase(): string {
  // @ts-expect-error import.meta.env is provided by Vite/Astro at build time
  const fromEnv = typeof import.meta !== 'undefined' ? import.meta.env?.BASE_URL : undefined;
  const raw = (fromEnv && fromEnv !== '/' ? fromEnv : (site.basePath ?? '/')) as string;
  return raw === '/' ? '' : stripTrailing(raw);
}

/**
 * Prefix an in-site path with the project's base path.
 *
 * The site is currently served at the custom-domain root (basePath '/'),
 * so the prefix is empty and these helpers normalize leading slashes only.
 * The implementation still honors a non-trivial base, so the same code keeps
 * working if the deploy ever moves back to a project-site subpath.
 *
 * @example
 *   withBase('/about')        // → '/about'
 *   withBase('about')         // → '/about'
 *   withBase('/')             // → '/'
 *   withBase('#section')      // → '#section' (in-page anchor, unchanged)
 *   withBase('https://x.com') // → 'https://x.com' (external, unchanged)
 */
export function withBase(pathOrUrl: string): string {
  if (!pathOrUrl) return pathOrUrl;
  if (isExternal(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith('#')) return pathOrUrl;
  if (pathOrUrl.startsWith('mailto:') || pathOrUrl.startsWith('tel:')) return pathOrUrl;

  const base = resolveBase();

  // Idempotent — when the input already begins with the base path (for
  // example, `Astro.url.pathname` on a built page), don't prefix again.
  if (base && (pathOrUrl === base || pathOrUrl === base + '/' || pathOrUrl.startsWith(base + '/'))) {
    return pathOrUrl;
  }

  const cleanPath = stripLeading(pathOrUrl);
  if (cleanPath === '') {
    // base only — keep a trailing slash for the root
    return base === '' ? '/' : `${base}/`;
  }
  return `${base}/${cleanPath}`;
}

/**
 * Build an absolute URL pointing at the production host. Used for canonical
 * URLs, OG/Twitter image tags, sitemap entries.
 *
 * @example
 *   absoluteUrl('/about')
 *   // → 'https://maester.baller.software/about'
 */
export function absoluteUrl(pathOrUrl: string): string {
  if (isExternal(pathOrUrl)) return pathOrUrl;
  const host = stripTrailing(site.productionUrl);
  const prefixed = withBase(pathOrUrl);
  // withBase returns a path beginning with '/'; concatenate with host.
  return `${host}${prefixed.startsWith('/') ? prefixed : `/${prefixed}`}`;
}

/**
 * True iff a URL points outside the site (different host) or uses a
 * non-http(s) scheme (mailto:, tel:, etc.).
 */
export function isExternal(value: string): boolean {
  if (!value) return false;
  return /^([a-z]+:)?\/\//i.test(value) || /^(mailto|tel):/i.test(value);
}
