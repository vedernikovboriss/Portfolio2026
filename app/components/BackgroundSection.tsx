import React from "react";

const BackgroundSection = () => {
  return (
    <section id="about" className="section-base pb-8!">
      <div className="flex flex-col md:gap-16 gap-8">
        <div className="flex flex-col gap-4">
          <div className="w-full h-[1px] bg-foreground/10" />
          <div className="flex items-center justify-between gap-4">
            <span className="subtitle-small">My Background</span>
            <span className="subtitle-small">(Expertise)</span>
          </div>
        </div>

        <p className="p-big z-10">
          Independent Creative Frontend Developer specialized in crafting
          cutting-edge websites using modern technologies like Next.js or
          Webflow along with animation tools like Framer Motion, Lenis, Barba.js
          and GSAP.
        </p>
        <p className="p-big z-10">
          I’ve contributed to creative projects of varying complexity across
          diverse industries such as technology, services, and more.
        </p>
        <p className="p-big z-10">
          Currently building my own brand focused on helping businesses grow and
          succeed online through tailored website solutions and boosting digital
          presence.
        </p>
      </div>
    </section>
  );
};

export default BackgroundSection;
