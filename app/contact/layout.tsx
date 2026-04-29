import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Холбоо барих / Contact — WhatsApp, Instagram, Airbnb",
  description:
    "Захиалга, нэмэлт мэдээлэл авах: WhatsApp +976 9982 2851, Instagram @nomad_terelj. Урьдчилсан захиалгаар үйлчилнэ.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Nomad Riverside Stay Terelj",
    description:
      "Reach out via WhatsApp or Instagram for booking and questions. Advance booking recommended.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
