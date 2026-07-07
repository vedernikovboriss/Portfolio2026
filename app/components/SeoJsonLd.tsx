import {
  createPersonJsonLd,
  createProfessionalServiceJsonLd,
  createWebsiteJsonLd,
} from "@/app/lib/seo";

export default function SeoJsonLd() {
  const structuredData = [
    createPersonJsonLd(),
    createWebsiteJsonLd(),
    createProfessionalServiceJsonLd(),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
