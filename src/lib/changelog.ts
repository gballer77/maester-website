// CHANGELOG.md parser.
//
// Reads a Keep-a-Changelog-formatted document and returns a structured
// list of releases, newest first.
//
// Per gspec/features/changelog-page.md §4 and gspec/architecture.md §3:
//   - releases are H2 lines of the shape `## [version] - YYYY-MM-DD`
//   - categories are H3 lines (Added | Changed | Fixed | Removed |
//     Deprecated | Security)
//   - bullet items under a category are the actual changes
//   - `[Unreleased]` sections are tolerated but excluded from the page
//   - releaseType is derived by comparing each version to the previous
//     entry (major / minor / patch)
//
// The parser is intentionally simple — string-walking rather than a full
// markdown AST — because the format is constrained.

import { versionAnchor } from './slug';

export const CHANGELOG_CATEGORIES = [
  'Added',
  'Changed',
  'Fixed',
  'Removed',
  'Deprecated',
  'Security',
] as const;

export type ChangelogCategory = (typeof CHANGELOG_CATEGORIES)[number];
export type ReleaseType = 'major' | 'minor' | 'patch';

export interface ChangeEntry {
  category: ChangelogCategory;
  text: string;
}

export interface ChangelogEntry {
  version: string;
  date: string; // YYYY-MM-DD
  anchorId: string;
  releaseType: ReleaseType;
  changes: ChangeEntry[];
}

const RELEASE_HEADING_RE = /^##\s+\[([^\]]+)\](?:\s*-\s*(\d{4}-\d{2}-\d{2}))?\s*$/;
const CATEGORY_HEADING_RE = /^###\s+(.+?)\s*$/;
const BULLET_RE = /^\s*[-*]\s+(.+?)\s*$/;
const SEMVER_RE = /^(\d+)\.(\d+)\.(\d+)(?:[-.+].*)?$/;

interface ParsedVersion {
  major: number;
  minor: number;
  patch: number;
}

function parseSemver(version: string): ParsedVersion | null {
  const m = SEMVER_RE.exec(version.replace(/^v/i, ''));
  if (!m) return null;
  return { major: Number(m[1]), minor: Number(m[2]), patch: Number(m[3]) };
}

/**
 * Compare two semver versions and return the bump kind from `prev` to `next`.
 * Falls back to `'patch'` when either side is non-semver-parseable so a
 * tag like `2026-05-13` doesn't blow up the build.
 */
function releaseType(next: string, prev?: string): ReleaseType {
  const a = parseSemver(next);
  const b = prev ? parseSemver(prev) : null;
  if (!a) return 'major';
  if (!b) return 'major';
  if (a.major !== b.major) return 'major';
  if (a.minor !== b.minor) return 'minor';
  return 'patch';
}

/**
 * Parse a CHANGELOG.md string into a list of release entries, newest first.
 *
 * Throws on malformed input — missing date, unknown category, malformed
 * version — per gspec/features/changelog-page.md §4 P0 "Build fails with
 * a clear error if a release entry is malformed".
 */
export function parseChangelog(source: string): ChangelogEntry[] {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const releases: ChangelogEntry[] = [];

  let current: ChangelogEntry | null = null;
  let currentCategory: ChangelogCategory | null = null;
  let lineNo = 0;

  for (const line of lines) {
    lineNo++;
    const releaseMatch = RELEASE_HEADING_RE.exec(line);
    if (releaseMatch) {
      const [, rawVersion, rawDate] = releaseMatch;

      // Tolerate but skip [Unreleased] sections.
      if (rawVersion.toLowerCase() === 'unreleased') {
        current = null;
        currentCategory = null;
        continue;
      }

      if (!rawDate) {
        throw new Error(
          `CHANGELOG.md line ${lineNo}: release "[${rawVersion}]" is missing its date. ` +
            `Expected format: "## [version] - YYYY-MM-DD".`,
        );
      }

      if (current) releases.push(current);
      current = {
        version: rawVersion,
        date: rawDate,
        anchorId: versionAnchor(rawVersion),
        releaseType: 'major', // resolved in a second pass once order is known
        changes: [],
      };
      currentCategory = null;
      continue;
    }

    const categoryMatch = CATEGORY_HEADING_RE.exec(line);
    if (categoryMatch) {
      const name = categoryMatch[1].trim();
      if (!current) {
        // H3 outside any release — likely doc prose; tolerate.
        currentCategory = null;
        continue;
      }
      if (!CHANGELOG_CATEGORIES.includes(name as ChangelogCategory)) {
        throw new Error(
          `CHANGELOG.md line ${lineNo}: unknown category "${name}". ` +
            `Expected one of: ${CHANGELOG_CATEGORIES.join(', ')}.`,
        );
      }
      currentCategory = name as ChangelogCategory;
      continue;
    }

    const bulletMatch = BULLET_RE.exec(line);
    if (bulletMatch && current && currentCategory) {
      current.changes.push({ category: currentCategory, text: bulletMatch[1] });
    }
    // Other lines (paragraphs, blank lines, top H1) are ignored.
  }

  if (current) releases.push(current);

  // Walk newest → oldest as authored in the file (Keep-a-Changelog convention).
  // Set releaseType based on the *previous* (older) version in the file.
  for (let i = 0; i < releases.length; i++) {
    const prev = releases[i + 1]?.version;
    releases[i].releaseType = releaseType(releases[i].version, prev);
  }

  // Detect anchor-id collisions (extremely unlikely with unique versions,
  // but the PRD calls them out as a risk).
  const seenAnchors = new Set<string>();
  for (const r of releases) {
    if (seenAnchors.has(r.anchorId)) {
      throw new Error(
        `CHANGELOG.md: two releases produce the same anchor id "${r.anchorId}". ` +
          `Check for duplicate or near-duplicate version strings.`,
      );
    }
    seenAnchors.add(r.anchorId);
  }

  return releases;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Bold, italic, and links within a run of text that contains no code spans. */
function renderEmphasis(text: string): string {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, href: string) =>
      /^(https?:|\/|#|mailto:)/i.test(href) ? `<a href="${href}">${label}</a>` : label,
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^\w*])\*(?!\s)(.+?)\*(?!\w)/g, '$1<em>$2</em>')
    .replace(/(^|[^\w])_(?!\s)(.+?)_(?!\w)/g, '$1<em>$2</em>');
}

/**
 * Render a change bullet's inline Markdown (code spans, bold, italic, links)
 * to HTML. Changelog bullets are authored as one-line Markdown, so this
 * covers the inline subset only; all text is HTML-escaped first.
 *
 * Code spans are cut out before emphasis is applied so `*` or `_` inside
 * code never turns into markup, while bold may still wrap a code span
 * (e.g. **`maester publish`**).
 */
export function renderInlineMarkdown(text: string): string {
  const codeSpans: string[] = [];
  const withPlaceholders = text.replace(/`([^`]+)`/g, (_, code: string) => {
    codeSpans.push(`<code>${escapeHtml(code)}</code>`);
    return `\u0000${codeSpans.length - 1}\u0000`;
  });
  return renderEmphasis(withPlaceholders).replace(
    /\u0000(\d+)\u0000/g,
    (_, i: string) => codeSpans[Number(i)],
  );
}

/** Summaries longer than this fall back to the bullet's bold lead. */
const MAX_SUMMARY_LENGTH = 100;

/**
 * Split a change bullet into a terse one-line summary and the remaining
 * detail. The page shows the summary and tucks the detail behind a
 * disclosure, so CHANGELOG.md can stay verbose while the page stays
 * scannable.
 *
 * The summary ends at the first sentence break — `.`, `;` or `:` followed
 * by whitespace, a spaced em dash, or a comma that closes a bold span —
 * ignoring anything inside code spans or parentheses (so "e.g. foo" in a
 * parenthetical doesn't split). A closing `**` right after the break stays
 * with the summary, so `**Config editing verbs.** ...` summarizes as the
 * bold lead. If that first sentence is still long and the bullet opens with
 * a bold lead, the bold lead alone is used.
 */
export function splitChange(text: string): { summary: string; detail: string } {
  const split = splitAtFirstBreak(text);
  if (split.summary.length <= MAX_SUMMARY_LENGTH) return split;
  const lead = /^\*\*(.+?)\*\*\s*/.exec(text);
  if (!lead) return split;
  return {
    summary: `**${lead[1].replace(/[.;:,]$/, '')}**`,
    detail: text.slice(lead[0].length).replace(/^[—:]\s*/, ''),
  };
}

function splitAtFirstBreak(text: string): { summary: string; detail: string } {
  let inCode = false;
  let parens = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '`') inCode = !inCode;
    if (inCode) continue;
    if (ch === '(') parens++;
    else if (ch === ')') parens = Math.max(0, parens - 1);
    if (parens > 0) continue;

    if (text.startsWith(' — ', i)) {
      return { summary: text.slice(0, i), detail: text.slice(i + 3).trim() };
    }
    const closesBold = text.startsWith('**', i + 1);
    const isBreak = ch === '.' || ch === ';' || ch === ':' || (ch === ',' && closesBold);
    if (!isBreak) continue;
    const end = i + 1 + (closesBold ? 2 : 0);
    if (end !== text.length && !/\s/.test(text[end])) continue;
    return {
      summary: text.slice(0, i) + (closesBold ? '**' : ''),
      detail: text.slice(end).trim(),
    };
  }
  return { summary: text, detail: '' };
}
