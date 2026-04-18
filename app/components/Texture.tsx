import React from "react";
import Image from "next/image";

const Texture = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-1000 opacity-10">
      <Image
        src="/texture2.png"
        alt="Texture"
        fill
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Texture;
