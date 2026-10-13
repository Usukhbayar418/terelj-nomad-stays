"use client";

import { useMemo, useState } from "react";
import {
  ACCOMMODATIONS,
  ACTIVITIES,
  TRANSPORTS,
  BOOKING_RULES,
  type AccommodationId,
  type ActivityId,
  type TransportId,
} from "@/lib/booking-config";

// Web3Forms access key for tereljnomadstays.com (info@tereljnomadstays.com).
// This is a public key — safe to commit. Submissions land in the
// info@ inbox (and are then forwarded to both us and Undra via the
// Gmail filter we already set up).
const WEB3FORMS_ACCESS_KEY = "2f7712db-882d-4813-8b36-2fe7d3fe8757";

type ActivitySelection = {
  selected: boolean;
  // For per-hour activities (horse riding) the user picks hours.
  // For per-person activities we use the guest count.
  hours: number;
};

type FormState = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  accommodation: AccommodationId;
  activities: Record<ActivityId, ActivitySelection>;
  transport: TransportId;
  name: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
};

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function nightsBetween(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 0;
  const a = new Date(checkIn).getTime();
  const b = new Date(checkOut).getTime();
  const diff = (b - a) / (1000 * 60 * 60 * 24);
  return diff > 0 ? Math.round(diff) : 0;
}

function daysFromToday(date: string): number {
  if (!date) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
}

const initialActivities: Record<ActivityId, ActivitySelection> = Object.fromEntries(
  ACTIVITIES.map((a) => [a.id, { selected: false, hours: 1 }]),
) as Record<ActivityId, ActivitySelection>;

const minCheckIn = todayPlus(BOOKING_RULES.minAdvanceDays);

export default function BookingForm() {
  const [state, setState] = useState<FormState>({
    checkIn: minCheckIn,
    checkOut: todayPlus(BOOKING_RULES.minAdvanceDays + 1),
    adults: 2,
    children: 0,
    accommodation: "ger",
    activities: initialActivities,
    transport: "none",
    name: "",
    email: "",
    phone: "",
    country: "",
    notes: "",
  });

  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "submitting" }
    | { kind: "success" }
    | { kind: "error"; message: string }
  >({ kind: "idle" });

  const nights = nightsBetween(state.checkIn, state.checkOut);
  const guests = state.adults + state.children;

  // ----- pricing -----
  const accommodation =
    ACCOMMODATIONS.find((a) => a.id === state.accommodation) ?? ACCOMMODATIONS[0];
  const accommodationCost = accommodation.pricePerNight * nights;

  const activitiesCost = ACTIVITIES.reduce((sum, a) => {
    const sel = state.activities[a.id];
    if (!sel?.selected) return sum;
    if (a.id === "horse") return sum + a.pricePerUnit * sel.hours * guests;
    if (a.perPerson) return sum + a.pricePerUnit * guests;
    return sum + a.pricePerUnit;
  }, 0);

  const transport = TRANSPORTS.find((t) => t.id === state.transport) ?? TRANSPORTS[0];
  const transportCost = transport.price;

  const total = accommodationCost + activitiesCost + transportCost;

  // ----- validation -----
  const errors = useMemo<string[]>(() => {
    const errs: string[] = [];
    if (!state.checkIn) errs.push("Pick a check-in date.");
    if (!state.checkOut) errs.push("Pick a check-out date.");
    if (nights < 1) errs.push("Check-out must be after check-in.");
    if (daysFromToday(state.checkIn) < BOOKING_RULES.minAdvanceDays) {
      errs.push(
        `Please book at least ${BOOKING_RULES.minAdvanceDays} days in advance.`,
      );
    }
    if (guests < 1) errs.push("You need at least one guest.");
    if (guests > BOOKING_RULES.maxTotalGuests)
      errs.push(`We can host up to ${BOOKING_RULES.maxTotalGuests} guests.`);
    if (transport.id !== "none" && guests > transport.capacity)
      errs.push(
        `${transport.name} fits up to ${transport.capacity} people. Pick a bigger vehicle.`,
      );
    if (!state.name.trim()) errs.push("Please enter your name.");
    if (!state.email.trim() || !/.+@.+\..+/.test(state.email))
      errs.push("Please enter a valid email.");
    if (!state.phone.trim()) errs.push("Please enter a phone or WhatsApp number.");
    return errs;
  }, [state, nights, guests, transport]);

  // ----- submit -----
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (errors.length > 0) return;

    setStatus({ kind: "submitting" });

    const activityLines = ACTIVITIES.filter((a) => state.activities[a.id]?.selected)
      .map((a) => {
        const sel = state.activities[a.id];
        if (a.id === "horse")
          return `- ${a.name}: ${sel.hours} hour(s) × ${guests} person(s) = $${a.pricePerUnit * sel.hours * guests}`;
        if (a.perPerson)
          return `- ${a.name}: ${guests} person(s) = $${a.pricePerUnit * guests}`;
        return `- ${a.name}: $${a.pricePerUnit}`;
      })
      .join("\n");

    const summary = `
New booking request from tereljnomadstays.com

— STAY —
Check-in:    ${state.checkIn}
Check-out:   ${state.checkOut}
Nights:      ${nights}
Adults:      ${state.adults}
Children:    ${state.children}
Accommodation: ${accommodation.name} ($${accommodation.pricePerNight}/night × ${nights} = $${accommodationCost})

— ACTIVITIES —
${activityLines || "(none)"}

— TRANSPORT —
${transport.id === "none" ? "Guest will arrange own transport" : `${transport.name} ($${transport.price})`}

— TOTAL ESTIMATE —
$${total} USD

— GUEST —
Name:    ${state.name}
Email:   ${state.email}
Phone:   ${state.phone}
Country: ${state.country || "(not provided)"}

— SPECIAL REQUESTS —
${state.notes || "(none)"}
`.trim();

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New booking request — ${state.name} (${state.checkIn} → ${state.checkOut})`,
          from_name: "Tereljnomadstays Booking",
          reply_to: state.email,
          message: summary,
          // also send key fields as separate so they show in email subject lines
          guest_name: state.name,
          guest_email: state.email,
          guest_phone: state.phone,
          check_in: state.checkIn,
          check_out: state.checkOut,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus({ kind: "success" });
      } else {
        setStatus({
          kind: "error",
          message: data.message ?? "Something went wrong — please try again or email us directly.",
        });
      }
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error
            ? err.message
            : "Network error — please try again or email us directly.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-3xl bg-white shadow-xl ring-1 ring-emerald-200 p-8 sm:p-12 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-3xl">
          ✓
        </div>
        <h2 className="mt-4 text-2xl font-bold text-stone-900">Request sent!</h2>
        <p className="mt-3 text-stone-600">
          Thank you, {state.name}. We received your booking request and will reply
          to <strong>{state.email}</strong> within 24 hours to confirm and send a
          final quote.
        </p>
        <p className="mt-2 text-sm text-stone-500">
          For anything urgent, message us on WhatsApp: <strong>+976 8884 9073</strong>
        </p>
      </div>
    );
  }

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setState((s) => ({ ...s, [key]: value }));

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white shadow-xl ring-1 ring-stone-200 p-6 sm:p-10 space-y-10"
    >
      {/* ===== Dates ===== */}
      <section>
        <h2 className="text-lg font-bold text-stone-900">📅 Dates</h2>
        <p className="mt-1 text-sm text-stone-500">
          Please book at least {BOOKING_RULES.minAdvanceDays} days in advance.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-stone-700">Check-in</span>
            <input
              type="date"
              min={minCheckIn}
              value={state.checkIn}
              onChange={(e) => update("checkIn", e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-stone-700">Check-out</span>
            <input
              type="date"
              min={state.checkIn || minCheckIn}
              value={state.checkOut}
              onChange={(e) => update("checkOut", e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </label>
        </div>
        {nights > 0 && (
          <p className="mt-3 text-sm text-emerald-700 font-medium">
            {nights} night{nights > 1 ? "s" : ""}
          </p>
        )}
      </section>

      {/* ===== Guests ===== */}
      <section>
        <h2 className="text-lg font-bold text-stone-900">👥 Guests</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <NumberInput
            label="Adults"
            value={state.adults}
            min={0}
            max={20}
            onChange={(v) => update("adults", v)}
          />
          <NumberInput
            label="Children"
            value={state.children}
            min={0}
            max={20}
            onChange={(v) => update("children", v)}
          />
        </div>
      </section>

      {/* ===== Accommodation ===== */}
      <section>
        <h2 className="text-lg font-bold text-stone-900">🏕 Accommodation</h2>
        <div className="mt-4 space-y-3">
          {ACCOMMODATIONS.map((a) => (
            <label
              key={a.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                state.accommodation === a.id
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-stone-200 bg-white hover:bg-stone-50"
              }`}
            >
              <input
                type="radio"
                name="accommodation"
                value={a.id}
                checked={state.accommodation === a.id}
                onChange={() => update("accommodation", a.id)}
                className="mt-1 text-emerald-600"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-stone-900">{a.name}</span>
                  <span className="text-sm font-semibold text-emerald-700">
                    ${a.pricePerNight}/night
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-600">{a.description}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* ===== Activities ===== */}
      <section>
        <h2 className="text-lg font-bold text-stone-900">🎯 Activities (optional)</h2>
        <div className="mt-4 space-y-3">
          {ACTIVITIES.map((a) => {
            const sel = state.activities[a.id];
            const isHorse = a.id === "horse";
            return (
              <div
                key={a.id}
                className={`rounded-xl border p-4 transition-colors ${
                  sel.selected
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-stone-200 bg-white hover:bg-stone-50"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={sel.selected}
                    onChange={(e) =>
                      setState((s) => ({
                        ...s,
                        activities: {
                          ...s.activities,
                          [a.id]: { ...sel, selected: e.target.checked },
                        },
                      }))
                    }
                    className="mt-1 text-emerald-600"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-stone-900">{a.name}</span>
                      <span className="text-sm font-semibold text-emerald-700">
                        ${a.pricePerUnit} / {a.unit}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone-600">{a.description}</p>
                  </div>
                </label>
                {isHorse && sel.selected && (
                  <div className="mt-3 ml-7">
                    <NumberInput
                      label="Hours per person"
                      value={sel.hours}
                      min={1}
                      max={8}
                      compact
                      onChange={(v) =>
                        setState((s) => ({
                          ...s,
                          activities: {
                            ...s.activities,
                            [a.id]: { ...sel, hours: v },
                          },
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== Transport ===== */}
      <section>
        <h2 className="text-lg font-bold text-stone-900">🚗 Airport / UB Pickup (optional)</h2>
        <p className="mt-1 text-sm text-stone-500">
          One-way pickup from Ulaanbaatar to camp. Prices are estimates and
          confirmed in the reply email.
        </p>
        <div className="mt-4 space-y-3">
          {TRANSPORTS.map((t) => (
            <label
              key={t.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                state.transport === t.id
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-stone-200 bg-white hover:bg-stone-50"
              }`}
            >
              <input
                type="radio"
                name="transport"
                value={t.id}
                checked={state.transport === t.id}
                onChange={() => update("transport", t.id)}
                className="mt-1 text-emerald-600"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-stone-900">{t.name}</span>
                  {t.id !== "none" && (
                    <span className="text-sm font-semibold text-emerald-700">
                      ${t.price}
                    </span>
                  )}
                </div>
                {t.note && (
                  <p className="mt-1 text-sm text-stone-600">{t.note}</p>
                )}
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* ===== Contact ===== */}
      <section>
        <h2 className="text-lg font-bold text-stone-900">📞 Your Details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <TextInput
            label="Full name *"
            value={state.name}
            onChange={(v) => update("name", v)}
          />
          <TextInput
            label="Email *"
            type="email"
            value={state.email}
            onChange={(v) => update("email", v)}
          />
          <TextInput
            label="Phone / WhatsApp *"
            value={state.phone}
            placeholder="+1 555 123 4567"
            onChange={(v) => update("phone", v)}
          />
          <TextInput
            label="Country"
            value={state.country}
            onChange={(v) => update("country", v)}
          />
        </div>
        <label className="mt-4 block">
          <span className="text-sm font-medium text-stone-700">
            Special requests (optional)
          </span>
          <textarea
            value={state.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={4}
            placeholder="Dietary restrictions, anniversary, photographer, anything we should know..."
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </label>
      </section>

      {/* ===== Summary + submit ===== */}
      <section className="rounded-2xl bg-stone-900 text-white p-6 sm:p-8">
        <h2 className="text-lg font-bold">Summary</h2>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex justify-between">
            <span className="text-stone-300">
              {accommodation.name} × {nights} night{nights !== 1 ? "s" : ""}
            </span>
            <span>${accommodationCost}</span>
          </li>
          {ACTIVITIES.filter((a) => state.activities[a.id]?.selected).map((a) => {
            const sel = state.activities[a.id];
            const cost =
              a.id === "horse"
                ? a.pricePerUnit * sel.hours * guests
                : a.perPerson
                  ? a.pricePerUnit * guests
                  : a.pricePerUnit;
            return (
              <li key={a.id} className="flex justify-between">
                <span className="text-stone-300">{a.name}</span>
                <span>${cost}</span>
              </li>
            );
          })}
          {transport.id !== "none" && (
            <li className="flex justify-between">
              <span className="text-stone-300">{transport.name}</span>
              <span>${transport.price}</span>
            </li>
          )}
          <li className="flex justify-between border-t border-stone-700 pt-3 mt-3 text-lg font-bold">
            <span>Total estimate</span>
            <span>${total} USD</span>
          </li>
        </ul>

        {errors.length > 0 && (
          <ul className="mt-6 list-disc list-inside text-sm text-amber-300 space-y-1">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}

        {status.kind === "error" && (
          <p className="mt-4 text-sm text-rose-300">{status.message}</p>
        )}

        <button
          type="submit"
          disabled={errors.length > 0 || status.kind === "submitting"}
          className="mt-6 w-full rounded-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-stone-600 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 transition-colors"
        >
          {status.kind === "submitting" ? "Sending..." : "Send Booking Request"}
        </button>
        <p className="mt-3 text-xs text-stone-400 text-center">
          We&apos;ll reply within 24 hours via email to confirm and send a final quote.
        </p>
      </section>
    </form>
  );
}

// ----- small helpers -----

function NumberInput({
  label,
  value,
  min,
  max,
  onChange,
  compact = false,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  compact?: boolean;
}) {
  return (
    <label className={`block ${compact ? "" : ""}`}>
      <span className="text-sm font-medium text-stone-700">{label}</span>
      <div className="mt-1 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-9 w-9 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="w-12 text-center font-semibold">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-9 w-9 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </label>
  );
}

function TextInput({
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
