"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PATH_1 = "M 0 0 L 100 0 L 100 97 Q 50 100 0 97 Z";
const PATH_2 = "M 0 0 L 100 0 L 100 85 Q 50 100 0 85 Z";

const DURATION = 1.45;
/** Stronger ease-in-out — longer hold, snappier middle, heavier settle */
const EASE = [0.86, 0, 0.14, 1] as const;

export default function Preloader() {
  const prefersReducedMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  const transition = { duration: DURATION, ease: EASE };

  useEffect(() => {
    if (prefersReducedMotion) {
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [prefersReducedMotion]);

  if (done) return null;

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-10000 h-[120vh] w-full"
      initial={{ y: 0 }}
      animate={{ y: "-120vh" }}
      transition={transition}
      onAnimationComplete={() => {
        setDone(true);
        document.body.style.overflow = "";
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          fill="var(--foreground)"
          initial={{ d: PATH_1 }}
          animate={{ d: PATH_2 }}
          transition={transition}
        />
      </svg>
    </motion.div>
  );
}
