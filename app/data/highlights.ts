type HighlightItem = {
  id: number;
  title: string;
  description: string;
  year: number;
  industry: string;
  country?: string;
  type: string;
  videoSrc: string;
  imageSrc: string;
  link?: string;
};

export const highlightItems: HighlightItem[] = [
  {
    id: 1,
    title: "Architech",
    description:
      "Project exploring the use of generative AI in Architecture. Developed and designed the website as well as conducted the experiments displayed on the website.",
    year: 2026,
    industry: "Case Study",
    type: "Full Stack",
    country: "Spain",
    videoSrc:
      "https://portfolio-boris-vedernikov.b-cdn.net/architechCompressed2.mp4",
    imageSrc: "/HighlightsBG/Architechbg.webp",
  },
  {
    id: 2,
    title: "HSCS",
    description:
      "A concept website based on the paper written by me about the Spanish Civil War and built for educational purposes.",
    year: 2025,
    industry: "Case Study",
    type: "Full Stack",
    country: "Spain",
    videoSrc: "https://portfolio-boris-vedernikov.b-cdn.net/HSCScompressed.mp4",
    imageSrc: "/HighlightsBG/HSCSbg.avif",
  },
  {
    id: 3,
    title: "TehOtdel",
    description:
      "Developed and designed a website for a company in Saint Petersburg that provides door installation services.",
    year: 2025,
    industry: "Door Installation",
    type: "Web Development",
    country: "Russia",
    videoSrc:
      "https://portfolio-boris-vedernikov.b-cdn.net/tehOtdelCompressed.mp4",
    imageSrc: "/HighlightsBG/Tehotdelbg.avif",
    link: "https://техотдел.com/",
  },
];
