interface JsonLdProps {
  data: Record<string, unknown>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Albertson & Weiss Motors",
        description:
          "Plataforma de inversión en vehículos premium americanos importados a Europa.",
        url: "https://albertsonweiss.com",
        logo: "https://albertsonweiss.com/logo.png",
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@albertsonweiss.com",
          contactType: "customer service",
          availableLanguage: "Spanish",
        },
        sameAs: [],
      }}
    />
  );
}

export function FAQSchema({
  items,
}: {
  items: Array<{ question: string; answer: string }>;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

export function ProductSchema({
  name,
  description,
  price,
  currency,
  availability,
  image,
}: {
  name: string;
  description: string;
  price: number;
  currency: string;
  availability: "InStock" | "SoldOut";
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name,
        description,
        image: image ?? undefined,
        offers: {
          "@type": "Offer",
          price,
          priceCurrency: currency,
          availability: `https://schema.org/${availability}`,
        },
      }}
    />
  );
}
