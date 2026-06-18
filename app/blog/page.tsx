import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatPostDate } from "@/lib/blog";
import PageHero from "@/components/PageHero";
import { images } from "@/lib/images";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div>
      <PageHero
        title="Blog"
        subtitle="Travel guides, practical tips and stories from Gorkhi-Terelj National Park"
        imageSrc={images.mountain}
        imageAlt="Gorkhi-Terelj National Park"
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          {posts.length === 0 ? (
            <div className="text-center text-stone-600">
              <p>No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
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
                          {formatPostDate(post.date)}
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
                        Read more →
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
