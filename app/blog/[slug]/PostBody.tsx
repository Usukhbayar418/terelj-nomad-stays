"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { formatPostDate } from "@/lib/blog";
import type { GeneratedPost, Locale } from "@/lib/blog-data.generated";

function pickTranslation(post: GeneratedPost, preferred: Locale) {
  const order: Locale[] = preferred === "mn" ? ["mn", "en"] : ["en", "mn"];
  for (const l of order) {
    const t = post.translations[l];
    if (t) return { ...t, locale: l };
  }
  return null;
}

export default function PostBody({ post }: { post: GeneratedPost }) {
  const { locale } = useLanguage();
  const t = pickTranslation(post, locale);
  if (!t) return null;

  const isMongolianFallback = locale === "mn" && t.locale === "en";

  return (
    <div>
      {/* Title card overlapping the hero */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 -mt-24 relative">
        <div className="rounded-3xl bg-white shadow-xl ring-1 ring-stone-200 p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <Link href="/blog" className="hover:text-emerald-700">
              {locale === "mn" ? "← Блог руу буцах" : "← Back to Blog"}
            </Link>
            <span>•</span>
            <time dateTime={post.date}>
              {formatPostDate(post.date, locale)}
            </time>
            {t.readingTime && (
              <>
                <span>•</span>
                <span>{t.readingTime}</span>
              </>
            )}
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-stone-900">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-stone-600">{t.description}</p>
          {t.tags && t.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {isMongolianFallback && (
            <p className="mt-4 text-xs text-amber-700 bg-amber-50 rounded-md px-3 py-2 ring-1 ring-amber-200">
              Энэ постын Монгол хувилбар одоогоор бэлэн болоогүй байна — Англи
              хувилбарыг харуулж байна.
            </p>
          )}
        </div>
      </div>

      <section className="bg-stone-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-stone-800 leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: (props) => (
                  <h2
                    className="mt-12 mb-4 text-2xl sm:text-3xl font-bold text-stone-900"
                    {...props}
                  />
                ),
                h3: (props) => (
                  <h3
                    className="mt-8 mb-3 text-xl sm:text-2xl font-semibold text-stone-900"
                    {...props}
                  />
                ),
                h4: (props) => (
                  <h4
                    className="mt-6 mb-2 text-lg font-semibold text-stone-900"
                    {...props}
                  />
                ),
                p: (props) => (
                  <p
                    className="my-5 text-base sm:text-lg leading-relaxed text-stone-700"
                    {...props}
                  />
                ),
                a: ({ href, ...props }) => (
                  <a
                    href={href}
                    className="text-emerald-700 underline decoration-emerald-300 underline-offset-2 hover:decoration-emerald-600"
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href?.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    {...props}
                  />
                ),
                ul: (props) => (
                  <ul
                    className="my-5 list-disc pl-6 space-y-2 text-stone-700"
                    {...props}
                  />
                ),
                ol: (props) => (
                  <ol
                    className="my-5 list-decimal pl-6 space-y-2 text-stone-700"
                    {...props}
                  />
                ),
                li: (props) => <li className="leading-relaxed" {...props} />,
                blockquote: (props) => (
                  <blockquote
                    className="my-6 border-l-4 border-emerald-600 bg-emerald-50 rounded-r-lg px-5 py-3 text-stone-700"
                    {...props}
                  />
                ),
                strong: (props) => (
                  <strong className="font-semibold text-stone-900" {...props} />
                ),
                em: (props) => <em className="italic" {...props} />,
                hr: () => <hr className="my-10 border-stone-200" />,
                code: ({ children, ...props }) => (
                  <code
                    className="rounded bg-stone-100 px-1.5 py-0.5 text-sm font-mono text-emerald-800"
                    {...props}
                  >
                    {children}
                  </code>
                ),
                table: (props) => (
                  <div className="my-6 overflow-x-auto">
                    <table className="w-full border-collapse text-sm" {...props} />
                  </div>
                ),
                thead: (props) => <thead className="bg-stone-100" {...props} />,
                th: (props) => (
                  <th
                    className="border border-stone-200 px-4 py-2 text-left font-semibold text-stone-900"
                    {...props}
                  />
                ),
                td: (props) => (
                  <td className="border border-stone-200 px-4 py-2" {...props} />
                ),
                img: ({ src, alt }) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={typeof src === "string" ? src : ""}
                    alt={alt ?? ""}
                    className="my-6 rounded-2xl w-full h-auto"
                  />
                ),
              }}
            >
              {t.content}
            </ReactMarkdown>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-3xl bg-emerald-900 text-white p-8 sm:p-10 text-center">
            <h2 className="text-2xl font-bold">
              {locale === "mn"
                ? "Өөрийнхөө Тэрэлжийн аяллыг төлөвлөе"
                : "Plan your own Terelj escape"}
            </h2>
            <p className="mt-2 text-emerald-100">
              {locale === "mn"
                ? "Туул голын эрэг дээр манайхаар байрлаарай. 3 уламжлалт гэр, 2 майхан — Улаанбаатараас зүгээр 1.5 цагийн зайтай."
                : "Stay with us by the Tuul River. 3 traditional gers + 2 camping tents, all just 1.5 hours from Ulaanbaatar."}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full bg-white text-emerald-900 px-6 py-3 font-semibold hover:bg-emerald-50"
              >
                {locale === "mn" ? "Багц харах" : "See packages"}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full ring-1 ring-white/40 px-6 py-3 font-semibold hover:bg-white/10"
              >
                {locale === "mn" ? "Захиалах" : "Book now"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
