"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PageHero from "@/components/PageHero";
import { images } from "@/lib/images";

export default function ToursPage() {
  const { t } = useLanguage();

  const tours = [
    {
      name: t.tours.terelj.name,
      price: t.tours.terelj.price,
      priceNote: t.tours.terelj.priceNote,
      bullets: t.tours.terelj.bullets,
      img: images.rocks,
    },
    {
      name: t.tours.chinggis.name,
      price: t.tours.chinggis.price,
      priceNote: t.tours.chinggis.priceNote,
      bullets: [t.tours.chinggis.desc],
      img: images.statue,
    },
  ];

  return (
    <div>
      <PageHero
        title={t.tours.title}
        subtitle={t.tours.subtitle}
        imageSrc={images.mountain}
        imageAlt={t.tours.title}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid gap-8 md:grid-cols-2">
            {tours.map((tour) => (
              <article
                key={tour.name}
                className="rounded-3xl bg-stone-50 ring-1 ring-stone-200 overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={tour.img}
                    alt={tour.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-stone-900">
                    {tour.name}
                  </h2>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-emerald-700">
                      {tour.price}
                    </span>
                    <span className="text-xs text-stone-500">
                      {tour.priceNote}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-1 text-sm text-stone-700 flex-1">
                    {tour.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-6 self-start inline-flex items-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    {t.contact.bookNow}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
