"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/app/lib/gsap";

function normalizeText(children: ReactNode) {
  if (typeof children !== "string") return "";
  return children.replace(/\s+/g, " ").trim();
}

const ParagraphBig = ({ children }: { children: ReactNode }) => {
  const text = normalizeText(children);
  const rootRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const rootEl = rootRef.current;
    if (!rootEl || !text) return;

    let split: SplitText | null = null;
    let ctx: gsap.Context | null = null;

    const setup = () => {
      ctx?.revert();
      split?.revert();

      rootEl.textContent = text;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      split = SplitText.create(rootEl, {
        type: "lines",

        linesClass: "paragraph-big-line",
        autoSplit: true,
        aria: "auto",
        onSplit(self) {
          ctx?.revert();
          ctx = null;

          if (prefersReducedMotion) {
            gsap.set(self.lines, { opacity: 1, y: 0 });
            ScrollTrigger.refresh();
            return;
          }

          gsap.set(self.lines, { opacity: 0, y: 20 });

          ctx = gsap.context(() => {
            self.lines.forEach((line) => {
              gsap.fromTo(
                line,
                {
                  opacity: 0,
                  y: 20,
                },
                {
                  opacity: 1,
                  y: 0,
                  ease: "power2.out",
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: line,
                    start: "top 80%",
                    end: "top 40%",
                    scrub: 0.85,
                    invalidateOnRefresh: true,
                  },
                },
              );
            });
          }, rootEl);

          ScrollTrigger.refresh();
        },
      });
    };

    void document.fonts.ready.then(setup);

    return () => {
      ctx?.revert();
      split?.revert();
    };
  }, [text]);

  if (!text) {
    return <p className="p-big w-full min-w-0">{children}</p>;
  }

  // Empty in JSX so React doesn't overwrite SplitText's DOM on re-render.
  return <p ref={rootRef} className="p-big w-full min-w-0" />;
};

export default ParagraphBig;
