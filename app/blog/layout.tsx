import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Terelj travel guides, tips & stories | Nomad Riverside Stay",
  description:
    "Travel guides, practical tips and stories from Gorkhi-Terelj National Park, Mongolia. Plan your perfect ger-camp escape from Ulaanbaatar.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Nomad Riverside Stay Terelj",
    description:
      "Travel guides, practical tips and stories from Gorkhi-Terelj National Park.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
