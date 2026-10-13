import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Stay — Nomad Riverside Stay Terelj",
  description:
    "Reserve your traditional Mongolian ger or camping tent at our riverside camp in Gorkhi-Terelj National Park. Add tours, horse riding, khorkhog, and airport pickup. Request at least 2 days in advance.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book Your Stay — Nomad Riverside Stay Terelj",
    description:
      "Reserve your traditional Mongolian ger or camping tent at our riverside camp in Gorkhi-Terelj National Park.",
    url: "/booking",
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
