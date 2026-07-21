import type { APIRoute } from "astro";
import { getPostsByLang, postSlug } from "../lib/content";
import { siteConfig } from "../site.config";

export const GET: APIRoute = async () => {
  const viPosts = await getPostsByLang("vi");
  const enPosts = await getPostsByLang("en");

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description.en}`,
    "",
    "This site publishes each article as both a human-readable HTML page and a plain Markdown twin",
    "(append `.md` to any blog post URL) for easier ingestion by AI/LLM crawlers.",
    "",
    "## Blog (Vietnamese)",
    "",
    ...viPosts.map((p) => `- [${p.data.title}](${siteConfig.url}/blog/${postSlug(p)}.md): ${p.data.excerpt}`),
    "",
    "## Blog (English)",
    "",
    ...enPosts.map((p) => `- [${p.data.title}](${siteConfig.url}/en/blog/${postSlug(p)}.md): ${p.data.excerpt}`),
    "",
    "## Other pages",
    "",
    `- [About](${siteConfig.url}/about)`,
    `- [Projects](${siteConfig.url}/projects)`,
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
