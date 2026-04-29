import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Аялал / Tours — Тэрэлж, Чингис хааны хөшөө",
  description:
    "Тэрэлжийн аялал ($100, 2-4 хүн) — Яст мэлхий хад, Арьяабал хийд. Чингис хааны хөшөө цогцолбор аялал ($30/хүн). Жолооч + машинтай.",
  alternates: { canonical: "/tours" },
  openGraph: {
    title: "Tours — Terelj National Park & Chinggis Khan Statue",
    description:
      "Private guided tours of Terelj (Turtle Rock, Aryabal Temple) and the Chinggis Khan Statue Complex with driver included.",
    url: "/tours",
  },
};

export default function ToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
