import React from "react";
import styles from "./ButtonBlock.module.css";
import { BOOKING_URL } from "@/app/data/siteLinks";

type ButtonBlockProps = {
  children: React.ReactNode;
  variant?: "default" | "small" | "big";
  href?: string;
  className?: string;
};

const ButtonBlock = ({
  children,
  variant = "default",
  href = BOOKING_URL,
  className,
}: ButtonBlockProps) => {
  const content = (
    <>
      <div className={styles.labelWrap}>
        <span className={styles.labelMeasure} aria-hidden="true">
          {children}
        </span>
        <span className={`${styles.label} ${styles.labelPrimary}`}>
          {children}
        </span>
        <span className={`${styles.label} ${styles.labelSecondary}`}>
          {children}
        </span>
      </div>
      <div className={styles.iconBox}>
        <div className={styles.iconWrap}>
          <ArrowUpRightIcon
            className={`${styles.icon} ${styles.iconPrimary}`}
            variant={variant}
          />
          <ArrowUpRightIcon
            className={`${styles.icon} ${styles.iconSecondary}`}
            variant={variant}
          />
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.button} ${className}`}
        data-variant={variant}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      data-variant={variant}
    >
      {content}
    </button>
  );
};

export default ButtonBlock;

export const ArrowUpRightIcon = ({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "small" | "big";
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke={"var(--foreground)"}
    className={`size-4 shrink-0 ${className ?? ""} ${variant === "big" ? "size-12" : ""}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
    />
  </svg>
);
