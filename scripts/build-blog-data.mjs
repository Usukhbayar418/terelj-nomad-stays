// Reads every markdown file in content/blog and writes a single
// TypeScript module (lib/blog-data.generated.ts) that bundles all
// posts as plain JS data.
//
// We do this because Cloudflare Workers cannot reliably read files
// from the project at build time inside the Next.js render phase.
// By generating a real .ts file first, the posts are imported as
// code and are guaranteed to be in the worker bundle.
//
// Run automatically before every build via the "prebuild" script.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const OUTPUT = path.join(ROOT, "lib", "blog-data.generated.ts");

function estimateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / wordsPerMinute));
  return `${minutes} min read`;
}

const files = fs.existsSync(BLOG_DIR)
  ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
  : [];

const posts = files.map((filename) => {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
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
    readingTime: data.readingTime
      ? String(data.readingTime)
      : estimateReadingTime(content),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
  };
});

posts.sort((a, b) => (a.date < b.date ? 1 : -1));

const banner = `// AUTO-GENERATED — DO NOT EDIT BY HAND.
// Generated from content/blog/*.md by scripts/build-blog-data.mjs
// To regenerate, run: npm run build-blog
`;

const body = `export type GeneratedPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  imageAlt?: string;
  author?: string;
  readingTime?: string;
  tags?: string[];
  content: string;
};

export const BLOG_POSTS: GeneratedPost[] = ${JSON.stringify(posts, null, 2)};
`;

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, banner + "\n" + body);

console.log(`✓ Wrote ${posts.length} blog post(s) to ${path.relative(ROOT, OUTPUT)}`);
