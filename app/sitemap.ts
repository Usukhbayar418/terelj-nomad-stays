import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const route = (path: string): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  });

  return [
    route("/"),
    route("/accommodation"),
    route("/tours"),
    route("/activities"),
    route("/packages"),
    route("/faq"),
    route("/contact"),
  ];
}
