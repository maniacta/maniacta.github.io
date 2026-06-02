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
			// 兼容旧 Hexo publisher（date）和 Astro 原生（pubDate）
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
