"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import PageHero from "@/components/PageHero";
import { images } from "@/lib/images";

export default function PackagesPage() {
  const { t } = useLanguage();

  return (
    <div>
      <PageHero
        title={t.packages.title}
        subtitle={t.packages.subtitle}
        imageSrc={images.bonfire}
        imageAlt={t.packages.title}
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid gap-8 md:grid-cols-2">
            <article className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white p-8 shadow-lg flex flex-col">
              <p className="text-xs uppercase tracking-wider text-emerald-200">
                {t.brand.name}
              </p>
              <h2 className="mt-1 text-3xl font-bold">
                {t.packages.terelj.name}
              </h2>
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
              <Link
                href="/contact"
                className="mt-auto pt-8 self-start"
              >
                <span className="inline-flex items-center rounded-full bg-white text-emerald-800 px-6 py-3 text-sm font-semibold hover:bg-emerald-50">
                  {t.contact.bookNow}
                </span>
              </Link>
            </article>

            <article className="rounded-3xl bg-gradient-to-br from-amber-700 to-amber-900 text-white p-8 shadow-lg flex flex-col">
              <p className="text-xs uppercase tracking-wider text-amber-200">
                Evening
              </p>
              <h2 className="mt-1 text-3xl font-bold">
                {t.packages.evening.name}
              </h2>
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
              <Link href="/contact" className="mt-auto pt-8 self-start">
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
    </div>
  );
}
