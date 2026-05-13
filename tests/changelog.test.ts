import { describe, expect, it } from 'vitest';
import { parseChangelog, CHANGELOG_CATEGORIES } from '../src/lib/changelog';

const TWO_RELEASE_DOC = `
# Changelog

## [0.2.0] - 2026-05-12
### Added
- New thing
- Another new thing
### Fixed
- Old thing

## [0.1.0] - 2026-04-01
### Added
- Initial version
`;

describe('parseChangelog', () => {
  it('parses releases in source order (newest first by Keep-a-Changelog convention)', () => {
    const entries = parseChangelog(TWO_RELEASE_DOC);
    expect(entries).toHaveLength(2);
    expect(entries[0].version).toBe('0.2.0');
    expect(entries[1].version).toBe('0.1.0');
  });

  it('extracts version, date, and anchorId for each release', () => {
    const [first, second] = parseChangelog(TWO_RELEASE_DOC);
    expect(first.date).toBe('2026-05-12');
    expect(first.anchorId).toBe('v0-2-0');
    expect(second.date).toBe('2026-04-01');
    expect(second.anchorId).toBe('v0-1-0');
  });

  it('groups changes under their category headings', () => {
    const [first] = parseChangelog(TWO_RELEASE_DOC);
    expect(first.changes).toEqual([
      { category: 'Added', text: 'New thing' },
      { category: 'Added', text: 'Another new thing' },
      { category: 'Fixed', text: 'Old thing' },
    ]);
  });

  it('derives releaseType by comparing to the previous version', () => {
    const doc = `
## [1.0.1] - 2026-05-10
### Fixed
- a

## [1.0.0] - 2026-04-01
### Added
- a

## [0.9.0] - 2026-03-01
### Added
- a
`;
    const entries = parseChangelog(doc);
    expect(entries[0].releaseType).toBe('patch'); // 1.0.1 vs 1.0.0
    expect(entries[1].releaseType).toBe('major'); // 1.0.0 vs 0.9.0
    expect(entries[2].releaseType).toBe('major'); // oldest defaults to major
  });

  it('omits an [Unreleased] section without failing', () => {
    const doc = `
# Changelog

## [Unreleased]
### Added
- Work in progress

## [1.0.0] - 2026-04-01
### Added
- Done
`;
    const entries = parseChangelog(doc);
    expect(entries).toHaveLength(1);
    expect(entries[0].version).toBe('1.0.0');
  });

  it('throws when a release is missing its date', () => {
    const doc = `
## [1.0.0]
### Added
- thing
`;
    expect(() => parseChangelog(doc)).toThrow(/missing its date/);
  });

  it('throws when a category heading is unknown', () => {
    const doc = `
## [1.0.0] - 2026-04-01
### Maintenance
- not a real category
`;
    expect(() => parseChangelog(doc)).toThrow(/unknown category "Maintenance"/);
  });

  it('returns an empty array for a CHANGELOG with no releases', () => {
    const doc = `
# Changelog

All notable changes go here.

The format is Keep-a-Changelog.
`;
    expect(parseChangelog(doc)).toEqual([]);
  });

  it('returns an empty array for a CHANGELOG with only an [Unreleased] block', () => {
    const doc = `
## [Unreleased]
### Added
- not shipped yet
`;
    expect(parseChangelog(doc)).toEqual([]);
  });

  it('tolerates the H1 title line and intro prose', () => {
    const doc = `
# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com).

## [1.0.0] - 2026-04-01
### Added
- thing
`;
    const entries = parseChangelog(doc);
    expect(entries).toHaveLength(1);
    expect(entries[0].changes).toEqual([{ category: 'Added', text: 'thing' }]);
  });

  it('handles a non-semver tag (date-based version) gracefully', () => {
    const doc = `
## [2026.05.10] - 2026-05-10
### Changed
- thing
`;
    const entries = parseChangelog(doc);
    expect(entries[0].version).toBe('2026.05.10');
    expect(entries[0].anchorId).toBe('v2026-05-10');
    expect(entries[0].releaseType).toBe('major');
  });

  it('accepts every documented category', () => {
    const body = CHANGELOG_CATEGORIES.map(
      (c) => `### ${c}\n- ${c.toLowerCase()} item`,
    ).join('\n');
    const doc = `## [1.0.0] - 2026-04-01\n${body}`;
    const entries = parseChangelog(doc);
    expect(entries[0].changes.map((c) => c.category)).toEqual([...CHANGELOG_CATEGORIES]);
  });

  it('throws when two releases would collide on the same anchorId', () => {
    // Two versions that slugify to the same id (extremely unusual).
    const doc = `
## [1.0.0] - 2026-04-02
### Added
- a

## [1-0-0] - 2026-04-01
### Added
- a
`;
    expect(() => parseChangelog(doc)).toThrow(/anchor id "v1-0-0"/);
  });
});
