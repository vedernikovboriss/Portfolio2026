import React from "react";

const ButtonPrimary = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="bg-(--accent) text-background text-xl px-8 py-4 rounded-2xl font-sans">
      {children}
    </button>
  );
};

export default ButtonPrimary;
