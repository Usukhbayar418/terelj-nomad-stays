"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Header() {
  const { t, locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/accommodation", label: t.nav.accommodation },
    { href: "/tours", label: t.nav.tours },
    { href: "/activities", label: t.nav.activities },
    { href: "/packages", label: t.nav.packages },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-stone-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 text-white font-bold">
              N
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-base font-bold tracking-tight text-stone-900">
                NOMAD
              </span>
              <span className="text-[11px] uppercase tracking-wider text-stone-500">
                Riverside Stay Terelj
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-stone-700 hover:text-emerald-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div
              role="group"
              aria-label="Language switcher"
              className="inline-flex rounded-full border border-stone-300 p-0.5 text-xs font-semibold"
            >
              <button
                type="button"
                onClick={() => setLocale("mn")}
                aria-pressed={locale === "mn"}
                className={`rounded-full px-3 py-1 transition-colors ${
                  locale === "mn"
                    ? "bg-emerald-700 text-white"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                МН
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                aria-pressed={locale === "en"}
                className={`rounded-full px-3 py-1 transition-colors ${
                  locale === "en"
                    ? "bg-emerald-700 text-white"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                EN
              </button>
            </div>

            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors"
            >
              {t.nav.bookNow}
            </Link>

            <button
              type="button"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-stone-300 text-stone-700"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {open ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden pb-4">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-md bg-emerald-700 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  {t.nav.bookNow}
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
