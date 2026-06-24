// Reads every markdown file in content/blog and writes a single
// TypeScript module (lib/blog-data.generated.ts) that bundles all
// posts as plain JS data.
//
// File-name convention:
//   foo.md           → slug "foo", language "en"  (default)
//   foo.en.md        → slug "foo", language "en"  (explicit)
//   foo.mn.md        → slug "foo", language "mn"
// Two files sharing the same slug are merged into one post with
// translations for each language.
//
// We pre-generate this because Cloudflare Workers cannot reliably
// read arbitrary project files at request time.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(ROOT, "content", "blog");
const OUTPUT = path.join(ROOT, "lib", "blog-data.generated.ts");

const LOCALES = ["en", "mn"];

function estimateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / wordsPerMinute));
  return `${minutes} min read`;
}

function parseFilename(filename) {
  let name = filename.replace(/\.mdx?$/, "");
  let locale = "en";
  for (const candidate of LOCALES) {
    if (name.endsWith(`.${candidate}`)) {
      locale = candidate;
      name = name.slice(0, -(candidate.length + 1));
      break;
    }
  }
  return { slug: name, locale };
}

const files = fs.existsSync(BLOG_DIR)
  ? fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
  : [];

// Group files by slug, then by locale.
const bySlug = new Map();

for (const filename of files) {
  const { slug, locale } = parseFilename(filename);
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);

  if (!bySlug.has(slug)) {
    bySlug.set(slug, {
      slug,
      // Common fields are taken from the first file we see. If a later
      // translation overrides them, that's fine — we just want
      // sensible defaults.
      date: String(data.date ?? new Date().toISOString().slice(0, 10)),
      image: String(data.image ?? ""),
      imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
      author: data.author ? String(data.author) : "Nomad Riverside Stay Terelj",
      translations: {},
    });
  }

  const entry = bySlug.get(slug);

  // Allow each translation to override common fields if it provides them.
  if (data.date) entry.date = String(data.date);
  if (data.image) entry.image = String(data.image);
  if (data.imageAlt) entry.imageAlt = String(data.imageAlt);
  if (data.author) entry.author = String(data.author);

  entry.translations[locale] = {
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    readingTime: data.readingTime
      ? String(data.readingTime)
      : estimateReadingTime(content),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    content,
  };
}

const posts = Array.from(bySlug.values()).sort((a, b) =>
  a.date < b.date ? 1 : -1,
);

const banner = `// AUTO-GENERATED — DO NOT EDIT BY HAND.
// Generated from content/blog/*.md by scripts/build-blog-data.mjs
// To regenerate, run: npm run build-blog
`;

const body = `export type Locale = "en" | "mn";

export type Translation = {
  title: string;
  description: string;
  readingTime: string;
  tags: string[];
  content: string;
};

export type GeneratedPost = {
  slug: string;
  date: string;
  image: string;
  imageAlt?: string;
  author?: string;
  // At least one of these will be present.
  translations: Partial<Record<Locale, Translation>>;
};

export const BLOG_POSTS: GeneratedPost[] = ${JSON.stringify(posts, null, 2)};
`;

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, banner + "\n" + body);

const summary = posts
  .map((p) => `${p.slug} [${Object.keys(p.translations).join(", ")}]`)
  .join(", ");
console.log(
  `✓ Wrote ${posts.length} blog post(s) to ${path.relative(ROOT, OUTPUT)}${posts.length ? ` — ${summary}` : ""}`,
);
