"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-stone-900 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">
                N
              </span>
              <div className="leading-tight">
                <div className="text-white font-bold">NOMAD</div>
                <div className="text-xs uppercase tracking-wider text-stone-400">
                  Riverside Stay Terelj
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-stone-400 max-w-sm">
              {t.location.body}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold">{t.nav.contact}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <span className="text-stone-400">WhatsApp: </span>
                <span className="text-white">{t.contact.phone}</span>
              </li>
              <li>
                <span className="text-stone-400">Instagram: </span>
                <span className="text-white">{t.contact.ig}</span>
              </li>
              <li>
                <span className="text-stone-400">Airbnb: </span>
                <span className="text-white">Nomad Riverside Stay Terelj</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold">{t.footer.follow}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <li>
                <Link href="/accommodation" className="hover:text-white">
                  {t.nav.accommodation}
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-white">
                  {t.nav.tours}
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-white">
                  {t.nav.activities}
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-white">
                  {t.nav.packages}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <span>© {year} Nomad Riverside Stay Terelj. {t.footer.rights}</span>
          <span>Тэрэлж • Tuul River • Mongolia</span>
        </div>
      </div>
    </footer>
  );
}
