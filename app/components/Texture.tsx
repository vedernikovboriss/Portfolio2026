"use client";

import { useEffect, useRef } from "react";
import { grained, removeGrained } from "@/app/lib/grained";

const GRAIN_OPTIONS = {
  animate: true,
  patternWidth: 120,
  patternHeight: 120,
  grainOpacity: 0.055,
  grainDensity: 1.3,
  grainWidth: 1,
  grainHeight: 1,
  grainChaos: 0.5,
  grainSpeed: 20,
} as const;

export default function Texture() {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = grainRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    grained(element, {
      ...GRAIN_OPTIONS,
      animate: !prefersReducedMotion,
    });

    return () => {
      removeGrained(element);
    };
  }, []);

  return <div ref={grainRef} aria-hidden className="site-grain-layer" />;
}
