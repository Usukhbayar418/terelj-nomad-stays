"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// The slide content, per locale.
type Slide = {
  emoji: string;
  title: string;
  body: string;
  bullets?: string[];
};

const SLIDES_EN: Slide[] = [
  {
    emoji: "🏕️",
    title: "Welcome to Nomad Terelj",
    body: "Escape to our small private ger camp on the Tuul River — just 1.5 hours from Ulaanbaatar, inside Gorkhi-Terelj National Park.",
  },
  {
    emoji: "🌲",
    title: "Small, private, family-run",
    body: "3 traditional Mongolian gers and 2 camping tents. No crowds, no buffet lines — just the river, the mountains, and you.",
  },
  {
    emoji: "📅",
    title: "Plan your perfect stay",
    body: "Pick your dates, add horse riding, khorkhog and airport pickup — all in one simple booking form.",
  },
  {
    emoji: "✨",
    title: "Your Mongolia adventure",
    body: "",
    bullets: [
      "Sleep in an authentic Mongolian ger",
      "Ride horses across open steppe",
      "Taste traditional khorkhog BBQ",
      "Stargaze under some of Asia's darkest skies",
      "Wake up to the sound of the Tuul River",
    ],
  },
];

const SLIDES_MN: Slide[] = [
  {
    emoji: "🏕️",
    title: "Тавтай морил, Nomad Terelj",
    body: "Улаанбаатараас ердөө 1.5 цагийн зайтай, Горхи-Тэрэлжийн БЦГ-ийн дотор, Туул голын эрэг дээрх манай жижиг хувийн гэр буудалд амраарай.",
  },
  {
    emoji: "🌲",
    title: "Жижиг, хувийн, гэр бүлийн",
    body: "3 уламжлалт монгол гэр, 2 майхан. Хүн ихгүй, дараалалгүй — зөвхөн гол, уул, та.",
  },
  {
    emoji: "📅",
    title: "Аяллаа төлөвлөө",
    body: "Огноогоо сонгож, морь унах, хорхог, тосож авах үйлчилгээ — бүгдийг нэг простой формоор захиалаарай.",
  },
  {
    emoji: "✨",
    title: "Таны Монгол аялал",
    body: "",
    bullets: [
      "Жинхэнэ монгол гэрт унтах",
      "Уудам талаар мориор давхих",
      "Уламжлалт хорхог амтлах",
      "Азийн хамгийн шигүү харанхуй тэнгэрт од харах",
      "Туул голын дуугаар сэрэх",
    ],
  },
];

export default function WelcomeModal() {
  const { locale } = useLanguage();
  const pathname = usePathname();

  // `dismissed` is true only while the user is still on the same
  // home visit that they closed the modal on. When they navigate
  // away from "/" the flag is reset, so the next time they come
  // back the modal shows again.
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);

  // Reset state when the pathname changes. This uses React's
  // recommended "reset state on prop change" pattern (see
  // https://react.dev/reference/react/useState#storing-information-from-previous-renders).
  // It avoids the "setState inside useEffect" warning by adjusting
  // state during render, which React handles cleanly.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIndex(0);
    // Only clear dismissal when the user actually lands on "/". On
    // navigations to other pages we don't touch it — dismissed is
    // meaningful only in the context of the home page.
    if (pathname === "/") {
      setDismissed(false);
    }
  }

  const isOpen = pathname === "/" && !dismissed;
  if (!isOpen) return null;

  const slides = locale === "mn" ? SLIDES_MN : SLIDES_EN;
  const slide = slides[index];
  const isLast = index === slides.length - 1;
  const isFirst = index === 0;

  const labels =
    locale === "mn"
      ? {
          skip: "Алгасах",
          next: "Дараах",
          prev: "Өмнөх",
          start: "Захиалга өгөх",
        }
      : {
          skip: "Skip",
          next: "Next",
          prev: "Previous",
          start: "Start Booking",
        };

  const close = () => setDismissed(true);

  return (
    <div
      className="fixed inset-0 z-100 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      // Clicking the dark backdrop also closes the modal.
      onClick={close}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl shadow-2xl text-white"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #047857 0%, #064e3b 60%, #022c22 100%)",
        }}
        // Clicks INSIDE the card must not bubble up to the backdrop
        // (otherwise the whole modal would close whenever the user
        // clicks anywhere in it).
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative stars — pointer-events-none so they never
             intercept clicks. */}
        <div className="pointer-events-none absolute inset-0 opacity-40 z-0">
          <div className="absolute top-8 left-10 h-1.5 w-1.5 rounded-full bg-white/70" />
          <div className="absolute top-24 right-16 h-1 w-1 rounded-full bg-white/60" />
          <div className="absolute top-40 left-1/3 h-1 w-1 rounded-full bg-white/50" />
          <div className="absolute bottom-32 right-10 h-1.5 w-1.5 rounded-full bg-white/70" />
          <div className="absolute bottom-16 left-16 h-1 w-1 rounded-full bg-white/60" />
        </div>

        {/* Top-right close control — always visible so the user
             always has an obvious way to exit. */}
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 sm:top-5 sm:right-6 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur px-3 py-1.5 text-sm font-medium text-white transition-colors"
          aria-label={isLast ? "Close" : labels.skip}
        >
          <span>{isLast ? "✕" : labels.skip}</span>
        </button>

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-12 pt-16 sm:pt-20 pb-8 sm:pb-10 min-h-105 sm:min-h-120 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            {!isLast && (
              <div
                className="inline-flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-5xl sm:text-6xl mb-6 sm:mb-8"
                aria-hidden
              >
                {slide.emoji}
              </div>
            )}
            <h2
              id="welcome-title"
              className="text-2xl sm:text-3xl font-bold leading-tight"
            >
              {slide.title}
            </h2>
            {slide.body && (
              <p className="mt-3 sm:mt-4 text-base sm:text-lg text-emerald-50/90 max-w-md">
                {slide.body}
              </p>
            )}
            {slide.bullets && (
              <ul className="mt-6 space-y-3 text-left w-full max-w-md">
                {slide.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 text-emerald-300">✈</span>
                    <span className="text-base sm:text-lg">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Controls: dots + prev/next */}
          <div className="mt-8 flex items-center justify-between gap-3">
            {!isFirst ? (
              <button
                type="button"
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className="inline-flex items-center gap-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur px-4 py-2 text-sm font-semibold transition-colors"
              >
                <span aria-hidden>‹</span>
                <span className="hidden sm:inline">{labels.prev}</span>
              </button>
            ) : (
              <span className="w-16" aria-hidden />
            )}

            <div className="flex items-center gap-2" role="tablist">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>

            {isLast ? (
              <Link
                href="/booking"
                onClick={close}
                className="inline-flex items-center gap-1 rounded-full bg-white text-emerald-800 px-4 py-2 text-sm font-semibold hover:bg-emerald-50 transition-colors"
              >
                {labels.start}
                <span aria-hidden>›</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setIndex((i) => Math.min(slides.length - 1, i + 1))}
                className="inline-flex items-center gap-2 rounded-full bg-white text-emerald-800 px-4 py-2 text-sm font-semibold hover:bg-emerald-50 transition-colors"
              >
                <span className="hidden sm:inline">{labels.next}</span>
                <span aria-hidden>›</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
