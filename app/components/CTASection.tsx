"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ButtonBlock from "./ButtonBlock/ButtonBlock";

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.1"],
  });

  const insetX = useTransform(scrollYProgress, [0, 1], ["0vw", "2vw"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["0px", "1rem"]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-base relative mt-8 flex min-h-[85vh] flex-col items-center justify-center gap-12 px-0! md:min-h-[100vh] md:gap-16 lg:min-h-[110vh]"
    >
      <motion.div
        className="pointer-events-none absolute top-0 bottom-0 z-0 overflow-hidden"
        style={{
          left: insetX,
          right: insetX,
          borderRadius,
        }}
      >
        {/* Full-viewport image — fixed scale, centered; frame clips on scroll */}
        <div className="absolute inset-y-0 left-1/2 h-full w-full max-w-[100vw] -translate-x-1/2 lg:w-screen">
          <div className="relative h-full w-full">
            <Image
              src="/imgBalcony.avif"
              alt=""
              fill
              className="object-cover object-center opacity-20 grayscale"
              sizes="100vw"
            />
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 bg-foreground/3" />
      </motion.div>

      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-12 px-4 md:gap-16 lg:px-[2vw]">
        <div className="flex flex-col items-center justify-center gap-12 md:gap-16">
          <div className="flex w-full flex-col items-center gap-8">
            <p className="p-big max-w-full text-center text-3xl! sm:text-4xl! md:text-5xl! lg:max-w-5xl lg:text-6xl!">
              Open to new projects and collaborations
            </p>
            <p className="mx-auto max-w-sm text-center text-sm! opacity-70 sm:text-base!">
              Contact me through the form below, email, or phone number to
              discuss your project.
            </p>
            <ButtonBlock>Book a Call</ButtonBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
