import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Багц санал / Packages — Тэрэлж $130-160, Орой $45",
  description:
    "Тэрэлж багц ($130-160/хүн): Гэр + Аялал + Морь унах. Оройн багц ($45/хүн): Хорхог + Гал + Од харах + Цай + Зефир.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Packages — Terelj experience from $45",
    description:
      "Bundled experiences: full Terelj package (ger + tour + horse riding) and an evening package with khorkhog and bonfire.",
    url: "/packages",
  },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
