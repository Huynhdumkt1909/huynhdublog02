import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      cover: image().optional(),
      tags: z.array(z.string()).default([]),
      author: z.string().default("Huynh Du"),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      draft: z.boolean().default(false),
      seo: seoSchema.optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      cover: image().optional(),
      stack: z.array(z.string()).default([]),
      link: z.string().url().optional(),
      repo: z.string().url().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    seo: seoSchema.optional(),
  }),
});

export const collections = { blog, projects, pages };
