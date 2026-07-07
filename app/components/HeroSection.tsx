"use client";

import { useRef } from "react";
import Image from "next/image";
import HeroShaderBackground from "./HeroShaderBackground";
import Logo from "./Logo";
import ButtonBlock from "./ButtonBlock/ButtonBlock";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/app/lib/gsap";

/** Preloader is 1.35s — hero starts ~0.4s before it finishes */
const HERO_INTRO_DELAY = 1.0;

const PARAGRAPH_TEXT =
  "I partner up with different brands and studios creating an immersive experience that drive results and closely align with the business\u2019 identity";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const paragraphEl = paragraphRef.current;
      if (!paragraphEl) return;

      gsap.set(".logo-hero", { opacity: 0, y: "100%", rotateZ: 5 });
      gsap.set(".button-hero", { opacity: 0, y: 20 });

      let split: SplitText | null = null;
      let cancelled = false;

      const startIntro = () => {
        if (cancelled) return;

        split?.revert();
        paragraphEl.textContent = PARAGRAPH_TEXT;

        split = SplitText.create(paragraphEl, {
          type: "lines",
          mask: "lines",
          linesClass: "paragraph-big-line",
          autoSplit: true,
          aria: "auto",
        });

        gsap.set(split.lines, { y: 20, opacity: 0 });

        const tl = gsap.timeline({ delay: HERO_INTRO_DELAY });

        tl.to(".logo-hero", {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          duration: 1.15,
          ease: "power3.out",
        })
          .to(
            split.lines,
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power2.out",
              stagger: 0.08,
            },
            "-=0.65",
          )
          .to(
            ".button-hero",
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power2.out",
            },
            "-=0.55",
          );
      };

      void document.fonts.ready.then(startIntro);

      return () => {
        cancelled = true;
        split?.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-hero-background px-4 pb-6 lg:h-svh lg:max-h-svh justify-center lg:justify-start lg:pt-28 lg:gap-4 lg:px-[2vw] lg:pb-6"
    >
      <HeroShaderBackground />
      <div className="pointer-events-none absolute top-0 left-0 z-1 h-full w-full opacity-20">
        <Image
          src="/textureHero.png"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Below lg: one vertically centered, left-aligned stack. lg+: unwraps to original section layout. */}
      <div className="relative z-10 lg:contents">
        <div className="flex flex-col items-start justify-start gap-8 md:gap-12">
          <div className="relative w-full overflow-hidden">
            <div className="logo-hero relative z-10 w-full lg:shrink-0">
              <Logo className="block h-auto w-full" />
            </div>
          </div>
          <p ref={paragraphRef} className="paragraph-hero opacity-70" />
          <ButtonBlock className="button-hero">Book a Call</ButtonBlock>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
