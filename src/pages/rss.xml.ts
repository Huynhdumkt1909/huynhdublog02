import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getPostsByLang, postSlug } from "../lib/content";
import { siteConfig } from "../site.config";

export const GET: APIRoute = async (context) => {
  const posts = await getPostsByLang("vi");
  return rss({
    title: siteConfig.name,
    description: siteConfig.description.vi,
    site: context.site ?? siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.publishedDate,
      link: `/blog/${postSlug(post)}`,
    })),
  });
};
