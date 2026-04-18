import React from "react";

const SectionTransition = () => {
  return (
    <div className="relative section-base flex items-center justify-center py-0!">
      <div className="flex items-center gap-3 w-full">
        <div className="rounded-full w-3 h-3 bg-foreground/10 animate-pulse" />
        <div className="flex-1 h-px bg-foreground/10" />

        <div className="rounded-full w-3 h-3 bg-foreground/10 animate-pulse" />

        <div className="flex-1 h-px bg-foreground/10" />
        <div className="rounded-full w-3 h-3 bg-foreground/10 animate-pulse" />
      </div>
    </div>
  );
};
export default SectionTransition;
