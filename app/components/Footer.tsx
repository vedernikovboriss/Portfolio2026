import React from "react";
import Image from "next/image";
import TimeVLC from "./TimeVLC";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="section-base grid grid-cols-1 gap-10 !pb-[2vw] sm:gap-12 md:grid-cols-2 md:gap-14 xl:grid-cols-4 xl:gap-16">
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm sm:aspect-[3/2] xl:aspect-auto xl:min-h-[14rem] xl:h-full">
          <Image
            src="/imgFooter.avif"
            alt="Footer visual"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-6 justify-self-start">
        <span className="subtitle-small text-xs! flex flex-col">
          <span>© 2025 (BnB) By Boris. </span>
          <span>All rights reserved.</span>
        </span>
        <TimeVLC />
      </div>
      <div className="flex max-w-prose flex-col gap-4 md:max-w-none">
        <span className="subtitle-small">(Recent)</span>
        <p className="text-base max-w-none">
          I have recently started actively engaging in my social media presence
          and am looking for a new challenge. If you'd like to see more of my
          work and process, please follow me on Instagram.
        </p>
        <p className="text-base max-w-none">
          "Each project is a unique challenge and I am always looking for new
          opportunities to combine my skills and create something new and
          special."
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <span className="subtitle-small">(Contact)</span>
        <div className="flex flex-wrap gap-x-1">
          <Link
            className="link-line leading-[1.2]"
            href="https://www.linkedin.com/in/borisvedernikov/"
          >
            LinkedIn
          </Link>
          <span aria-hidden>, </span>
          <Link
            className="link-line leading-[1.2]"
            href="https://www.instagram.com/borisvedernikov/"
          >
            Instagram
          </Link>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span>Email:</span>
          <Link
            className="link-line max-w-full break-all leading-[1.2] sm:break-normal"
            href="mailto:vedernikovboris4@gmail.com"
          >
            vedernikovboris4@gmail.com
          </Link>
        </div>
        <div className="flex flex-col items-start gap-1">
          <span>Phone Number:</span>
          <Link className="link-line leading-[1.2]" href="tel:+34634814498">
            +34 (634) 814 498
          </Link>
        </div>
        <div className="flex flex-col gap-0.5">
          <span>Based in:</span>
          <span>Valencia, Spain</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
