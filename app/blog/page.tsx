import { BLOG_POSTS } from "@/lib/blog-data.generated";
import PageHero from "@/components/PageHero";
import { images } from "@/lib/images";
import BlogIndexList from "./BlogIndexList";

// Bake post data into the static HTML at build time. The actual
// list rendering happens in a small client component so we can
// react to the user's language toggle without a page reload.
export const dynamic = "force-static";
export const revalidate = false;

export default function BlogIndexPage() {
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
          <BlogIndexList posts={BLOG_POSTS} />
        </div>
      </section>
    </div>
  );
}
