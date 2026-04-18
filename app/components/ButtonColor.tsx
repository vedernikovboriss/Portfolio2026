import React from "react";

const ButtonColor = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="bg-(--accent) text-foreground px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m16.49 12 3.75-3.751m0 0-3.75-3.75m3.75 3.75H3.74V19.5"
        />
      </svg>
      <span className="text-sm font-semibold uppercase tracking-wider">
        {children}
      </span>
    </button>
  );
};

export default ButtonColor;
