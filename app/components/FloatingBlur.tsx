"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./FloatingBlur.module.css";

const LEFT_KEYFRAMES = ["10%", "38%", "6%", "60%", "10%"] as const;
const TOP_KEYFRAMES = ["18%", "6%", "42%", "60%", "18%"] as const;

export default function FloatingBlur() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ left: LEFT_KEYFRAMES[0], top: TOP_KEYFRAMES[0] }}
      animate={
        prefersReducedMotion
          ? { left: LEFT_KEYFRAMES[0], top: TOP_KEYFRAMES[0] }
          : { left: [...LEFT_KEYFRAMES], top: [...TOP_KEYFRAMES] }
      }
      transition={{
        duration: 16,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      aria-hidden
    >
      <div className={styles.glow} />
    </motion.div>
  );
}
