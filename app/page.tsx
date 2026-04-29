"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import SectionHeading from "@/components/SectionHeading";
import { images } from "@/lib/images";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="bg-stone-50">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40 text-white">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200">
            {t.hero.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-3xl">
            <span className="block text-emerald-300/90 text-2xl sm:text-3xl font-bold tracking-widest">
              {t.brand.name}
            </span>
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-stone-100/90">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 shadow-lg shadow-emerald-900/30"
            >
              {t.hero.ctaPrimary}
            </Link>
            <Link
              href="/accommodation"
              className="inline-flex items-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
            >
              {t.hero.ctaSecondary}
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {t.brand.badges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium text-white border border-white/20"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Feature strip */}
        <div className="relative bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="-mt-8 sm:-mt-10 grid sm:grid-cols-3 gap-3 sm:gap-4">
              {t.hero.features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white shadow-md ring-1 ring-stone-200 p-5 flex items-start gap-3"
                >
                  <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-stone-900">{f.title}</p>
                    <p className="text-sm text-stone-600">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <SectionHeading
                eyebrow="📍"
                title={t.location.title}
                subtitle={t.location.body}
              />
              <ul className="mt-6 space-y-2">
                {t.location.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-stone-700">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-emerald-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-stone-200">
              <Image
                src={images.river}
                alt={t.location.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <SectionHeading
            eyebrow="🏠"
            title={t.accommodation.title}
            subtitle={t.accommodation.subtitle}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {/* Ger */}
            <article className="group rounded-3xl bg-white shadow-sm ring-1 ring-stone-200 overflow-hidden flex flex-col">
              <div className="relative aspect-[16/10]">
                <Image
                  src={images.gerInterior}
                  alt={t.accommodation.ger.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 inline-flex items-baseline gap-1 rounded-full bg-emerald-600 text-white px-4 py-1.5 shadow">
                  <span className="text-2xl font-bold">
                    {t.accommodation.ger.price}
                  </span>
                  <span className="text-xs">{t.accommodation.ger.per}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-stone-900">
                  {t.accommodation.ger.name}
                </h3>
                <p className="text-sm text-stone-500">
                  {t.accommodation.ger.capacity}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-stone-700">
                  {t.accommodation.ger.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm italic text-stone-600">
                  {t.accommodation.ger.best}
                </p>
              </div>
            </article>

            {/* Tent */}
            <article className="group rounded-3xl bg-white shadow-sm ring-1 ring-stone-200 overflow-hidden flex flex-col">
              <div className="relative aspect-[16/10]">
                <Image
                  src={images.tent}
                  alt={t.accommodation.tent.name}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 inline-flex items-baseline gap-1 rounded-full bg-amber-700 text-white px-4 py-1.5 shadow">
                  <span className="text-2xl font-bold">
                    {t.accommodation.tent.price}
                  </span>
                  <span className="text-xs">{t.accommodation.tent.per}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-stone-900">
                  {t.accommodation.tent.name}
                </h3>
                <p className="text-sm text-stone-500">
                  {t.accommodation.tent.capacity}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-stone-700">
                  {t.accommodation.tent.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-700" />
                      {b}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm italic text-stone-600">
                  {t.accommodation.tent.best}
                </p>
                <p className="mt-3 text-xs text-amber-800 bg-amber-50 ring-1 ring-amber-200 rounded-md px-3 py-2">
                  ⚠ {t.accommodation.tent.note}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Tours */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <SectionHeading
            eyebrow="📷"
            title={t.tours.title}
            subtitle={t.tours.subtitle}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl bg-stone-50 ring-1 ring-stone-200 overflow-hidden flex flex-col sm:flex-row">
              <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto">
                <Image
                  src={images.rocks}
                  alt={t.tours.terelj.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-lg font-bold text-stone-900">
                  {t.tours.terelj.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-emerald-700">
                    {t.tours.terelj.price}
                  </span>
                  <span className="text-xs text-stone-500">
                    {t.tours.terelj.priceNote}
                  </span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-stone-700">
                  {t.tours.terelj.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="rounded-3xl bg-stone-50 ring-1 ring-stone-200 overflow-hidden flex flex-col sm:flex-row">
              <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto">
                <Image
                  src={images.statue}
                  alt={t.tours.chinggis.name}
                  fill
                  sizes="(min-width: 768px) 25vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-lg font-bold text-stone-900">
                  {t.tours.chinggis.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-emerald-700">
                    {t.tours.chinggis.price}
                  </span>
                  <span className="text-xs text-stone-500">
                    {t.tours.chinggis.priceNote}
                  </span>
                </div>
                <p className="mt-3 text-sm text-stone-700">
                  {t.tours.chinggis.desc}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <SectionHeading
            eyebrow="🐎"
            title={t.activities.title}
            subtitle={t.activities.subtitle}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Riding */}
            <article className="rounded-3xl bg-white ring-1 ring-stone-200 overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={images.horse}
                  alt={t.activities.horse.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-stone-900">Adventures</h3>
                <div className="mt-3 space-y-3">
                  <div className="flex items-baseline justify-between border-b border-stone-100 pb-2">
                    <span className="font-medium text-stone-700">
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
                    <span className="font-medium text-stone-700">
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
            <article className="rounded-3xl bg-white ring-1 ring-stone-200 overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={images.food}
                  alt={t.activities.food.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 inline-flex items-baseline gap-1 rounded-full bg-amber-700 text-white px-3 py-1 shadow">
                  <span className="text-lg font-bold">
                    {t.activities.food.price}
                  </span>
                  <span className="text-[10px]">{t.activities.food.per}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">
                  {t.activities.food.title}
                </p>
                <h3 className="mt-1 font-bold text-stone-900">
                  {t.activities.food.name}
                </h3>
                <p className="mt-2 text-sm text-stone-700">
                  {t.activities.food.desc}
                </p>
                <p className="mt-2 text-xs text-stone-500">
                  {t.activities.food.note}
                </p>
              </div>
            </article>

            {/* Night */}
            <article className="rounded-3xl bg-white ring-1 ring-stone-200 overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={images.bonfire}
                  alt={t.activities.night.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 inline-flex items-baseline gap-1 rounded-full bg-emerald-700 text-white px-3 py-1 shadow">
                  <span className="text-lg font-bold">
                    {t.activities.night.price}
                  </span>
                  <span className="text-[10px]">{t.activities.night.per}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">
                  {t.activities.night.title}
                </p>
                <h3 className="mt-1 font-bold text-stone-900">
                  {t.activities.night.name}
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-stone-700">
                  {t.activities.night.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <SectionHeading
            eyebrow="🎁"
            title={t.packages.title}
            subtitle={t.packages.subtitle}
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-900 text-white p-8 shadow-lg">
              <p className="text-xs uppercase tracking-wider text-emerald-200">
                {t.brand.name}
              </p>
              <h3 className="mt-1 text-2xl font-bold">
                {t.packages.terelj.name}
              </h3>
              <p className="mt-3 text-emerald-100 text-sm">
                {t.packages.terelj.includes}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold">
                  {t.packages.terelj.price}
                </span>
                <span className="text-emerald-200">
                  {t.packages.terelj.per}
                </span>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center rounded-full bg-white text-emerald-800 px-5 py-2 text-sm font-semibold hover:bg-emerald-50"
              >
                {t.contact.bookNow}
              </Link>
            </article>

            <article className="rounded-3xl bg-gradient-to-br from-amber-700 to-amber-900 text-white p-8 shadow-lg">
              <p className="text-xs uppercase tracking-wider text-amber-200">
                Evening
              </p>
              <h3 className="mt-1 text-2xl font-bold">
                {t.packages.evening.name}
              </h3>
              <p className="mt-3 text-amber-100 text-sm">
                {t.packages.evening.includes}
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold">
                  {t.packages.evening.price}
                </span>
                <span className="text-amber-200">
                  {t.packages.evening.per}
                </span>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center rounded-full bg-white text-amber-800 px-5 py-2 text-sm font-semibold hover:bg-amber-50"
              >
                {t.contact.bookNow}
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-stone-200 order-last lg:order-first">
              <Image
                src={images.mountain}
                alt={t.why.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading eyebrow="❤" title={t.why.title} />
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.why.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 rounded-xl bg-white ring-1 ring-stone-200 px-4 py-3 text-sm text-stone-700"
                  >
                    <span className="text-emerald-600">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {t.contact.title}
              </h2>
              <p className="mt-3 text-emerald-100">{t.contact.subtitle}</p>
              <ul className="mt-6 space-y-2 text-sm">
                <li>
                  <span className="text-emerald-300">WhatsApp: </span>
                  {t.contact.phone}
                </li>
                <li>
                  <span className="text-emerald-300">Instagram: </span>
                  {t.contact.ig}
                </li>
                <li>
                  <span className="text-emerald-300">Airbnb: </span>
                  Nomad Riverside Stay Terelj
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
              >
                {t.contact.bookNow}
              </Link>
            </div>
            <div className="rounded-3xl bg-emerald-800/60 ring-1 ring-emerald-700 p-6">
              <h3 className="font-semibold">{t.contact.notesTitle}</h3>
              <ul className="mt-3 space-y-2 text-sm text-emerald-100">
                {t.contact.notes.map((n) => (
                  <li key={n}>• {n}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
