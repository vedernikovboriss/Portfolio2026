"use client";

import Link from "next/link";
import styles from "./Footer.module.css";
import { scrollToHash } from "@/app/lib/scrollToHash";
import { FooterArrowUpRightIcon } from "./FooterArrowUpRightIcon";

type FooterNavLinkProps = {
  href: string;
  label: string;
};

export default function FooterNavLink({ href, label }: FooterNavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === "/" || href.startsWith("#")) {
      e.preventDefault();
      scrollToHash(href);
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${styles.navLink} z-10 flex flex-col gap-4 pt-4 font-sans text-4xl! font-medium tracking-wide sm:text-5xl! lg:text-6xl!`}
    >
      <div className="flex flex-row items-center justify-between gap-2">
        <div className={styles.labelWrap}>
          <span className={styles.labelMeasure} aria-hidden="true">
            {label}
          </span>
          <span className={`${styles.label} ${styles.labelPrimary}`}>
            {label}
          </span>
          <span className={`${styles.label} ${styles.labelSecondary}`}>
            {label}
          </span>
        </div>
        <div className={styles.iconBox}>
          <div className={styles.iconWrap}>
            <FooterArrowUpRightIcon
              className={`${styles.icon} ${styles.iconPrimary}`}
            />
            <FooterArrowUpRightIcon
              className={`${styles.icon} ${styles.iconSecondary}`}
            />
          </div>
        </div>
      </div>
      <div className="divider" />
    </Link>
  );
}
