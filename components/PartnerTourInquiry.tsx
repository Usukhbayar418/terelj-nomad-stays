"use client";

import { useState } from "react";
import type { PartnerTour } from "@/lib/partner-tours-config";

const WEB3FORMS_ACCESS_KEY = "2f7712db-882d-4813-8b36-2fe7d3fe8757";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function PartnerTourInquiry({
  tour,
  onClose,
}: {
  tour: PartnerTour;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [travelers, setTravelers] = useState(2);
  const [preferredDates, setPreferredDates] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const errors: string[] = [];
  if (!name.trim()) errors.push("Please enter your name.");
  if (!email.trim() || !/.+@.+\..+/.test(email))
    errors.push("Please enter a valid email.");
  if (travelers < 1) errors.push("At least 1 traveler.");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (errors.length > 0) return;
    setStatus({ kind: "submitting" });

    const summary = `
New partner tour inquiry from tereljnomadstays.com

— TOUR —
Tour:        ${tour.name}
Destination: ${tour.destination}
Duration:    ${tour.durationDays} day(s)
From:        $${tour.priceFrom} / person

— GUEST —
Name:        ${name}
Email:       ${email}
Phone:       ${phone || "(not provided)"}
Country:     ${country || "(not provided)"}
Travelers:   ${travelers}
Preferred dates: ${preferredDates || "(flexible)"}

— NOTES —
${notes || "(none)"}

Action: contact our partner operator and reply with quote.
`.trim();

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Partner tour inquiry — ${tour.name} (${name})`,
          from_name: "Tereljnomadstays Partner Tours",
          reply_to: email,
          message: summary,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ kind: "success" });
      } else {
        setStatus({
          kind: "error",
          message: data.message ?? "Something went wrong — please try again.",
        });
      }
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error ? err.message : "Network error — please try again.",
      });
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 h-9 w-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"
          aria-label="Close"
        >
          ✕
        </button>

        {status.kind === "success" ? (
          <div className="text-center py-6">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-3xl">
              ✓
            </div>
            <h3 className="mt-4 text-xl font-bold text-stone-900">
              Inquiry sent!
            </h3>
            <p className="mt-3 text-stone-600 text-sm">
              Thank you, {name}. We&apos;ll contact our partner operator and reply
              to <strong>{email}</strong> with a tailored quote within 24 hours.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex items-center rounded-full bg-emerald-700 text-white px-6 py-2.5 font-semibold hover:bg-emerald-800"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">
                Inquiry
              </p>
              <h3 className="mt-1 text-2xl font-bold text-stone-900">
                {tour.name}
              </h3>
              <p className="mt-1 text-sm text-stone-500">
                {tour.destination} · {tour.durationDays} day
                {tour.durationDays > 1 ? "s" : ""} · from ${tour.priceFrom}/person
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Full name *"
                value={name}
                onChange={setName}
              />
              <Field
                label="Email *"
                type="email"
                value={email}
                onChange={setEmail}
              />
              <Field
                label="Phone / WhatsApp"
                value={phone}
                onChange={setPhone}
                placeholder="+1 555 123 4567"
              />
              <Field
                label="Country"
                value={country}
                onChange={setCountry}
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-stone-700">
                  Travelers
                </span>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={travelers}
                  onChange={(e) => setTravelers(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-stone-700">
                  Preferred dates
                </span>
                <input
                  type="text"
                  value={preferredDates}
                  onChange={(e) => setPreferredDates(e.target.value)}
                  placeholder="e.g. July 10–17 or flexible"
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-medium text-stone-700">
                Anything else? (optional)
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Combine with Terelj stay, dietary needs, etc."
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </label>

            {errors.length > 0 && (
              <ul className="text-xs text-amber-700 list-disc list-inside space-y-0.5">
                {errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            )}

            {status.kind === "error" && (
              <p className="text-xs text-rose-600">{status.message}</p>
            )}

            <button
              type="submit"
              disabled={errors.length > 0 || status.kind === "submitting"}
              className="w-full rounded-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-stone-400 disabled:cursor-not-allowed text-white font-semibold px-6 py-3"
            >
              {status.kind === "submitting" ? "Sending..." : "Send Inquiry"}
            </button>
            <p className="text-xs text-stone-500 text-center">
              We&apos;ll reply within 24 hours with a tailored quote.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
      />
    </label>
  );
}
