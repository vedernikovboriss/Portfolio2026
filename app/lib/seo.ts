import type { Metadata } from "next";
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_TITLE,
  SITE_URL,
} from "@/app/data/site";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/$/, "");
}

/**
 * Always prefer the production domain for canonical, Open Graph, sitemap,
 * and JSON-LD. Preview/deployment hosts (VERCEL_URL) must never leak into SEO.
 */
export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return SITE_URL;
}

export function absoluteUrl(path = "/") {
  const base = getSiteUrl();
  if (path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createSiteMetadata({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  path = "/",
  image = SITE_OG_IMAGE,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: typeof SITE_OG_IMAGE;
} = {}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image.path);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: [...SITE_KEYWORDS],
    authors: [{ name: SITE_AUTHOR.name, url: getSiteUrl() }],
    creator: SITE_AUTHOR.name,
    publisher: SITE_AUTHOR.name,
    category: "technology",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export function createPersonJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: SITE_AUTHOR.name,
    jobTitle: SITE_AUTHOR.jobTitle,
    url: siteUrl,
    email: `mailto:${SITE_AUTHOR.email}`,
    telephone: SITE_AUTHOR.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Valencia",
      addressCountry: "ES",
    },
    sameAs: SITE_AUTHOR.sameAs,
    knowsAbout: SITE_AUTHOR.knowsAbout,
  };
}

export function createWebsiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
  };
}

export function createProfessionalServiceJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#services`,
    name: `${SITE_NAME} — Web Development & Design`,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Valencia",
      addressCountry: "ES",
    },
    provider: {
      "@id": `${siteUrl}/#person`,
    },
    serviceType: [
      "Web Development",
      "Web Design",
      "Motion Design",
      "SEO Optimization",
    ],
  };
}
