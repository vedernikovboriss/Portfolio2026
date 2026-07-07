"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const ASSETS = {
  sphere: {
    src: "/sphereCompressed.avif",
    width: 720,
    height: 720,
  },
  pill: {
    src: "/pillCompressed.avif",
    width: 1033,
    height: 513,
  },
} as const;

type AssetKey = keyof typeof ASSETS;

type FloatingItem = {
  id: string;
  asset: AssetKey;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  travelY: number;
  travelX: number;
  rotate: number;
  opacity: number;
};

const floatingItems: FloatingItem[] = [
  {
    id: "sphere-1",
    asset: "sphere",
    top: "6%",
    right: "25%",
    width: "70%",
    travelY: 36,
    travelX: -16,
    rotate: 8,
    opacity: 0.9,
  },
  {
    id: "sphere-2",
    asset: "sphere",
    top: "34%",
    left: "6%",
    width: "60%",
    travelY: -42,
    travelX: 12,
    rotate: -6,
    opacity: 0.8,
  },
  {
    id: "pill-1",
    asset: "pill",
    top: "40%",
    right: "4%",
    width: "78%",
    travelY: 32,
    travelX: -18,
    rotate: 12,
    opacity: 0.85,
  },
  {
    id: "pill-2",
    asset: "pill",
    bottom: "5%",
    left: "5%",
    width: "86%",
    travelY: 40,
    travelX: 16,
    rotate: -14,
    opacity: 0.9,
  },
  {
    id: "sphere-3",
    asset: "sphere",
    bottom: "20%",
    right: "34%",
    width: "28%",
    travelY: -34,
    travelX: 10,
    rotate: -5,
    opacity: 0.75,
  },
];

type MotionProfile = {
  travelScale: number;
  rotateScale: number;
  scrollOffset:
    | ["start end", "end start"]
    | ["start 0.9", "end 0.1"]
    | ["start 0.92", "end 0.08"];
};

const DESKTOP_PROFILE: MotionProfile = {
  travelScale: 1,
  rotateScale: 1,
  scrollOffset: ["start end", "end start"],
};

const TABLET_PROFILE: MotionProfile = {
  travelScale: 0.55,
  rotateScale: 0.7,
  scrollOffset: ["start 0.9", "end 0.1"],
};

const MOBILE_PROFILE: MotionProfile = {
  travelScale: 0.35,
  rotateScale: 0.5,
  scrollOffset: ["start 0.92", "end 0.08"],
};

function useMotionProfile(): MotionProfile {
  const [profile, setProfile] = useState<MotionProfile>(DESKTOP_PROFILE);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const md = window.matchMedia("(min-width: 768px)");

    const update = () => {
      if (lg.matches) setProfile(DESKTOP_PROFILE);
      else if (md.matches) setProfile(TABLET_PROFILE);
      else setProfile(MOBILE_PROFILE);
    };

    update();
    lg.addEventListener("change", update);
    md.addEventListener("change", update);

    return () => {
      lg.removeEventListener("change", update);
      md.removeEventListener("change", update);
    };
  }, []);

  return profile;
}

type ParallaxAssetProps = {
  item: FloatingItem;
  scrollYProgress: MotionValue<number>;
  profile: MotionProfile;
  disabled: boolean;
};

function ParallaxAsset({
  item,
  scrollYProgress,
  profile,
  disabled,
}: ParallaxAssetProps) {
  const image = ASSETS[item.asset];
  const travelY = item.travelY * profile.travelScale;
  const travelX = item.travelX * profile.travelScale;
  const rotateAmount = item.rotate * profile.rotateScale;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    disabled ? [0, 0] : [travelY, -travelY],
  );
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    disabled ? [0, 0] : [-travelX, travelX],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    disabled ? [0, 0] : [-rotateAmount, rotateAmount],
  );

  return (
    <motion.div
      className="pointer-events-none absolute will-change-transform"
      style={{
        top: item.top,
        left: item.left,
        right: item.right,
        bottom: item.bottom,
        width: item.width,
        y,
        x,
        rotate,
        opacity: item.opacity,
      }}
    >
      <Image
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        className="h-auto w-full"
        draggable={false}
      />
    </motion.div>
  );
}

export default function ServiceVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const profile = useMotionProfile();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: profile.scrollOffset,
  });

  return (
    <div
      ref={containerRef}
      className="relative aspect-4/3 w-full overflow-hidden rounded-sm min-[768px]:aspect-auto min-[768px]:min-h-96 min-[768px]:rounded-none min-[768px]:rounded-r-md md:col-span-2 lg:aspect-auto lg:min-h-0"
    >
      {floatingItems.map((item) => (
        <ParallaxAsset
          key={item.id}
          item={item}
          scrollYProgress={scrollYProgress}
          profile={profile}
          disabled={prefersReducedMotion === true}
        />
      ))}
    </div>
  );
}
