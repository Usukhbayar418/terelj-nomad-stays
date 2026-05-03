import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Түгээмэл асуултууд / FAQ — Tereljnomadstays",
  description:
    "Тэрэлжийн манай ger camp дээрх түгээмэл асуултууд: байршил, үнэ, цаг агаар, захиалга, зам, ойролцоох газрууд. Common questions about staying at Nomad Riverside Stay Terelj.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Nomad Riverside Stay Terelj",
    description:
      "Common questions about visiting our riverside ger camp in Gorkhi-Terelj National Park.",
    url: "/faq",
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
