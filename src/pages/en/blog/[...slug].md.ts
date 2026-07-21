import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { postSlug } from "../../../lib/content";

export async function getStaticPaths() {
  const posts = await getCollection("blog", (entry) => entry.id.startsWith("en/") && !entry.data.draft);
  return posts.map((post) => ({
    params: { slug: postSlug(post) },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: Awaited<ReturnType<typeof getCollection<"blog">>>[number] };
  const front = [
    `title: ${post.data.title}`,
    `description: ${post.data.excerpt}`,
    `published: ${post.data.publishedDate.toISOString().slice(0, 10)}`,
    `tags: ${post.data.tags.join(", ")}`,
    `source_url: https://huynhdu.info/en/blog/${postSlug(post)}`,
  ].join("\n");

  const markdown = `---\n${front}\n---\n\n# ${post.data.title}\n\n${post.body}\n`;

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
