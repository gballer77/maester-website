// Slug generation helper.
//
// Used by:
//   - the changelog page (Phase 7), where versions like `1.2.0` become
//     `v1-2-0` anchor ids
//   - the docs MDX pipeline, where rehype-slug handles headings — this
//     helper provides a single place to canonicalize any string that
//     needs to become a URL fragment
//
// Heading id generation in MDX is delegated to rehype-slug, which uses
// github-slugger. For non-MDX surfaces we want predictable behavior
// without reaching into that dependency, hence this small helper.

/**
 * Convert an arbitrary string to a URL-safe slug.
 *
 * Lower-cased; non-alphanumerics collapsed to single hyphens; leading/
 * trailing hyphens stripped.
 */
export function slugify(input: string): string {
  return String(input)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '') // strip combining diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Slugify with collision-aware suffix appending. The first occurrence of
 * a slug uses the bare form; subsequent occurrences append `-2`, `-3`, …
 * The caller passes a Set of slugs already seen on the current page and
 * gets back a unique slug. The Set is mutated.
 *
 * Returns `{ slug, collided }` so the caller can emit a build-time
 * warning when a collision happens — collisions hint at duplicate
 * headings that authors may want to disambiguate.
 */
export function uniqueSlug(
  input: string,
  seen: Set<string>,
): { slug: string; collided: boolean } {
  const base = slugify(input) || 'section';
  if (!seen.has(base)) {
    seen.add(base);
    return { slug: base, collided: false };
  }
  let n = 2;
  while (seen.has(`${base}-${n}`)) n++;
  const final = `${base}-${n}`;
  seen.add(final);
  return { slug: final, collided: true };
}

/**
 * Anchor id for a semver release. Replaces dots with hyphens and prefixes
 * `v` so the id is a valid CSS selector and stable across builds.
 *
 * @example
 *   versionAnchor('1.2.0')        // 'v1-2-0'
 *   versionAnchor('1.0.0-beta.1') // 'v1-0-0-beta-1'
 */
export function versionAnchor(version: string): string {
  const cleaned = version.replace(/^v/i, '');
  return 'v' + cleaned.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
}
