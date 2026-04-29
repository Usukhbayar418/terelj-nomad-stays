"use client";

import Image from "next/image";
import type { ReactNode } from "react";

export default function PageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-white">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight max-w-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-xl text-base sm:text-lg text-stone-100/90">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
