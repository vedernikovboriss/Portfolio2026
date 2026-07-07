export {
  AUDIO_URLS,
  BOOKING_URL,
  CONTACT_LINKS,
  isExternalUrl,
  MEDIA_CDN_ORIGIN,
  SOCIAL_LINKS,
} from "./externalLinks";

export const FOOTER_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#works", label: "Works" },
  { href: "#contact", label: "Contact" },
] as const;
