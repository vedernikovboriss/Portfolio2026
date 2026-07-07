"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/app/lib/gsap";

export default function LenisScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      // Simple defaults that feel good for most portfolios.
      duration: 1.2,
      smoothWheel: true,
      autoResize: false, // we'll call resize() via ResizeObserver
    });

    window.__lenis = lenis;
    lenis.scrollTo(0, { immediate: true });

    const unsubscribeScrollTrigger = lenis.on("scroll", ScrollTrigger.update);

    let rafResizeId: number | null = null;
    const scheduleResize = () => {
      if (rafResizeId != null) return;
      rafResizeId = requestAnimationFrame(() => {
        rafResizeId = null;
        lenis.resize();
        ScrollTrigger.refresh();
      });
    };

    let rafId: number | null = null;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Initial resize after layout settles
    requestAnimationFrame(() => {
      lenis.resize();
      requestAnimationFrame(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
    });

    // Re-measure when content height changes (accordions, images, etc.)
    const observer = new ResizeObserver(() => {
      scheduleResize();
    });

    if (document.documentElement) observer.observe(document.documentElement);
    if (document.body) observer.observe(document.body);
    if (document.scrollingElement) observer.observe(document.scrollingElement);

    /**
     * While the page scrolls under a stationary cursor, browsers usually do not
     * emit mousemove, so :hover and Framer `whileHover` can stay wrong until the
     * pointer moves. After scroll updates, emit a synthetic mousemove at the
     * last known position so hover matches the element under the cursor.
     */
    const pointerRef = { x: 0, y: 0 };
    let rafHoverSyncId: number | null = null;

    const emitSyntheticMouseMove = () => {
      window.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          cancelable: true,
          clientX: pointerRef.x,
          clientY: pointerRef.y,
          view: window,
        }),
      );
    };

    const scheduleHoverSync = () => {
      if (rafHoverSyncId != null) return;
      rafHoverSyncId = requestAnimationFrame(() => {
        rafHoverSyncId = null;
        emitSyntheticMouseMove();
      });
    };

    const onPointerMove = (event: MouseEvent) => {
      pointerRef.x = event.clientX;
      pointerRef.y = event.clientY;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    const unsubscribeLenisScroll = lenis.on("scroll", scheduleHoverSync);

    const onWindowScroll = () => scheduleHoverSync();
    window.addEventListener("scroll", onWindowScroll, {
      capture: true,
      passive: true,
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (rafResizeId) cancelAnimationFrame(rafResizeId);
      if (rafHoverSyncId != null) cancelAnimationFrame(rafHoverSyncId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("scroll", onWindowScroll, true);
      unsubscribeLenisScroll();
      unsubscribeScrollTrigger();
      observer.disconnect();
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
