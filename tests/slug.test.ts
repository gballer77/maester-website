import { describe, expect, it } from 'vitest';
import { slugify, uniqueSlug, versionAnchor } from '../src/lib/slug';

describe('slugify', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('Getting Started')).toBe('getting-started');
  });

  it('collapses multiple non-alphanumeric characters to a single hyphen', () => {
    expect(slugify('Maester / Citadel — Model')).toBe('maester-citadel-model');
  });

  it('strips leading and trailing hyphens', () => {
    expect(slugify('  hello world!  ')).toBe('hello-world');
  });

  it('removes diacritics', () => {
    expect(slugify('Café résumé')).toBe('cafe-resume');
  });

  it('keeps numbers', () => {
    expect(slugify('Section 2.5 — Notes')).toBe('section-2-5-notes');
  });

  it('returns an empty string for non-alphanumeric-only input', () => {
    expect(slugify('!!!---')).toBe('');
  });
});

describe('uniqueSlug', () => {
  it('returns the bare slug on first occurrence', () => {
    const seen = new Set<string>();
    expect(uniqueSlug('Hello', seen)).toEqual({ slug: 'hello', collided: false });
    expect(seen.has('hello')).toBe(true);
  });

  it('appends a numeric suffix on collision', () => {
    const seen = new Set<string>();
    uniqueSlug('Hello', seen);
    expect(uniqueSlug('Hello', seen)).toEqual({ slug: 'hello-2', collided: true });
    expect(uniqueSlug('Hello', seen)).toEqual({ slug: 'hello-3', collided: true });
  });

  it('falls back to "section" when input has no alphanumerics', () => {
    const seen = new Set<string>();
    expect(uniqueSlug('!!!---', seen)).toEqual({ slug: 'section', collided: false });
    expect(uniqueSlug('???', seen)).toEqual({ slug: 'section-2', collided: true });
  });
});

describe('versionAnchor', () => {
  it('replaces dots with hyphens and prefixes v', () => {
    expect(versionAnchor('1.2.0')).toBe('v1-2-0');
  });

  it('strips a leading v before re-applying the canonical prefix', () => {
    expect(versionAnchor('v3.4.5')).toBe('v3-4-5');
  });

  it('handles pre-release versions', () => {
    expect(versionAnchor('1.0.0-beta.1')).toBe('v1-0-0-beta-1');
  });

  it('handles a date-based version', () => {
    expect(versionAnchor('2026.05.13')).toBe('v2026-05-13');
  });
});
