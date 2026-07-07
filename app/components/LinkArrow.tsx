import React from "react";
import Link from "next/link";
import { isExternalUrl } from "@/app/data/siteLinks";

const LinkArrow = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const external = isExternalUrl(href);

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`text-base flex items-center gap-1 link-line leading-[1.2] ${className}`}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        // Make icon take full text height, width auto
        style={{
          height: "1em",
          width: "auto",
          display: "inline-block",
          verticalAlign: "middle",
        }}
        className="align-middle"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
    </Link>
  );
};

export default LinkArrow;
