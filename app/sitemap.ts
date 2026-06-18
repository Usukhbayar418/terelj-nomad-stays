import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const route = (path: string): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    route("/"),
    route("/accommodation"),
    route("/tours"),
    route("/activities"),
    route("/packages"),
    route("/blog"),
    route("/faq"),
    route("/contact"),
  ];

  // Add every blog post automatically so Google indexes new articles
  // as soon as they're published.
  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogPosts];
}
