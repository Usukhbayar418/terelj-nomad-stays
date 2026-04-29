import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-stone-600 text-base sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
