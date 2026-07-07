import Image from "next/image";
import ExperienceCard from "./ExperienceCard";
import ParagraphBig from "./ParagraphBig";

const BackgroundSection = () => {
  return (
    <section id="about" className="section-base">
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-4">
          <div className="divider" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="subtitle-small flex items-center gap-2">
              <div className="inline-block h-3 w-3 rounded-full bg-foreground" />
              My Background
            </h2>
            <span className="subtitle-small">(Expertise)</span>
          </div>
        </div>
        <div className="relative grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="z-10 flex flex-col gap-8 lg:col-span-2 lg:flex-1">
            <ParagraphBig>
              Independent Creative Frontend Developer specialized in crafting
              cutting-edge websites using modern technologies like Next.js or
              Webflow along with animation tools like Framer Motion, Lenis,
              Barba.js and GSAP.
            </ParagraphBig>
            <ParagraphBig>
              I’ve contributed to creative projects of varying complexity across
              diverse industries such as technology, services, and more.
            </ParagraphBig>
          </div>
          <div className="flex w-full min-w-0 flex-col gap-4 min-[500px]:flex-row min-[500px]:items-stretch min-[500px]:gap-3 sm:gap-6 lg:col-span-1 lg:flex-col lg:gap-4 lg:flex-1">
            <div className="min-w-0 min-[500px]:flex-1 lg:flex-none">
              <ExperienceCard />
            </div>
            <div className="relative min-w-0 w-full min-[500px]:flex-1 overflow-hidden rounded-sm bg-foreground/5 p-4 pb-0! sm:p-5 lg:w-full lg:p-8">
              <Image
                src="/backgroundIMG.avif"
                alt="Background"
                width={588}
                height={715}
                className="relative z-10 h-auto w-full grayscale"
                sizes="(min-width: 1024px) 33vw, (min-width: 500px) 45vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackgroundSection;
