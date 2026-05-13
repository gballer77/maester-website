// Astro Content Collections schema definitions.
// Per gspec/architecture.md §3 (Data Model).
//
// Two collections:
//   - docs:     Markdown/MDX documentation pages, grouped + ordered for sidebar
//   - examples: Curated configuration/usage examples, grouped by category

import { z, defineCollection } from 'astro:content';

// Closed set of example categories. Adding a new category requires editing
// this enum. This is intentional — per gspec/features/examples-page.md §6
// "Category proliferation". The build will fail at content-validation time
// if an example references an unknown category.
export const EXAMPLE_CATEGORIES = [
  'Setup',
  'Configuration',
  'CI',
  'Recipes',
  'Advanced',
] as const;

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    // Sidebar group name. Defaults to the parent directory (in Title Case)
    // or 'Reference' for root-level entries. Resolved in Sidebar.astro.
    group: z.string().optional(),
    // Ascending sort within group. Ties broken by title.
    order: z.number().int().nonnegative().default(999),
  }),
});

const examples = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    categories: z.array(z.enum(EXAMPLE_CATEGORIES)).min(1),
    link: z.string().url(),
  }),
});

export const collections = { docs, examples };
