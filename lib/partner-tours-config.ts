// Partner tours we recommend in addition to our own camp packages.
//
// These are placeholder tours / estimated prices so the page has
// real content to show. Edit this file once you've spoken to the
// partner operators and confirmed actual pricing, dates, and
// inclusions.
//
// To add a new partner tour: append an object to PARTNER_TOURS.
// To remove one: delete its entry.

export type PartnerTour = {
  slug: string;
  name: string;
  destination: string;
  durationDays: number;
  // Rough price guide in USD per person. Real quote sent by us via
  // email after the inquiry is received.
  priceFrom: number;
  description: string;
  highlights: string[];
  bestSeason: string;
  // Unsplash placeholder until we have real photos.
  image: string;
  // Optional badge ("Most popular", "Editor's pick", etc.)
  badge?: string;
};

export const PARTNER_TOURS: PartnerTour[] = [
  {
    slug: "khustai-national-park",
    name: "Khustai National Park Day Trip",
    destination: "Khustai NP, ~100 km west of Ulaanbaatar",
    durationDays: 1,
    priceFrom: 90,
    description:
      "Spot wild Przewalski's horses (takhi) — the only truly wild horse species left in the world — in their natural habitat. A perfect single-day add-on to a Terelj stay.",
    highlights: [
      "Wild Przewalski's horses (takhi)",
      "Marmots, red deer, gazelle",
      "Visitor center with conservation story",
      "Picnic lunch in the steppe",
    ],
    bestSeason: "May – October",
    image:
      "https://images.unsplash.com/photo-1553284965-4dcb6884cb73?auto=format&fit=crop&w=1200&q=80",
    badge: "Most popular add-on",
  },
  {
    slug: "khovsgol-lake",
    name: "Khövsgöl Lake — The Blue Pearl",
    destination: "Khövsgöl Aimag, northern Mongolia",
    durationDays: 5,
    priceFrom: 650,
    description:
      "Mongolia's deepest, clearest lake — often called the Switzerland of Mongolia. Stay in lakeside ger camps, ride reindeer with the Tsaatan, and watch the sunset over pristine alpine waters.",
    highlights: [
      "Khövsgöl Lake (Mongolia's 'Blue Pearl')",
      "Tsaatan reindeer herders",
      "Horseback riding through larch forest",
      "Star-filled alpine skies",
    ],
    bestSeason: "June – early September",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    badge: "Bucket list",
  },
  {
    slug: "gobi-desert",
    name: "Gobi Desert Adventure",
    destination: "South Gobi (Ömnögovi Aimag)",
    durationDays: 6,
    priceFrom: 750,
    description:
      "The full Gobi experience — singing sand dunes at Khongoryn Els, the flaming cliffs of Bayanzag where dinosaur eggs were first found, ice canyons, and camel riding through the world's largest cold desert.",
    highlights: [
      "Khongoryn Els singing sand dunes",
      "Bayanzag Flaming Cliffs (dinosaur eggs)",
      "Yolyn Am ice canyon",
      "Two-humped Bactrian camel ride",
    ],
    bestSeason: "May – October",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "tsagaan-suvarga",
    name: "Tsagaan Suvarga White Stupa",
    destination: "Middle Gobi (Dundgovi Aimag)",
    durationDays: 3,
    priceFrom: 320,
    description:
      "A 60-meter cliff of red, white and orange sediment layers that look like a giant ruined temple in the middle of the steppe. One of Mongolia's most photographed landscapes.",
    highlights: [
      "Tsagaan Suvarga rock formation",
      "Ongiin Khiid monastery ruins",
      "Steppe nomadic family visit",
      "Star photography in dark skies",
    ],
    bestSeason: "May – October",
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "karakorum-erdene-zuu",
    name: "Karakorum & Erdene Zuu Monastery",
    destination: "Övörkhangai Aimag, central Mongolia",
    durationDays: 2,
    priceFrom: 260,
    description:
      "Visit the legendary ancient capital of the Mongol Empire and Erdene Zuu — Mongolia's oldest Buddhist monastery, built from the stones of Chinggis Khan's lost city.",
    highlights: [
      "Erdene Zuu Monastery (1585)",
      "Site of Karakorum ancient capital",
      "Orkhon Valley UNESCO site",
      "Local nomadic life",
    ],
    bestSeason: "May – October",
    image:
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "altai-eagle-hunters",
    name: "Western Altai & Eagle Hunters",
    destination: "Bayan-Ölgii Aimag, far western Mongolia",
    durationDays: 8,
    priceFrom: 1100,
    description:
      "Travel deep into the snow-capped Altai mountains to meet the legendary Kazakh eagle hunters and stay with their nomadic families. Best in autumn, peaks in early October at the Eagle Festival.",
    highlights: [
      "Stay with a Kazakh eagle hunter family",
      "Altai Tavan Bogd glaciers",
      "Kazakh embroidery & cuisine",
      "Optional Eagle Festival (early October)",
    ],
    bestSeason: "Late June – early October",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    badge: "Once-in-a-lifetime",
  },
];
