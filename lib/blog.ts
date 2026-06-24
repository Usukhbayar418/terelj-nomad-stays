// Bilingual blog backed by markdown files in content/blog/*.md.
// Each post can have an English (.en.md or plain .md) and a Mongolian
// (.mn.md) translation. They are pre-compiled into a TypeScript module
// (lib/blog-data.generated.ts) by scripts/build-blog-data.mjs so the
// posts work everywhere, including Cloudflare Workers.

import {
  BLOG_POSTS,
  type GeneratedPost,
  type Locale,
  type Translation,
} from "./blog-data.generated";

export type { GeneratedPost, Locale, Translation };

// Per-locale view of a post — merges the post's common fields with
// the translation for a given language (falling back to whichever
// translation is available).
export type LocalizedPost = {
  slug: string;
  date: string;
  image: string;
  imageAlt?: string;
  author?: string;
  title: string;
  description: string;
  readingTime: string;
  tags: string[];
  content: string;
  // Locale that was actually used (e.g. you requested "mn" but only
  // "en" was available, so this will be "en").
  locale: Locale;
};

export type LocalizedPostMeta = Omit<LocalizedPost, "content">;

function pickTranslation(
  post: GeneratedPost,
  preferred: Locale,
): { translation: Translation; locale: Locale } | null {
  const order: Locale[] = preferred === "mn" ? ["mn", "en"] : ["en", "mn"];
  for (const l of order) {
    const t = post.translations[l];
    if (t) return { translation: t, locale: l };
  }
  return null;
}

function toLocalized(
  post: GeneratedPost,
  preferred: Locale,
): LocalizedPost | null {
  const picked = pickTranslation(post, preferred);
  if (!picked) return null;
  return {
    slug: post.slug,
    date: post.date,
    image: post.image,
    imageAlt: post.imageAlt,
    author: post.author,
    title: picked.translation.title,
    description: picked.translation.description,
    readingTime: picked.translation.readingTime,
    tags: picked.translation.tags,
    content: picked.translation.content,
    locale: picked.locale,
  };
}

export function getAllPosts(locale: Locale = "en"): LocalizedPostMeta[] {
  return BLOG_POSTS.map((p) => toLocalized(p, locale))
    .filter((p): p is LocalizedPost => p !== null)
    .map(({ content: _content, ...meta }) => meta);
}

export function getPostBySlug(
  slug: string,
  locale: Locale = "en",
): LocalizedPost | null {
  const raw = BLOG_POSTS.find((p) => p.slug === slug);
  if (!raw) return null;
  return toLocalized(raw, locale);
}

// Returns the raw post (with all translations). Useful when a page
// needs to render both languages and switch at the client.
export function getRawPostBySlug(slug: string): GeneratedPost | null {
  return BLOG_POSTS.find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function formatPostDate(date: string, locale: Locale = "en"): string {
  const d = new Date(date);
  const lang = locale === "mn" ? "mn-MN" : "en-US";
  return d.toLocaleDateString(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
