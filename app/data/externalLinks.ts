export const MEDIA_CDN_ORIGIN = "https://portfolio-boris-vedernikov.b-cdn.net";

export const AUDIO_URLS = {
  ambient: `${MEDIA_CDN_ORIGIN}/audio/portfolioAudio.mp3`,
  hover: `${MEDIA_CDN_ORIGIN}/audio/hoverClick2.mp3`,
} as const;

export const WORKFLOW_URL = `${MEDIA_CDN_ORIGIN}/workflow.mp4`;

export const BOOKING_URL = "https://cal.com/boris-vedernikov/30min";

export const SOCIAL_LINKS = {
  linkedin: {
    href: "https://www.linkedin.com/in/borisvedernikov/",
    label: "LinkedIn",
  },
  instagram: {
    href: "https://www.instagram.com/bv_dsgn/",
    label: "Instagram",
  },
} as const;

export const CONTACT_LINKS = {
  email: {
    href: "mailto:vedernikovboris4@gmail.com",
    label: "vedernikovboris4@gmail.com",
  },
  phone: {
    href: "tel:+34634814498",
    label: "+34 (634) 814 498",
  },
  location: "Valencia, Spain",
} as const;

export function isExternalUrl(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}
