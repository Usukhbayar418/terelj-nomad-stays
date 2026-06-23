// Lightweight markdown-based blog. Posts live in content/blog/*.md
// with YAML frontmatter (title, date, description, image, ...).
//
// Posts are pre-compiled into a TypeScript module
// (lib/blog-data.generated.ts) by scripts/build-blog-data.mjs, which
// runs automatically before every "npm run build". This way the
// posts are bundled as code and work everywhere — including
// Cloudflare Workers, which cannot read arbitrary project files at
// build time inside the Next.js render phase.

import { BLOG_POSTS, type GeneratedPost } from "./blog-data.generated";

export type PostMeta = Omit<GeneratedPost, "content">;
export type Post = GeneratedPost;

export function getAllPosts(): PostMeta[] {
  return BLOG_POSTS.map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function formatPostDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
