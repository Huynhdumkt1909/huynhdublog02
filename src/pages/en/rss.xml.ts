import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPostsByLang, postSlug } from "../../lib/content";
import { siteConfig } from "../../site.config";

export const GET: APIRoute = async (context) => {
  const posts = await getPostsByLang("en");
  return rss({
    title: siteConfig.name,
    description: siteConfig.description.en,
    site: context.site ?? siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.publishedDate,
      link: `/en/blog/${postSlug(post)}`,
    })),
  });
};
