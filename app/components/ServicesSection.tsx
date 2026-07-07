"use client";

import React, { useRef } from "react";
import Image from "next/image";
import ButtonBlock from "./ButtonBlock/ButtonBlock";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/app/lib/gsap";
import ServiceVisual from "./ServiceVisual";

const serviceCards = [
  {
    title: "Web Development",
  },
  {
    title: "Web Design",
  },
  {
    title: "Motion & Interactions",
  },
  {
    title: "SEO & Optimization",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const header = section.querySelector<HTMLElement>(
        "[data-services-header]",
      );
      const rows = section.querySelectorAll<HTMLElement>("[data-service-row]");
      const cta = section.querySelector<HTMLElement>("[data-services-cta]");

      if (!header || !rows.length || !cta) return;

      if (prefersReducedMotion) {
        gsap.set([header, ...rows, cta], {
          clearProps: "all",
          opacity: 1,
          y: 0,
        });
        return;
      }

      gsap.set(header, {
        y: 36,
        opacity: 0,
        willChange: "transform, opacity",
      });
      gsap.set(rows, {
        y: 44,
        opacity: 0,
        willChange: "transform, opacity",
      });
      gsap.set(cta, {
        y: 32,
        opacity: 0,
        willChange: "transform, opacity",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          end: "bottom 65%",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power2.out" },
      });

      timeline
        .to(header, { y: 0, opacity: 1, duration: 0.35 }, 0)
        .to(rows, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08 }, 0.12)
        .to(cta, { y: 0, opacity: 1, duration: 0.3 }, 0.42);
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-base relative z-0 flex flex-col gap-10 md:gap-16"
    >
      <div data-services-header className="flex flex-col gap-4">
        <div>
          <div className="divider" />
        </div>
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-6 lg:gap-16">
          <div className="flex items-center justify-between md:col-span-2">
            <h2 className="subtitle-small flex items-center gap-2">
              <div className="inline-block h-3 w-3 rounded-full bg-foreground" />
              Services
            </h2>
            <span className="subtitle-small md:hidden">
              (
              {serviceCards.length > 9
                ? serviceCards.length
                : `0${serviceCards.length}`}
              )
            </span>
          </div>
          <span className="subtitle-small hidden px-4 md:col-span-2 md:col-start-3 md:block md:px-0">
            (How I can help you)
          </span>
          <span className="subtitle-small hidden justify-self-end md:col-span-2 md:col-start-5 md:block">
            (
            {serviceCards.length > 9
              ? serviceCards.length
              : `0${serviceCards.length}`}
            )
          </span>
        </div>
      </div>

      <div className="grid min-h-0 grid-cols-1 items-stretch gap-10 md:grid-cols-6 lg:gap-16">
        <ServiceVisual />

        <div className="relative flex flex-col gap-12 sm:gap-16 md:col-span-6 md:col-start-1 md:px-0 lg:gap-20 xl:col-span-4 xl:col-start-3">
          <div className="flex flex-col gap-0">
            {serviceCards.map((card) => (
              <div
                key={card.title}
                data-service-row
                className="stroke-b flex items-center justify-between gap-8 py-4! sm:py-5!"
              >
                <h3 className="z-10 min-w-0 flex-1 font-sans text-3xl! font-medium tracking-wide sm:text-4xl! md:text-5xl! lg:text-6xl!">
                  {card.title}
                </h3>
                <ServiceDotCluster />
              </div>
            ))}
          </div>
          <div
            data-services-cta
            className="flex flex-col items-start justify-start gap-4"
          >
            <span className="subtitle-small">Have a project in mind?</span>
            <p className="mb-4">
              Let's talk about your next project. If you have a question, feel
              free to contact me.
            </p>
            <ButtonBlock>Contact Me</ButtonBlock>
          </div>
          {/* <ContactCard /> */}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

function ServiceDotCluster() {
  return (
    <div className="relative size-8 shrink-0">
      <div className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
      <div className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-(--stroke-muted)" />
      <div className="absolute right-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-(--stroke-muted)" />
      <div className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-(--stroke-muted)" />
      <div className="absolute left-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-(--stroke-muted)" />
    </div>
  );
}

function ContactCard() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <span className="subtitle-small text-xs!">(Real Client Review)</span>
      <div className="flex flex-col w-full gap-6 py-4 sm:gap-8 md:gap-8">
        <div className="flex items-center gap-4 self-start">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-sm sm:h-16 sm:w-16">
            <Image
              src="/alinaPhoto.avif"
              alt="Contact me"
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="z-10 font-sans text-base! font-medium">
              Alina Zagidulina
            </span>
            <span className="max-w-xs! text-sm! font-medium text-foreground/50">
              Manager at Tehotdel and Rybniy 1
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 md:gap-8">
          <p>
            "Boris cares about your vision as if it were their own and helped us
            win bigger opportunities. Talented, humble, and relentless in
            finding elegant solutions, they’re the partner ambitious,
            mission-driven brands need."
          </p>
        </div>
      </div>
    </div>
  );
}
