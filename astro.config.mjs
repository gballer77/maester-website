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
import { site } from './src/config/site.ts';

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
  },
});
