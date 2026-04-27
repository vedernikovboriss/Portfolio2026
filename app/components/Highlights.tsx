"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type HighlightItem = {
  id: number;
  title: string;
  description: string;
  year: number;
  industry: string;
  type: string;
  videoSrc: string;
  imageSrc: string;
};

const highlightItems: HighlightItem[] = [
  {
    id: 1,
    title: "Architech",
    description:
      "Architech is a platform that allows you to create and manage your projects. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    year: 2026,
    industry: "Case Study",
    type: "Full Stack",
    videoSrc: "https://portfolio-boris-vedernikov.b-cdn.net/objectiver.mp4",
    imageSrc: "/bgPhotos/bg3.avif",
  },
  {
    id: 2,
    title: "VoiceTool AI",
    description:
      "Developed and designed a technological modern website for an AI agency that offers automatisation services with AI.",
    year: 2025,
    industry: "Consulting",
    type: "Full Stack",
    videoSrc:
      "https://portfolio-boris-vedernikov.b-cdn.net/VoiceToolAI_Compressed.mp4",
    imageSrc: "/bgPhotos/bg1.avif",
  },
  {
    id: 3,
    title: "HSCS",
    description:
      "A concept website based on the paper written by me about the Spanish Civil War and built for educational purposes.",
    year: 2025,
    industry: "Case Study",
    type: "Full Stack",
    videoSrc:
      "https://portfolio-boris-vedernikov.b-cdn.net/LiftlyAICompressed.mp4",
    imageSrc: "/bgPhotos/bg2.avif",
  },
  {
    id: 4,
    title: "HSCS",
    description:
      "A concept website based on the paper written by me about the Spanish Civil War and built for educational purposes.",
    year: 2025,
    industry: "Case Study",
    type: "Full Stack",
    videoSrc:
      "https://portfolio-boris-vedernikov.b-cdn.net/LiftlyAICompressed.mp4",
    imageSrc: "/bgPhotos/bg2.avif",
  },
];

const Highlights = () => {
  return (
    <section id="works" className="section-base flex flex-col gap-16">
      <div className="flex flex-col gap-4">
        <div className="w-full h-px bg-foreground/10" />
        <div className="flex justify-between lg:grid gap-4 lg:grid-cols-2 lg:gap-16">
          <span className="subtitle-small">Selected Work</span>
          <div className="flex items-center justify-between gap-4">
            <span className="subtitle-small hidden lg:block">Highlights</span>
            <span className="subtitle-small lg:hidden">
              {highlightItems.length < 10
                ? `0${highlightItems.length} Items`
                : `${highlightItems.length} Items`}
            </span>
            <span className="subtitle-small hidden lg:block">Visuals</span>
          </div>
        </div>
      </div>
      <Project />
    </section>
  );
};

export default Highlights;

export const Project = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = highlightItems[activeIndex];
  const totalItems = highlightItems.length;
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    },
  };

  const contentItemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const previousProject = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const slideCounter = `${String(activeIndex + 1).padStart(2, "0")} / ${String(
    totalItems,
  ).padStart(2, "0")}`;

  return (
    <>
      {/* Tablet & phone: all projects stacked, text + video per card */}
      <div className="flex flex-col gap-16 lg:hidden">
        {highlightItems.map((item, index) => (
          <article key={item.id} className="flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              <div className="w-full flex justify-between items-center">
                <span className="p-big">{item.title}</span>
                <span className="subtitle-small text-2xl!">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </span>
              </div>
              <HighlightMetaRows item={item} />
              <p className="text-base">{item.description}</p>
            </div>
            <div className="relative w-full aspect-square overflow-hidden rounded-sm">
              <ProjectVideo src={item.videoSrc} imageSrc={item.imageSrc} />
            </div>
          </article>
        ))}
      </div>

      {/* Laptop+: single active project + slider controls */}
      <div className="hidden grid-cols-2 gap-16 lg:grid">
        <div className="flex flex-col gap-8 justify-between">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeItem.id}
              className="flex flex-col gap-8"
              variants={contentVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.span variants={contentItemVariants} className="p-big">
                {activeItem.title}
              </motion.span>
              <motion.div
                variants={contentItemVariants}
                className="flex flex-col"
              >
                <motion.div
                  variants={contentItemVariants}
                  className="flex items-center justify-between gap-2 border-y border-foreground/10 rounded-sm py-4"
                >
                  <span className="subtitle-small text-xs!">Year</span>
                  <span className="subtitle-small opacity-100! text-xs!">
                    {activeItem.year}
                  </span>
                </motion.div>
                <motion.div
                  variants={contentItemVariants}
                  className="flex items-center justify-between gap-2 border-b border-foreground/10 rounded-sm py-4"
                >
                  <span className="subtitle-small text-xs!">Industry</span>
                  <span className="subtitle-small opacity-100! text-xs!">
                    {activeItem.industry}
                  </span>
                </motion.div>
                <motion.div
                  variants={contentItemVariants}
                  className="flex items-center justify-between gap-2 border-b border-foreground/10 rounded-sm py-4"
                >
                  <span className="subtitle-small text-xs!">Type</span>
                  <span className="subtitle-small opacity-100! text-xs!">
                    {activeItem.type}
                  </span>
                </motion.div>
              </motion.div>
              <motion.p variants={contentItemVariants}>
                {activeItem.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-8 w-full justify-between items-center">
            <div className="flex items-end gap-2">
              <HighlightButton onClick={previousProject} left={true} />
              <HighlightButton onClick={nextProject} left={false} />
            </div>
            <span className="subtitle-small text-base! leading-none">
              {slideCounter}
            </span>
          </div>
        </div>
        <div className="relative w-full aspect-square overflow-hidden rounded-sm">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={activeItem.id}
              className="absolute inset-0"
              initial={{ y: "100%", opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectVideo
                src={activeItem.videoSrc}
                imageSrc={activeItem.imageSrc}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

function HighlightMetaRows({ item }: { item: HighlightItem }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between gap-2 border-y border-foreground/10 rounded-sm py-4">
        <span className="subtitle-small text-xs!">Year</span>
        <span className="subtitle-small opacity-100! text-xs!">
          {item.year}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 border-b border-foreground/10 rounded-sm py-4">
        <span className="subtitle-small text-xs!">Industry</span>
        <span className="subtitle-small opacity-100! text-xs!">
          {item.industry}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 border-b border-foreground/10 rounded-sm py-4">
        <span className="subtitle-small text-xs!">Type</span>
        <span className="subtitle-small opacity-100! text-xs!">
          {item.type}
        </span>
      </div>
    </div>
  );
}

function ProjectVideo({ src, imageSrc }: { src: string; imageSrc: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcToLoad, setSrcToLoad] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setSrcToLoad(src);
  }, [src]);

  /** Mobile Safari often ignores `autoPlay` alone; muted + playsInline + programmatic play helps */
  useEffect(() => {
    if (!isLoaded || !videoRef.current) return;
    const v = videoRef.current;
    v.muted = true;
    void v.play().catch(() => {});
  }, [isLoaded, srcToLoad]);

  return (
    <div className="relative w-full h-full bg-[#313131] p-4 overflow-hidden flex items-center justify-center">
      {srcToLoad ? (
        <>
          {!isLoaded && (
            <div
              className="absolute inset-0 flex items-center justify-center z-10 p-4"
              aria-hidden
            >
              <div className="aspect-1351/810 w-full rounded-sm bg-[#313131] animate-pulse" />
            </div>
          )}

          <div className="relative z-10 overflow-hidden rounded-sm">
            <video
              ref={videoRef}
              className={`w-full transition-opacity bg-[#313131] duration-300 ease-out ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              src={srcToLoad}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onLoadedData={() => setIsLoaded(true)}
            />
          </div>
        </>
      ) : null}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="Project Video"
          fill
          className="object-cover opacity-20"
          style={{
            filter: "contrast(1.06) brightness(1.08) grayscale(0.2)",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute z-2 inset-0"
          style={{
            zIndex: 2,
            opacity: 0.18,
            mixBlendMode: "screen",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg width='120' height='120' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'><filter id='grain'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='120' height='120' filter='url(%23grain)'/></svg>\")",
            backgroundRepeat: "repeat",
          }}
        />
      </div>
    </div>
  );
}

export const HighlightButton = ({
  onClick,
  left,
}: {
  onClick: () => void;
  left: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative w-12 h-12 rounded-full bg-(--accent) flex items-center justify-center cursor-pointer"
    >
      {left ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      )}
    </button>
  );
};
