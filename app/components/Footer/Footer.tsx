import React from "react";
import TimeVLC from "../TimeVLC";
import Link from "next/link";
import styles from "./Footer.module.css";
import { getAvailabilityLabel } from "@/app/data/availability";
import {
  BOOKING_URL,
  CONTACT_LINKS,
  FOOTER_NAV_LINKS,
  SOCIAL_LINKS,
} from "@/app/data/siteLinks";
import FooterNavLink from "./FooterNavLink";
import Logo from "../Logo";

const Footer = () => {
  const availabilityLabel = getAvailabilityLabel();

  return (
    <footer className="section-base relative overflow-hidden pb-8! text-base! lg:gap-32!">
      <div className="absolute left-0 right-0 opacity-10 blur-2xl bottom-0">
        <Logo />
      </div>
      <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-16 xl:grid-cols-4 xl:gap-16">
        <div className="col-span-1 flex flex-col gap-4 md:col-span-2 xl:col-span-2">
          <span className="subtitle-small">Navigation</span>
          <div className="flex flex-col">
            {FOOTER_NAV_LINKS.map((link) => (
              <FooterNavLink
                key={link.href}
                href={link.href}
                label={link.label}
              />
            ))}
          </div>
        </div>
        <div className="flex max-w-prose flex-col gap-4 md:max-w-none">
          <span className="subtitle-small">(Need help?)</span>
          <p className="text-base">
            If you have any questions or need a consultation, feel free to
            contact me through the email or phone number.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <span className="subtitle-small">(Contact)</span>
          <div className="flex flex-wrap gap-x-0">
            <Link
              className="link-line leading-[1.2]"
              href={SOCIAL_LINKS.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SOCIAL_LINKS.linkedin.label}
            </Link>
            <span aria-hidden className="mr-2 leading-[1.2]">
              ,
            </span>
            <Link
              className="link-line leading-[1.2]"
              href={SOCIAL_LINKS.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SOCIAL_LINKS.instagram.label}
            </Link>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span>Email:</span>
            <Link
              className="link-line max-w-full break-all leading-[1.2] sm:break-normal"
              href={CONTACT_LINKS.email.href}
            >
              {CONTACT_LINKS.email.label}
            </Link>
          </div>
          <div className="flex flex-col items-start gap-1">
            <span>Phone Number:</span>
            <Link
              className="link-line leading-[1.2]"
              href={CONTACT_LINKS.phone.href}
            >
              {CONTACT_LINKS.phone.label}
            </Link>
          </div>
          <div className="flex flex-col gap-0.5">
            <span>Based in:</span>
            <span>{CONTACT_LINKS.location}</span>
          </div>
        </div>
      </div>
      <div className="text-sm font-medium uppercase grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-14 xl:grid-cols-4 xl:gap-16">
        <span className="flex flex-col">
          <span>© 2025 (BnB) By Boris. </span>
          <span>All rights reserved.</span>
        </span>
        <Link
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.navLink} flex flex-col md:col-start-auto xl:col-start-3`}
        >
          <span>BOOKING PROJECTS</span>
          <span>{availabilityLabel}</span>
        </Link>
        <div className="justify-self-start md:col-span-2 md:justify-self-end xl:col-span-1">
          <TimeVLC />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
