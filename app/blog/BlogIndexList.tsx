"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { formatPostDate } from "@/lib/blog";
import type { GeneratedPost, Locale } from "@/lib/blog-data.generated";

// Picks the right translation for the user's current language,
// falling back to whichever language is available.
function pickTranslation(post: GeneratedPost, preferred: Locale) {
  const order: Locale[] = preferred === "mn" ? ["mn", "en"] : ["en", "mn"];
  for (const l of order) {
    const t = post.translations[l];
    if (t) return { ...t, locale: l };
  }
  return null;
}

export default function BlogIndexList({ posts }: { posts: GeneratedPost[] }) {
  const { locale } = useLanguage();

  const localized = posts
    .map((p) => {
      const t = pickTranslation(p, locale);
      if (!t) return null;
      return {
        slug: p.slug,
        date: p.date,
        image: p.image,
        imageAlt: p.imageAlt,
        title: t.title,
        description: t.description,
        readingTime: t.readingTime,
        tags: t.tags,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);

  if (localized.length === 0) {
    return (
      <div className="text-center text-stone-600">
        <p>
          {locale === "mn"
            ? "Одоогоор пост байхгүй. Удахгүй буцаж шалгана уу!"
            : "No posts yet. Check back soon!"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {localized.map((post) => (
        <article
          key={post.slug}
          className="group rounded-2xl ring-1 ring-stone-200 overflow-hidden bg-stone-50 hover:bg-white hover:ring-emerald-300 transition-colors"
        >
          <Link href={`/blog/${post.slug}`} className="block">
            {post.image && (
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <Image
                  src={post.image}
                  alt={post.imageAlt ?? post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <time dateTime={post.date}>
                  {formatPostDate(post.date, locale)}
                </time>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </>
                )}
              </div>
              <h2 className="mt-2 text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-stone-600 line-clamp-3">
                {post.description}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-4 text-sm font-semibold text-emerald-700 group-hover:underline">
                {locale === "mn" ? "Дэлгэрэнгүй →" : "Read more →"}
              </p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
