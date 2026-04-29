"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PageHero from "@/components/PageHero";
import { images } from "@/lib/images";

export default function AccommodationPage() {
  const { t } = useLanguage();

  const stays = [
    {
      ...t.accommodation.ger,
      img: images.gerInterior,
      accent: "emerald",
    },
    {
      ...t.accommodation.tent,
      img: images.tent,
      accent: "amber",
      note: t.accommodation.tent.note,
    },
  ] as const;

  return (
    <div>
      <PageHero
        title={t.accommodation.title}
        subtitle={t.accommodation.subtitle}
        imageSrc={images.ger}
        imageAlt={t.accommodation.title}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid gap-10">
            {stays.map((s, idx) => {
              const isEmerald = s.accent === "emerald";
              const badge = isEmerald
                ? "bg-emerald-600"
                : "bg-amber-700";
              const dot = isEmerald
                ? "bg-emerald-600"
                : "bg-amber-700";
              return (
                <article
                  key={s.name}
                  className={`grid gap-6 lg:grid-cols-2 items-center ${
                    idx % 2 === 1 ? "lg:[&>div:first-child]:order-last" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-stone-200">
                    <Image
                      src={s.img}
                      alt={s.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <div
                      className={`absolute top-4 right-4 inline-flex items-baseline gap-1 rounded-full ${badge} text-white px-4 py-1.5 shadow`}
                    >
                      <span className="text-2xl font-bold">{s.price}</span>
                      <span className="text-xs">{s.per}</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-stone-900">
                      {s.name}
                    </h2>
                    <p className="mt-1 text-stone-500">{s.capacity}</p>
                    <ul className="mt-5 space-y-2 text-stone-700">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span
                            className={`mt-2 inline-block h-1.5 w-1.5 rounded-full ${dot}`}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 italic text-stone-600">{s.best}</p>
                    {"note" in s && s.note && (
                      <p className="mt-3 text-sm text-amber-800 bg-amber-50 ring-1 ring-amber-200 rounded-md px-3 py-2">
                        ⚠ {s.note}
                      </p>
                    )}
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                    >
                      {t.contact.bookNow}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
