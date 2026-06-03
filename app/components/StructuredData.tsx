export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Luxury Taxi Limo",
    url: "https://luxurytaxilimo.com",
    telephone: "+31 6 38352022",
    email: "info@luxurytaxilimo.nl",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Oost-Dorsch 125",
      addressLocality: "Zaandam",
      postalCode: "1504 BN",
      addressCountry: "NL",
    },
    sameAs: [],
    description:
      "Luxury private chauffeur, airport transfers, tours and helicopter services in Europe.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}