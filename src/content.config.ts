import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().default(''),
			// Hexo publisher 传 `date`，手动写的用 `pubDate`，两者都兼容
			date: z.coerce.date().optional(),
			pubDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}).transform(({ date, pubDate, ...rest }) => ({
			...rest,
			pubDate: pubDate ?? date ?? new Date(),
		})),
});

export const collections = { blog };
