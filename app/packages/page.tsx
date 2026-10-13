"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PageHero from "@/components/PageHero";
import { images } from "@/lib/images";
import { PARTNER_TOURS, type PartnerTour } from "@/lib/partner-tours-config";
import PartnerTourInquiry from "@/components/PartnerTourInquiry";

export default function PackagesPage() {
  const { t } = useLanguage();
  const [activeTour, setActiveTour] = useState<PartnerTour | null>(null);

  return (
    <div>
      <PageHero
        title={t.packages.title}
        subtitle={t.packages.subtitle}
        imageSrc={images.bonfire}
        imageAlt={t.packages.title}
      />

      {/* === Our own camp packages === */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
              {t.brand.name} — Terelj
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-stone-900">
              Our Camp Packages
            </h2>
            <p className="mt-3 text-stone-600">
              Bundles built around our riverside camp — stay, eat, ride, and
              relax with the river as your soundtrack.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <article className="rounded-3xl bg-linear-to-br from-emerald-700 to-emerald-900 text-white p-8 shadow-lg flex flex-col">
              <p className="text-xs uppercase tracking-wider text-emerald-200">
                {t.brand.name}
              </p>
              <h3 className="mt-1 text-3xl font-bold">
                {t.packages.terelj.name}
              </h3>
              <p className="mt-4 text-emerald-100">
                {t.packages.terelj.includes}
              </p>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold">
                  {t.packages.terelj.price}
                </span>
                <span className="text-emerald-200">
                  {t.packages.terelj.per}
                </span>
              </div>
              <Link href="/booking" className="mt-auto pt-8 self-start">
                <span className="inline-flex items-center rounded-full bg-white text-emerald-800 px-6 py-3 text-sm font-semibold hover:bg-emerald-50">
                  {t.contact.bookNow}
                </span>
              </Link>
            </article>

            <article className="rounded-3xl bg-linear-to-br from-amber-700 to-amber-900 text-white p-8 shadow-lg flex flex-col">
              <p className="text-xs uppercase tracking-wider text-amber-200">
                Evening
              </p>
              <h3 className="mt-1 text-3xl font-bold">
                {t.packages.evening.name}
              </h3>
              <p className="mt-4 text-amber-100">
                {t.packages.evening.includes}
              </p>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold">
                  {t.packages.evening.price}
                </span>
                <span className="text-amber-200">
                  {t.packages.evening.per}
                </span>
              </div>
              <Link href="/booking" className="mt-auto pt-8 self-start">
                <span className="inline-flex items-center rounded-full bg-white text-amber-800 px-6 py-3 text-sm font-semibold hover:bg-amber-50">
                  {t.contact.bookNow}
                </span>
              </Link>
            </article>
          </div>

          <div className="mt-12 rounded-3xl bg-stone-50 ring-1 ring-stone-200 p-8 text-center">
            <h3 className="text-xl font-bold text-stone-900">
              {t.contact.notesTitle}
            </h3>
            <ul className="mt-4 space-y-1 text-sm text-stone-700">
              {t.contact.notes.map((n) => (
                <li key={n}>• {n}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* === Partner tours === */}
      <section className="bg-stone-50 border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-wider text-stone-500">
              Beyond Terelj — Curated with Partners
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-stone-900">
              See more of Mongolia
            </h2>
            <p className="mt-3 text-stone-600">
              Multi-day trips we organize together with trusted partner
              operators. Combine them with a Terelj stay for the perfect
              Mongolia itinerary.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_TOURS.map((tour) => (
              <article
                key={tour.slug}
                className="group rounded-2xl bg-white ring-1 ring-stone-200 overflow-hidden hover:ring-emerald-300 transition-all flex flex-col"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {tour.badge && (
                    <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-emerald-600 text-white text-xs font-semibold px-3 py-1 shadow">
                      {tour.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs uppercase tracking-wider text-stone-500">
                    {tour.destination}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-stone-900">
                    {tour.name}
                  </h3>
                  <p className="mt-2 text-sm text-stone-600 line-clamp-3">
                    {tour.description}
                  </p>
                  <ul className="mt-3 space-y-1 text-xs text-stone-600">
                    {tour.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 mt-0.5">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
                    <span>
                      {tour.durationDays} day{tour.durationDays > 1 ? "s" : ""}
                    </span>
                    <span>{tour.bestSeason}</span>
                  </div>
                  <div className="mt-5 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-stone-500">From</p>
                      <p className="text-2xl font-extrabold text-stone-900">
                        ${tour.priceFrom}
                        <span className="text-sm font-medium text-stone-500">
                          {" "}
                          /person
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTour(tour)}
                      className="inline-flex items-center rounded-full bg-emerald-700 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-800"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-stone-500 max-w-2xl mx-auto">
            Prices shown are starting estimates per person. Final quote depends
            on dates, group size, accommodation level, and inclusions — we send
            a tailored proposal within 24 hours of your inquiry.
          </p>
        </div>
      </section>

      {/* === Inquiry modal === */}
      {activeTour && (
        <PartnerTourInquiry
          tour={activeTour}
          onClose={() => setActiveTour(null)}
        />
      )}
    </div>
  );
}
