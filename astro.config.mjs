// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { visit } from 'unist-util-visit';
import { site } from './src/config/site.ts';

// Astro's `base` prefix is applied by the routing layer and by Astro
// components, but Markdown link nodes are emitted verbatim — so a
// root-absolute href like `/docs/foo` in MDX renders as `/docs/foo`
// in the deployed HTML and 404s under the project-site subpath.
// This remark transform prepends the configured base to every link
// whose URL starts with `/` (and isn't already prefixed, protocol-
// relative, or an in-page fragment).
function remarkBasePath(basePath) {
  const prefix = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
  return () => (tree) => {
    if (!prefix) return;
    visit(tree, 'link', (node) => {
      const url = node.url;
      if (typeof url !== 'string') return;
      if (!url.startsWith('/')) return;
      if (url.startsWith('//')) return;
      if (url === prefix || url.startsWith(prefix + '/')) return;
      node.url = prefix + url;
    });
  };
}

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? site.productionUrl,
  base: process.env.PUBLIC_BASE_PATH ?? site.basePath,
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
      defaultColor: false,
      transformers: [
        // Honors `js {2,4-6}` meta syntax on Markdown/MDX code fences.
        // Per gspec/features/code-snippets.md §4 P1.
        transformerMetaHighlight(),
        transformerNotationHighlight(),
        transformerNotationDiff(),
      ],
    },
    remarkPlugins: [
      remarkBasePath(process.env.PUBLIC_BASE_PATH ?? site.basePath),
    ],
    rehypePlugins: [
      // Every h1/h2/h3/h4 gets a slug-based id. Per
      // gspec/features/documentation-section.md §4 P0.
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['heading-anchor'],
            ariaLabel: 'Copy link to this section',
          },
          content: {
            type: 'element',
            tagName: 'span',
            properties: { 'aria-hidden': 'true' },
            children: [{ type: 'text', value: '#' }],
          },
        },
      ],
    ],
  },
});
