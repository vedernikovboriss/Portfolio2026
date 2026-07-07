"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import ButtonBlock from "./ButtonBlock/ButtonBlock";
import SoundButton from "./SoundButton/SoundButton";
import { useSound } from "./SoundProvider";
import { scrollToHash } from "@/app/lib/scrollToHash";
import { gsap } from "@/app/lib/gsap";
import { useGSAP } from "@gsap/react";

const NavBar = () => {
  const navRef = useRef<HTMLElement>(null);
  const NAV_INTRO_DELAY = 1;
  const NAV_INTRO_DURATION = 1;
  const { isPlaying, toggleSound } = useSound();

  const NAV_LINKS = [
    { number: "1", href: "#about", label: "About" },
    { number: "2", href: "#services", label: "Services" },
    { number: "3", href: "#works", label: "Works" },
  ] as const;

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: NAV_INTRO_DURATION,
        ease: "power2.out",
        delay: NAV_INTRO_DELAY,
      },
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 lg:px-[2vw] px-4 lg:py-5 py-6 flex flex-row justify-between items-center lg:grid lg:grid-cols-3"
    >
      <Link href="/">
        <Logo className="z-10 h-4 w-auto" />
      </Link>
      <div className="hidden items-center gap-0 text-base sm:text-lg lg:flex lg:justify-self-center">
        {NAV_LINKS.map((link) => (
          <Fragment key={link.number}>
            <NavBarLink number={link.number} href={link.href}>
              {link.label}
            </NavBarLink>
            <span className="px-1">,</span>
          </Fragment>
        ))}
      </div>
      <div className="flex items-center gap-2 text-base sm:text-lg lg:justify-self-end self-center">
        <SoundButton isPlaying={isPlaying} toggleSound={toggleSound} />
        <ButtonBlock variant="small">Book a Call</ButtonBlock>
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
