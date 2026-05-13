import { describe, expect, it } from 'vitest';
import { withBase, absoluteUrl, isExternal } from '../src/lib/url';

describe('withBase', () => {
  it('returns a leading-slash path unchanged at root base', () => {
    expect(withBase('/about')).toBe('/about');
  });

  it('adds a leading slash to a no-leading-slash path', () => {
    expect(withBase('about')).toBe('/about');
  });

  it('returns the root path with a trailing slash', () => {
    expect(withBase('/')).toBe('/');
  });

  it('leaves in-page anchors unchanged', () => {
    expect(withBase('#section')).toBe('#section');
  });

  it('leaves external https URLs unchanged', () => {
    expect(withBase('https://example.com/foo')).toBe('https://example.com/foo');
  });

  it('leaves external http URLs unchanged', () => {
    expect(withBase('http://example.com/foo')).toBe('http://example.com/foo');
  });

  it('leaves mailto: URLs unchanged', () => {
    expect(withBase('mailto:hi@example.com')).toBe('mailto:hi@example.com');
  });

  it('leaves tel: URLs unchanged', () => {
    expect(withBase('tel:+15555550100')).toBe('tel:+15555550100');
  });
});

describe('absoluteUrl', () => {
  it('builds an absolute URL with host + path', () => {
    expect(absoluteUrl('/about')).toBe('https://maester.baller.software/about');
  });

  it('builds an absolute URL for the root', () => {
    expect(absoluteUrl('/')).toBe('https://maester.baller.software/');
  });

  it('returns external URLs unchanged', () => {
    expect(absoluteUrl('https://example.com/foo')).toBe('https://example.com/foo');
  });
});

describe('isExternal', () => {
  it('flags https URLs as external', () => {
    expect(isExternal('https://example.com')).toBe(true);
  });

  it('flags http URLs as external', () => {
    expect(isExternal('http://example.com')).toBe(true);
  });

  it('flags protocol-relative URLs as external', () => {
    expect(isExternal('//example.com')).toBe(true);
  });

  it('flags mailto: URLs as external', () => {
    expect(isExternal('mailto:hi@example.com')).toBe(true);
  });

  it('flags tel: URLs as external', () => {
    expect(isExternal('tel:+15555550100')).toBe(true);
  });

  it('does not flag site-internal paths as external', () => {
    expect(isExternal('/about')).toBe(false);
    expect(isExternal('about')).toBe(false);
    expect(isExternal('#section')).toBe(false);
  });
});
