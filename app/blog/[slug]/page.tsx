import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getAllSlugs, getRawPostBySlug, getPostBySlug } from "@/lib/blog";
import { SITE } from "@/lib/site";
import PostBody from "./PostBody";

type Params = { slug: string };

// Pre-render every known post at build time. Defaults to OpenNext's
// own SSG handling — no force-static or dynamicParams overrides.
export async function generateStaticParams(): Promise<Params[]> {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Metadata is generated at build time so we cannot read the user's
  // current language here — default to English which is what search
  // engines should index.
  const post = getPostBySlug(slug, "en");
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: `${post.title} | ${SITE.shortName} Blog`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: post.image
        ? [{ url: post.image, alt: post.imageAlt ?? post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getRawPostBySlug(slug);
  if (!post) return notFound();

  // For the article schema we use English (or fall back to whatever's
  // available) since it's primarily for search engines.
  const seoPost = getPostBySlug(slug, "en");
  const articleSchema = seoPost
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: seoPost.title,
        description: seoPost.description,
        image: seoPost.image ? [seoPost.image] : undefined,
        datePublished: seoPost.date,
        dateModified: seoPost.date,
        author: {
          "@type": "Organization",
          name: seoPost.author ?? SITE.name,
          url: SITE.url,
        },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE.url}/blog/${seoPost.slug}`,
        },
        keywords: seoPost.tags?.join(", "),
      }
    : null;

  return (
    <article>
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}

      {/* Hero image is the same regardless of language. */}
      {post.image && (
        <div className="relative h-[40vh] sm:h-[50vh] w-full overflow-hidden bg-stone-200">
          <Image
            src={post.image}
            alt={post.imageAlt ?? post.slug}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-stone-50" />
        </div>
      )}

      {/* Body (title, meta, content) reacts to language toggle. */}
      <PostBody post={post} />
    </article>
  );
}
