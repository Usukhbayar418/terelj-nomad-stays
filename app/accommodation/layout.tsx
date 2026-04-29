import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Байр / Accommodation — Гэр $90, Майхан $50",
  description:
    "Тэрэлжид байрлах Монгол гэр ($90/шөнө, 4 хүртэл хүн) болон майхан ($50/шөнө). Уламжлалт ger stay vs camping tent — сонголт танд.",
  alternates: { canonical: "/accommodation" },
  openGraph: {
    title: "Байр / Accommodation — Гэр $90, Майхан $50",
    description:
      "Traditional Mongolian ger from $90/night and camping tent from $50/night by the Tuul River in Terelj National Park.",
    url: "/accommodation",
  },
};

export default function AccommodationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
