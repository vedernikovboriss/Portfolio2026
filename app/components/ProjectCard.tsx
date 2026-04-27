import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LinkArrow from "./LinkArrow";
import Image from "next/image";

export function ProjectCard({
  id,
  title,
  year,
  type,
  link,
  tools,
  description,
  location,
  isOpen,
  industry,
  onToggle,
  photos,
}: {
  id: number;
  title: string;
  year: number;
  type: string;
  tools: string[];
  photos?: string[];
  link?: string;
  description: string[];
  industry: string;
  location: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsLg(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="flex flex-col border-b border-foreground/10 ">
      <motion.button
        type="button"
        onClick={onToggle}
        className="relative flex justify-between items-center lg:grid cursor-pointer gap-4 py-6 text-left sm:gap-6 lg:grid-cols-6 lg:gap-8 lg:py-8"
        initial="rest"
        animate={isOpen ? "open" : "rest"}
        whileHover="hover"
        variants={{
          rest: { opacity: 0.5 },
          hover: { opacity: 1 },
          open: { opacity: 1 },
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-expanded={isOpen}
        aria-controls={`project-details-${id}`}
      >
        <div className="relative overflow-hidden lg:col-span-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <motion.div
              variants={{
                rest: { x: 0 },
                hover: { x: "100%" },
                open: { x: 0 },
              }}
              className="-translate-x-full hidden lg:block"
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </motion.div>
          </div>
          <motion.h3
            className="z-10 max-w-full text-2xl font-medium tracking-wide sm:max-w-3xl sm:text-3xl"
            variants={{
              rest: { marginLeft: 0 },
              hover: { marginLeft: isLg ? "2rem" : 0 },
              open: { marginLeft: 0 },
            }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h3>
        </div>
        <span className="lg:hidden text-sm font-medium">{year}</span>
        <div className="hidden lg:contents gap-x-4 gap-y-2 text-sm font-medium">
          <span className="lg:self-center">{year}</span>
          <span className="lg:self-center">{industry}</span>
          <span className="lg:self-center">{type}</span>
          <span className="min-w-0 wrap-break-word lg:self-center">
            {location}
          </span>
        </div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`project-details-${id}`}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.62, ease: "easeOut" },
            }}
          >
            <div className="flex flex-col items-start gap-6 pt-4 pb-6 sm:gap-8 sm:pb-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {description.map((item, index) => (
                  <p key={index} className="max-w-none">
                    {item}
                  </p>
                ))}
              </div>

              {link && (
                <LinkArrow href={link} className="leading-[1.2]">
                  Visit Website
                </LinkArrow>
              )}
              <div className="lg:hidden flex flex-col gap-2">
                <span className="subtitle-small text-xs!">Project Details</span>
                <div className="flex flex-col gap-2">
                  <span className="text-base font-medium">
                    Industry: {industry}
                  </span>
                  <span className="text-base font-medium">Type: {type}</span>
                  <span className="text-base font-medium">
                    Location: {location}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <span
                    key={index}
                    className="text-xs opacity-60 uppercase font-medium self-center tracking-wider py-1 px-2 border border-foreground/30 rounded-full"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-2">
              {photos &&
                photos.map((photo, index) => (
                  <ProjectPhoto key={index} src={photo} />
                ))}
            </div>
            <div className="w-full h-8" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectPhoto({ src }: { src: string }) {
  return (
    <div className="relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-sm bg-[#313131] p-2 sm:p-4">
      <div className="relative h-full w-full">
        <Image
          className="z-10 rounded-sm object-contain duration-300 ease-out"
          src={src}
          alt={`Project photo ${src}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
