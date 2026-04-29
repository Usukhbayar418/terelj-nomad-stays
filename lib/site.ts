// Centralised site-wide info used across SEO, metadata and structured data.
// Update these values once and they propagate everywhere.

export const SITE = {
  name: "Nomad Riverside Stay Terelj",
  shortName: "Nomad Terelj",
  url: "https://tereljnomadstays.com",

  // Used for OG/Twitter cards and search snippets
  description:
    "Туул голын эрэг, Тэрэлжийн БЦГ-ийн дотор байрлах жижиг хувийн ger camp. Гэр + майхан, аялал, морины уналт, хорхог, гал тойруу од харах. Authentic Mongolian ger stay near Ulaanbaatar.",

  // Open Graph / Twitter share image (1200×630 ideal)
  ogImage:
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",

  locales: ["mn-MN", "en-US"] as const,
  defaultLocale: "mn-MN" as const,

  // Business info — used for JSON-LD structured data
  business: {
    type: "LodgingBusiness",
    telephone: "+97699822851",
    email: "",
    priceRange: "$$",
    address: {
      addressCountry: "MN",
      addressRegion: "Töv",
      addressLocality: "Gorkhi-Terelj National Park",
      streetAddress: "Tuul Riverside, Terelj",
    },
    // Approximate coordinates inside Terelj National Park
    geo: { latitude: 47.97, longitude: 107.46 },
    instagram: "https://instagram.com/nomad_terelj",
  },

  keywords: [
    "Terelj",
    "Тэрэлж",
    "Тэрэлж амралт",
    "ger camp Mongolia",
    "yurt stay Mongolia",
    "Terelj National Park",
    "Tuul River",
    "Туул гол",
    "Mongolian ger stay",
    "Chinggis Khan statue tour",
    "horse riding Mongolia",
    "khorkhog",
    "Ulaanbaatar accommodation",
    "Mongolia camping",
    "authentic Mongolia",
  ],
} as const;
