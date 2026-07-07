"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EXPERIENCE_ROTATE_MS = 6_000;

const slideEaseOut = [0.16, 1, 0.3, 1] as const;
const slideEaseIn = [0.4, 0, 0.2, 1] as const;

const slideVariants = {
  initial: { y: "110%", opacity: 0 },
  animate: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      y: { duration: 1, delay: delay + 0.25, ease: slideEaseOut },
      opacity: { duration: 0.85, delay: delay + 0.25, ease: slideEaseOut },
    },
  }),
  exit: {
    y: "-110%",
    opacity: 0,
    transition: {
      y: { duration: 0.68, ease: slideEaseIn },
      opacity: { duration: 0.45, ease: slideEaseIn },
    },
  },
};

const experience = [
  {
    title: "Years of Experience",
    value: "2+",
  },
  {
    title: "Websites Developed",
    value: "10+",
  },
  {
    title: "Industries Served",
    value: "4+",
  },
  {
    title: "Technologies Mastered",
    value: "8+",
  },
  {
    title: "Repeat Clients",
    value: "2+",
  },
];

type SlideLineProps = {
  value: string;
  animKey: number;
  className?: string;
  clipClassName?: string;
  delay?: number;
};

function SlideLine({
  value,
  animKey,
  className,
  clipClassName,
  delay = 0,
}: SlideLineProps) {
  return (
    <div className={`relative overflow-hidden ${clipClassName ?? ""}`}>
      <AnimatePresence initial={false}>
        <motion.span
          key={animKey}
          custom={delay}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`absolute inset-x-0 top-0 block ${className ?? ""}`}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function ExperienceCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(
      ((index % experience.length) + experience.length) % experience.length,
    );
  }, []);

  const restartProgress = useCallback(() => {
    setProgressKey((key) => key + 1);
  }, []);

  const handleProgressComplete = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % experience.length);
    restartProgress();
  }, [restartProgress]);

  const handlePrev = () => {
    goTo(currentIndex - 1);
    restartProgress();
  };

  const handleNext = () => {
    goTo(currentIndex + 1);
    restartProgress();
  };

  const current = experience[currentIndex];

  return (
    <div className="flex w-full shrink-0 flex-col items-start justify-center gap-2 rounded-md bg-foreground/5 p-4">
      <div className="relative w-full">
        <div className="h-[2px]! w-full divider rounded-sm" />
        <motion.div
          key={progressKey}
          className="absolute top-0 left-0 h-[2px]! bg-foreground rounded-sm"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: EXPERIENCE_ROTATE_MS / 1000,
            ease: "linear",
          }}
          onAnimationComplete={handleProgressComplete}
        />
      </div>
      <div className="flex-1 flex justify-between items-center gap-2 w-full">
        <span className="text-sm font-medium opacity-50">
          {"0" + (currentIndex + 1) + ""} /{" "}
          {experience.length > 9 ? experience.length : `0${experience.length}`}
        </span>
        <div className="flex items-center gap-2 opacity-50">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous stat"
            className="transition-opacity hover:opacity-100 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next stat"
            className="transition-opacity hover:opacity-100 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <SlideLine
          value={current.value}
          animKey={currentIndex}
          className="text-4xl font-sans font-normal leading-none tracking-tight sm:text-5xl lg:text-6xl"
          clipClassName="h-11 sm:h-14 lg:h-15"
        />
        <SlideLine
          value={current.title}
          animKey={currentIndex}
          className="text-sm leading-normal font-medium brightness-70"
          clipClassName="h-6"
          delay={0.1}
        />
      </div>
    </div>
  );
}
