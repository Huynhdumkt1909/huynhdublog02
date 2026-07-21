import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "../i18n/ui";

export async function getPostsByLang(lang: Lang): Promise<CollectionEntry<"blog">[]> {
  const posts = await getCollection("blog", (entry) => {
    const [entryLang] = entry.id.split("/");
    return entryLang === lang && !entry.data.draft;
  });
  return posts.sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());
}

export async function getPostBySlug(lang: Lang, slug: string) {
  const posts = await getCollection("blog", (entry) => {
    const [entryLang, ...rest] = entry.id.split("/");
    return entryLang === lang && rest.join("/").replace(/\.mdx?$/, "") === slug;
  });
  return posts[0];
}

export function postSlug(entry: CollectionEntry<"blog">) {
  const [, ...rest] = entry.id.split("/");
  return rest.join("/").replace(/\.mdx?$/, "");
}

export function readingTime(body: string) {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getAllProjects(): Promise<CollectionEntry<"projects">[]> {
  const projects = await getCollection("projects");
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getPageByLang(lang: Lang, slug: string) {
  const pages = await getCollection("pages", (entry) => {
    const [entryLang, entrySlug] = entry.id.split("/");
    return entryLang === lang && entrySlug.replace(/\.mdx?$/, "") === slug;
  });
  return pages[0];
}
