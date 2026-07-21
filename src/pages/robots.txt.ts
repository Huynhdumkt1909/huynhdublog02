import type { APIRoute } from "astro";
import { siteConfig } from "../site.config";

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${siteConfig.url}/sitemap-index.xml
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
