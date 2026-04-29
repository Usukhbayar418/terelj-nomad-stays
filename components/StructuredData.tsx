import { SITE } from "@/lib/site";

// JSON-LD structured data so Google understands this is a lodging
// business and can show rich results (map card, price, etc.)
export default function StructuredData() {
  const data = {
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

  return (
    <script
      type="application/ld+json"
      // Next.js requires dangerouslySetInnerHTML for inline JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
