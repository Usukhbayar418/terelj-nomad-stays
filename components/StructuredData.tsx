import { SITE } from "@/lib/site";

// JSON-LD structured data so search engines and AI answer engines
// (Google, Bing, ChatGPT, Claude, Perplexity, etc.) understand:
//  - This is a lodging business (LodgingBusiness)
//  - Common visitor questions and answers (FAQPage)
//  - The tours we offer (TouristTrip)
export default function StructuredData() {
  // 1. The lodging business itself
  const business = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    alternateName: SITE.shortName,
    description: SITE.description,
    url: SITE.url,
    image: [SITE.ogImage],
    telephone: SITE.business.telephone,
    priceRange: SITE.business.priceRange,
    address: {
      "@type": "PostalAddress",
      addressCountry: SITE.business.address.addressCountry,
      addressRegion: SITE.business.address.addressRegion,
      addressLocality: SITE.business.address.addressLocality,
      streetAddress: SITE.business.address.streetAddress,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.business.geo.latitude,
      longitude: SITE.business.geo.longitude,
    },
    sameAs: [SITE.business.instagram],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Riverside location",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Traditional ger accommodation",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Camping tents",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Horse riding",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Bonfire & stargazing",
        value: true,
      },
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Traditional Ger Stay",
        priceCurrency: "USD",
        price: 90,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: 90,
          priceCurrency: "USD",
          unitText: "per night",
        },
      },
      {
        "@type": "Offer",
        name: "Camping Tent Stay",
        priceCurrency: "USD",
        price: 50,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: 50,
          priceCurrency: "USD",
          unitText: "per night",
        },
      },
    ],
  };

  // 2. FAQs that real travelers ask. Surfaces directly in Google /
  //    Bing rich results AND gives AI answer engines clean Q&A pairs.
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is Nomad Riverside Stay Terelj located?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We are a small private ger camp located right on the Tuul River inside Gorkhi-Terelj National Park, Töv Province, Mongolia — about 70 km (1.5 to 2 hours) from Ulaanbaatar. Our coordinates are approximately 47.97°N, 107.46°E.",
        },
      },
      {
        "@type": "Question",
        name: "How far is the camp from Ulaanbaatar?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "About 70 km, or roughly 1.5 to 2 hours by car on paved road. We can help arrange a private transfer or airport pickup with advance notice.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best time of year to visit Terelj?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "May to early October is the best season. June and September have mild weather and fewer tourists, July and August are warmest and best for camping. The camp is typically closed in winter (November–April) due to extreme cold.",
        },
      },
      {
        "@type": "Question",
        name: "How much does a stay cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "A traditional Mongolian ger is $90 per night for up to 4 people. A camping tent is $50 per night for up to 4 people. Bundled packages including tours, horse riding and meals start from around $130 per person.",
        },
      },
      {
        "@type": "Question",
        name: "What activities can we do at the camp?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Horse riding ($20–25/hour), camel riding ($20/hour), traditional Mongolian khorkhog BBQ ($30/person), bonfire and stargazing nights ($15/person), and guided day tours to Turtle Rock, Aryabal Meditation Temple, and the Chinggis Khan Equestrian Statue.",
        },
      },
      {
        "@type": "Question",
        name: "What other attractions are nearby?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Within easy reach: Turtle Rock (Melkhii Khad, ~15 min), Aryabal Meditation Temple (~30 min), and the world's largest equestrian statue — the Chinggis Khan Statue (~1 hour). Khustai National Park, home to the wild Przewalski's horse, is reachable as a separate day trip from Ulaanbaatar.",
        },
      },
      {
        "@type": "Question",
        name: "How can I book a stay?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "The fastest way is WhatsApp at +976 8884 9073 or email info@tereljnomadstays.com. You can also book via our Airbnb listing 'Nomad Riverside Stay Terelj'. Advance booking is strongly recommended, especially in July and August.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer English-speaking service?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. We host both Mongolian and international guests and communicate in English by WhatsApp, email and on site.",
        },
      },
    ],
  };

  // 3. Tours, modeled as TouristTrip entities so AI travel assistants
  //    can recommend them when users ask "things to do near Terelj".
  const tours = [
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "@id": `${SITE.url}/tours#terelj-park-tour`,
      name: "Terelj National Park Tour",
      description:
        "Private guided day tour of Gorkhi-Terelj National Park including Turtle Rock (Melkhii Khad) and the Aryabal Meditation Temple. Includes private car and driver.",
      url: `${SITE.url}/tours`,
      provider: { "@id": `${SITE.url}/#business` },
      touristType: ["Couples", "Families", "Small groups"],
      itinerary: [
        { "@type": "TouristAttraction", name: "Turtle Rock (Melkhii Khad)" },
        { "@type": "TouristAttraction", name: "Aryabal Meditation Temple" },
      ],
      offers: {
        "@type": "Offer",
        price: 100,
        priceCurrency: "USD",
        description: "Total price for 2–4 people",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "@id": `${SITE.url}/tours#chinggis-khan-statue`,
      name: "Chinggis Khan Equestrian Statue Tour",
      description:
        "Day trip from the camp to the world's largest equestrian statue — the 40-meter Chinggis Khan Equestrian Statue Complex.",
      url: `${SITE.url}/tours`,
      provider: { "@id": `${SITE.url}/#business` },
      itinerary: [
        {
          "@type": "TouristAttraction",
          name: "Chinggis Khan Equestrian Statue Complex",
        },
      ],
      offers: {
        "@type": "Offer",
        price: 30,
        priceCurrency: "USD",
        description: "Per person, entry ticket not included",
      },
    },
  ];

  // Render each schema as its own JSON-LD <script> block — Google's
  // recommended pattern for multiple schemas on one page.
  const blocks = [business, faq, ...tours];

  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
