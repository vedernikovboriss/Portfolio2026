import { CONTACT_LINKS, SOCIAL_LINKS } from "./externalLinks";

export const SITE_NAME = "Boris Vedernikov";

export const SITE_TITLE =
  "Boris Vedernikov | Creative Frontend Developer in Valencia";

export const SITE_DESCRIPTION =
  "Portfolio of Boris Vedernikov, an independent creative frontend developer specializing in Next.js, Webflow, motion design, and immersive brand websites for studios and ambitious brands.";

export const SITE_KEYWORDS = [
  "Boris Vedernikov",
  "creative frontend developer",
  "frontend developer Valencia",
  "Next.js developer",
  "Webflow developer",
  "portfolio",
  "motion design",
  "GSAP",
  "Framer Motion",
  "web design",
  "web development",
  "immersive websites",
] as const;

export const SITE_LOCALE = "en_US";

export const SITE_AUTHOR = {
  name: SITE_NAME,
  email: CONTACT_LINKS.email.label,
  phone: CONTACT_LINKS.phone.label,
  location: CONTACT_LINKS.location,
  jobTitle: "Creative Frontend Developer",
  sameAs: [SOCIAL_LINKS.linkedin.href, SOCIAL_LINKS.instagram.href],
  knowsAbout: [
    "Next.js",
    "Webflow",
    "GSAP",
    "Framer Motion",
    "Lenis",
    "Barba.js",
    "Motion Design",
    "SEO",
    "Web Performance",
  ],
} as const;

export const SITE_OG_IMAGE = {
  path: "/imgBalcony.avif",
  width: 1200,
  height: 630,
  alt: "Boris Vedernikov — Creative Frontend Developer portfolio",
} as const;
