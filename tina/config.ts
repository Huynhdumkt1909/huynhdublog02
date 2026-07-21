import { defineConfig } from "tinacms";

const seoFields = [
  { type: "string", name: "title", label: "SEO title" },
  { type: "string", name: "description", label: "SEO description" },
  { type: "image", name: "ogImage", label: "OG image" },
] as const;

export default defineConfig({
  branch: process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main",
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog",
        path: "src/content/blog",
        format: "md",
        ui: {
          filename: {
            // Editors pick the locale folder (vi/ or en/) as part of the filename
            description: "Đường dẫn dạng vi/ten-bai-viet hoặc en/post-name",
          },
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" }, required: true },
          { type: "image", name: "cover", label: "Cover image" },
          { type: "string", name: "tags", label: "Tags", list: true },
          { type: "string", name: "author", label: "Author" },
          { type: "datetime", name: "publishedDate", label: "Published date", required: true },
          { type: "datetime", name: "updatedDate", label: "Updated date" },
          { type: "boolean", name: "draft", label: "Draft" },
          { type: "object", name: "seo", label: "SEO", fields: [...seoFields] },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
      {
        name: "projects",
        label: "Projects",
        path: "src/content/projects",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" }, required: true },
          { type: "image", name: "cover", label: "Cover image" },
          { type: "string", name: "stack", label: "Tech stack", list: true },
          { type: "string", name: "link", label: "Live link" },
          { type: "string", name: "repo", label: "Repo link" },
          { type: "boolean", name: "featured", label: "Featured on homepage" },
          { type: "number", name: "order", label: "Sort order" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
      {
        name: "pages",
        label: "Pages",
        path: "src/content/pages",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "object", name: "seo", label: "SEO", fields: [...seoFields] },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
});
