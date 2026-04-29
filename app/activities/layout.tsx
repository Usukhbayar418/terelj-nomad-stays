import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Үйл ажиллагаа / Activities — Морь, Тэмээ, Хорхог, Гал",
  description:
    "Морь унах ($20-25/цаг), тэмээ унах ($20/цаг), хорхог ($30/хүн), гал тойруу од харах ($15/хүн). Жинхэнэ Монгол туршлага Тэрэлжид.",
  alternates: { canonical: "/activities" },
  openGraph: {
    title: "Activities — Horse riding, Khorkhog, Bonfire & Stargazing",
    description:
      "Horse and camel riding, traditional khorkhog BBQ, bonfire and stargazing — authentic Mongolian experiences in Terelj.",
    url: "/activities",
  },
};

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
