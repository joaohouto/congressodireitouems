import { appConfig } from "@/config/app";

export function EventJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Event", "EducationEvent"],
    name: appConfig.title,
    description: appConfig.description,
    startDate: "2026-11-04T19:00:00-04:00",
    endDate: "2026-11-06T22:00:00-04:00",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [`${appConfig.siteUrl}${appConfig.ogImage}`],
    location: {
      "@type": "Place",
      name: appConfig.place,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "Rodovia Graziela Maciel Barroso, Km 12 Zona Rural - Camisão",
        addressLocality: "Aquidauana",
        addressRegion: "MS",
        postalCode: "79200-000",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: appConfig.placeCoordinates.lat,
        longitude: appConfig.placeCoordinates.lng,
      },
    },
    organizer: {
      "@type": "EducationalOrganization",
      name: "Curso de Direito da Universidade Estadual de Mato Grosso do Sul (UEMS) - Aquidauana",
      url: "https://www.uems.br",
    },
    performer: [
      {
        "@type": "Person",
        name: "Ulisses Schwartz",
        jobTitle: "Palestrante Convidado",
      },
      {
        "@type": "Person",
        name: "Diego Bianchi",
        jobTitle: "Palestrante Convidado",
      },
      {
        "@type": "Person",
        name: "Luiza Faccin",
        jobTitle: "Palestrante Convidada",
      },
      {
        "@type": "Person",
        name: "Tiago Bunning",
        jobTitle: "Palestrante Convidado",
      },
    ],
    offers: {
      "@type": "Offer",
      url: appConfig.subscriptionForm || appConfig.siteUrl,
      price: "0",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      validFrom: appConfig.subscriptionStart,
    },
    inLanguage: "pt-BR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
