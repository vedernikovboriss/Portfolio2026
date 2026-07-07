"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { highlightItems } from "@/app/data/highlights";
import Link from "next/link";

const Highlights = () => {
  return (
    <section
      id="works"
      className="section-base flex flex-col gap-10 md:gap-14 lg:gap-16"
    >
      <div className="flex flex-col gap-4">
        <div className="divider" />
        <h2 className="subtitle-small flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-foreground inline-block" />
          Selected Work
        </h2>
      </div>

      <ProjectList />
    </section>
  );
};

export default Highlights;

function ProjectList() {
  return (
    <div className="flex flex-col gap-10 md:gap-14 lg:gap-16">
      {highlightItems.map((item, index) => (
        <ProjectRow key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}

function ProjectRow({
  item,
  index,
}: {
  item: (typeof highlightItems)[number];
  index: number;
}) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mediaRef,
    offset: ["start end", "end start"],
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-16 lg:gap-10">
      <div className="lg:col-span-2">
        <span className="corner-strokes">
          <span className="subtitle-small text-xs!">
            SW#{index + 1 < 10 ? `0${index + 1}` : index + 1}
          </span>
        </span>
      </div>

      <VisualProject
        item={item}
        mediaRef={mediaRef}
        scrollYProgress={scrollYProgress}
      />

      <div className="col-span-6 flex flex-col gap-8 items-start">
        <div className="flex w-full items-center justify-between">
          <span className="p-big text-2xl! sm:text-3xl! lg:text-3xl!">
            {item.title}
          </span>
        </div>

        <p className="text-sm sm:text-base">{item.description}</p>

        <div className="flex w-full flex-wrap gap-2">
          {[item.year, item.industry, item.country].map((tag, tagIndex) => (
            <div
              key={tagIndex}
              className="w-fit rounded-sm bg-foreground/5 px-2 py-2 text-sm! font-medium text-foreground/50"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisualProject({
  item,
  mediaRef,
  scrollYProgress,
}: {
  item: (typeof highlightItems)[number];
  mediaRef: React.RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
}) {
  return (
    <div
      ref={mediaRef}
      className="relative aspect-4/3 w-full overflow-hidden rounded-sm bg-[#101010] sm:aspect-5/4 lg:col-span-8 lg:aspect-9/8"
    >
      <ProjectVideo
        rootRef={mediaRef}
        src={item.videoSrc}
        imageSrc={item.imageSrc}
        scrollYProgress={scrollYProgress}
      />
      {item.link ? (
        <>
          <Link
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-20"
            aria-label={`Visit ${item.title}`}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-2 right-2 z-30 flex items-center justify-center gap-2 rounded-full bg-background pl-4 pr-2 py-2"
          >
            <span className="text-xs font-medium">Visit Website</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="var(--foreground)"
              className="size-[1.1rem]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
              />
            </svg>
          </div>
        </>
      ) : null}
    </div>
  );
}

function ProjectVideo({
  rootRef,
  src,
  imageSrc,
  scrollYProgress,
}: {
  rootRef: React.RefObject<HTMLDivElement | null>;
  src: string;
  imageSrc: string;
  scrollYProgress: MotionValue<number>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldLoadRef = useRef(false);
  const hasErrorRef = useRef(false);
  const inView = useInView(rootRef, {
    margin: "200px 0px",
    amount: 0,
  });
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  hasErrorRef.current = hasError;

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.18]);

  useEffect(() => {
    if (!inView || shouldLoadRef.current) return;
    shouldLoadRef.current = true;
    setHasError(false);
    setIsLoaded(false);
    setShouldLoad(true);
  }, [inView]);

  useEffect(() => {
    if (!hasError) return;
    videoRef.current?.pause();
  }, [hasError]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad || hasErrorRef.current) return;

    video.muted = true;

    const markLoaded = () => setIsLoaded(true);

    video.addEventListener("loadeddata", markLoaded);
    video.addEventListener("canplay", markLoaded);
    video.addEventListener("playing", markLoaded);

    if (inView) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }

    return () => {
      video.removeEventListener("loadeddata", markLoaded);
      video.removeEventListener("canplay", markLoaded);
      video.removeEventListener("playing", markLoaded);
    };
  }, [inView, shouldLoad, src]);

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 origin-center will-change-transform"
          style={{ y: backgroundY, scale: backgroundScale }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            className="object-cover opacity-25"
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={{
              filter: "contrast(1.26) brightness(1.18)",
            }}
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative aspect-1351/810 w-full max-w-full overflow-hidden rounded-sm bg-[#313131]">
          {shouldLoad ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-contain"
              src={src}
              loop
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              controls={false}
              controlsList="nodownload nofullscreen noremoteplayback"
              onError={() => setHasError(true)}
            />
          ) : null}

          {!isLoaded || hasError ? (
            <div className="absolute inset-0">
              <Image
                src={imageSrc}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              {shouldLoad ? (
                <div
                  className="absolute inset-0 animate-pulse bg-[#313131]/40"
                  aria-hidden
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
