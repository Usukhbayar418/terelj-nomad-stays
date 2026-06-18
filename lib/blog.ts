// Lightweight markdown-based blog. Posts live in content/blog/*.md
// with YAML frontmatter (title, date, description, image, ...).
// We read them at build time so there is no database or CMS needed.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date "2026-05-01"
  image: string; // hero image URL
  imageAlt?: string;
  author?: string;
  readingTime?: string; // e.g. "8 min read"
  tags?: string[];
};

export type Post = PostMeta & {
  content: string; // raw markdown body
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readPostFile(filename: string): Post | null {
  if (!filename.endsWith(".md") && !filename.endsWith(".mdx")) return null;
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const slug = filename.replace(/\.mdx?$/, "");

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? new Date().toISOString().slice(0, 10)),
    image: String(data.image ?? ""),
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    author: data.author ? String(data.author) : "Nomad Riverside Stay Terelj",
    readingTime: data.readingTime ? String(data.readingTime) : estimateReadingTime(content),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
  };
}

function estimateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / wordsPerMinute));
  return `${minutes} min read`;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .map(readPostFile)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts.map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(BLOG_DIR)) return null;
  const candidates = [`${slug}.md`, `${slug}.mdx`];
  for (const filename of candidates) {
    const fullPath = path.join(BLOG_DIR, filename);
    if (fs.existsSync(fullPath)) return readPostFile(filename);
  }
  return null;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

export function formatPostDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
