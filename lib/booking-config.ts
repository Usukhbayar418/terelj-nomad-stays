// Pricing and options used by the /booking page. Edit this file
// to update prices and add/remove options.
//
// All prices are in USD.

export const ACCOMMODATIONS = [
  {
    id: "ger",
    name: "Traditional Ger",
    pricePerNight: 90,
    description: "Warm felt-walled ger with comfortable beds. Up to 4 people.",
    maxGuests: 4,
  },
  {
    id: "tent",
    name: "Camping Tent",
    pricePerNight: 50,
    description: "2-room outdoor tent. Up to 4 people. Weather dependent.",
    maxGuests: 4,
  },
] as const;

export type AccommodationId = (typeof ACCOMMODATIONS)[number]["id"];

export const ACTIVITIES = [
  {
    id: "horse",
    name: "Horse Riding",
    pricePerUnit: 25,
    unit: "hour / person",
    perPerson: true,
    description: "Sturdy small horses, guide included. Min 1 hour.",
  },
  {
    id: "khorkhog",
    name: "Khorkhog (Mongolian BBQ)",
    pricePerUnit: 30,
    unit: "person",
    perPerson: true,
    description: "Traditional lamb cooked with hot stones. Min 2 people.",
  },
  {
    id: "bonfire",
    name: "Bonfire & Stargazing",
    pricePerUnit: 15,
    unit: "person",
    perPerson: true,
    description: "Fire, tea, marshmallows, dark-sky stargazing.",
  },
  {
    id: "terelj-tour",
    name: "Terelj Park Tour",
    pricePerUnit: 100,
    unit: "tour (2-4 people)",
    perPerson: false,
    description: "Turtle Rock + Aryabal Temple, private driver.",
  },
  {
    id: "chinggis-tour",
    name: "Chinggis Khan Statue Tour",
    pricePerUnit: 30,
    unit: "person",
    perPerson: true,
    description: "World's largest equestrian statue (entry not included).",
  },
] as const;

export type ActivityId = (typeof ACTIVITIES)[number]["id"];

// Airport / Ulaanbaatar pickup options. Prices TBD — we'll confirm
// them once the family checks with the relative who owns the mini bus.
export const TRANSPORTS = [
  {
    id: "none",
    name: "I'll arrange my own transport",
    price: 0,
    capacity: 0,
    note: "",
  },
  {
    id: "harrier",
    name: "Toyota Harrier",
    price: 70, // TODO: confirm with family
    capacity: 3,
    note: "1–3 people",
  },
  {
    id: "vellfire",
    name: "Toyota Vellfire",
    price: 120, // TODO: confirm with family
    capacity: 7,
    note: "1–7 people",
  },
  {
    id: "minibus",
    name: "Mini Bus",
    price: 180, // TODO: confirm with family — relative's mini bus
    capacity: 11,
    note: "8–11 people",
  },
] as const;

export type TransportId = (typeof TRANSPORTS)[number]["id"];

export const BOOKING_RULES = {
  // Minimum days in advance a booking request must be submitted.
  minAdvanceDays: 2,
  // Maximum number of guests we can host at once (3 gers + 2 tents).
  maxTotalGuests: 20,
};
