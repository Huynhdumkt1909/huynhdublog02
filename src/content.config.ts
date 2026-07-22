import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  // cover là string thường (không dùng image()): TinaCMS media upload ghi đường dẫn
  // public tuyệt đối "/uploads/..", còn image() của Astro cố resolve theo đường dẫn
  // tương đối tới file markdown nên sẽ build fail khi editor upload ảnh cover.
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    author: z.string().default("Huỳnh Dự"),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    // liên kết bài viết vi/en tương ứng với nhau, dùng cho LangSwitch + hreflang
    translationKey: z.string().optional(),
    seo: seoSchema.optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cover: z.string().optional(),
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
