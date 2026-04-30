"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import PageHero from "@/components/PageHero";
import { images } from "@/lib/images";

export default function ContactPage() {
  const { t } = useLanguage();

  // Update these with real values
  const WHATSAPP_NUMBER = "97688849073"; // No +, no spaces
  const IG_URL = "https://instagram.com/nomad_terelj?igsh=b2g4cjZpODdsZnBz";
  const AIRBNB_URL =
    "https://www.airbnb.com/rooms/1585896547879077289?unique_share_id=b0892238-f7d7-4643-94fe-aa2f22faf723&viralityEntryPoint=1&s=76&source_impression_id=p3_1777535833_P3lOtvKZG-Wc0l8f";
    
  const channels = [
    {
      label: "WhatsApp",
      value: t.contact.phone,
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      icon: "💬",
      bg: "bg-emerald-600",
    },
    {
      label: "Instagram",
      value: t.contact.ig,
      href: IG_URL,
      icon: "📸",
      bg: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-amber-400",
    },
    {
      label: "Airbnb",
      value: "Nomad Riverside Stay Terelj",
      href: AIRBNB_URL,
      icon: "🏠",
      bg: "bg-rose-500",
    },
  ];

  return (
    <div>
      <PageHero
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        imageSrc={images.river}
        imageAlt={t.contact.title}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl ring-1 ring-stone-200 bg-stone-50 p-6 hover:ring-emerald-300 hover:bg-white transition-colors"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${c.bg} text-white text-2xl`}
                >
                  {c.icon}
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {c.label}
                </p>
                <p className="mt-1 font-semibold text-stone-900">{c.value}</p>
                <p className="mt-3 text-sm text-emerald-700 group-hover:underline">
                  {c.label === "WhatsApp"
                    ? "Click to chat"
                    : "Open"}{" "}
                  →
                </p>
              </a>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-emerald-900 text-white p-8 sm:p-12">
            <h2 className="text-2xl font-bold">{t.contact.notesTitle}</h2>
            <ul className="mt-4 space-y-2 text-emerald-100">
              {t.contact.notes.map((n) => (
                <li key={n} className="flex items-start gap-2">
                  <span className="text-emerald-300">✓</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <p className="text-emerald-300 text-xs uppercase tracking-wider">
                  Tuul River • Terelj
                </p>
                <p className="mt-1">Тэрэлжийн БЦГ, Туул голын эрэг</p>
                <p>Terelj National Park, Tuul Riverside, Mongolia</p>
              </div>
              <div>
                <p className="text-emerald-300 text-xs uppercase tracking-wider">
                  {t.brand.name}
                </p>
                <p className="mt-1">Riverside Stay Terelj</p>
                <p className="text-emerald-200">3 gers • 2 tents</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
