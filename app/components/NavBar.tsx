"use client";

import React from "react";
import LinkArrow from "./LinkArrow";

/** Offset for fixed nav (py-[2vw] + line height). */
const NAV_SCROLL_OFFSET = -96;

/** Lenis scroll duration (seconds) — explicit so anchor jumps feel smooth, not snappy. */
const SCROLL_DURATION = 1.15;

/** Ease-out curve (similar to cubic-bezier(0.22, 1, 0.36, 1)). */
function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function scrollToHash(href: string) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, {
      offset: NAV_SCROLL_OFFSET,
      duration: SCROLL_DURATION,
      easing: easeOutExpo,
    });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", href);
  }
}

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 lg:px-[2vw] px-4 lg:py-[2vw] py-6 flex flex-row justify-between items-center lg:grid lg:grid-cols-3 mix-blend-difference">
      <span className="z-10 text-lg sm:text-lg">Boris Vedernikov © </span>
      <div className="hidden items-center gap-0 text-base sm:text-lg lg:flex lg:justify-self-center">
        <NavBarLink number="1" href="#about">
          About
        </NavBarLink>
        <span className="px-1">,</span>
        <NavBarLink number="2" href="#services">
          Services
        </NavBarLink>
        <span className="px-1">,</span>
        <NavBarLink number="3" href="#works">
          Works
        </NavBarLink>
      </div>
      <div className="flex items-center gap-0 text-base sm:text-lg lg:justify-self-end self-center">
        <LinkArrow href="https://cal.com/boris.vedernikov/30min">
          Book a call
        </LinkArrow>
      </div>
    </nav>
  );
};

export default NavBar;

export const NavBarLink = ({
  children,
  number,
  href,
}: {
  children: React.ReactNode;
  number: string;
  href: string;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    scrollToHash(href);
  };

  return (
    <a href={href} onClick={handleClick} className="flex items-start gap-1">
      <span className="text-[0.6rem] font-bold opacity-80">({number})</span>
      <span className="link-line leading-[1.2]">{children}</span>
    </a>
  );
};
