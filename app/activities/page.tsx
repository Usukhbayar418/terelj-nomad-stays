"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PageHero from "@/components/PageHero";
import { images } from "@/lib/images";

export default function ActivitiesPage() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHero
        title={t.activities.title}
        subtitle={t.activities.subtitle}
        imageSrc={images.horse}
        imageAlt={t.activities.title}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Riding */}
            <article className="rounded-3xl bg-stone-50 ring-1 ring-stone-200 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3]">
                <Image
                  src={images.horse}
                  alt={t.activities.horse.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-lg font-bold text-stone-900">
                  {t.activities.horse.name} • {t.activities.camel.name}
                </h3>
                <div className="mt-3 space-y-3">
                  <div className="flex items-baseline justify-between border-b border-stone-200 pb-2">
                    <span className="text-stone-700">
                      {t.activities.horse.name}
                    </span>
                    <span>
                      <span className="text-lg font-bold text-emerald-700">
                        {t.activities.horse.price}
                      </span>
                      <span className="ml-1 text-xs text-stone-500">
                        {t.activities.horse.per}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-stone-700">
                      {t.activities.camel.name}
                    </span>
                    <span>
                      <span className="text-lg font-bold text-emerald-700">
                        {t.activities.camel.price}
                      </span>
                      <span className="ml-1 text-xs text-stone-500">
                        {t.activities.camel.per}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </article>

            {/* Food */}
            <article className="rounded-3xl bg-stone-50 ring-1 ring-stone-200 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3]">
                <Image
                  src={images.food}
                  alt={t.activities.food.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">
                  {t.activities.food.title}
                </p>
                <h3 className="text-lg font-bold text-stone-900">
                  {t.activities.food.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-amber-700">
                    {t.activities.food.price}
                  </span>
                  <span className="text-xs text-stone-500">
                    {t.activities.food.per}
                  </span>
                </div>
                <p className="mt-3 text-sm text-stone-700">
                  {t.activities.food.desc}
                </p>
                <p className="mt-2 text-xs text-stone-500">
                  {t.activities.food.note}
                </p>
              </div>
            </article>

            {/* Night */}
            <article className="rounded-3xl bg-stone-50 ring-1 ring-stone-200 overflow-hidden flex flex-col">
              <div className="relative aspect-[4/3]">
                <Image
                  src={images.bonfire}
                  alt={t.activities.night.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">
                  {t.activities.night.title}
                </p>
                <h3 className="text-lg font-bold text-stone-900">
                  {t.activities.night.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-emerald-700">
                    {t.activities.night.price}
                  </span>
                  <span className="text-xs text-stone-500">
                    {t.activities.night.per}
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-stone-700">
                  {t.activities.night.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              {t.contact.bookNow}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
