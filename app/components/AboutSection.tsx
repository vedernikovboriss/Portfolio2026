import React from "react";
import Image from "next/image";
import LinkArrow from "./LinkArrow";

const AboutSection = () => {
  const process = [
    {
      title: "Discovery Call",
    },
    {
      title: "Project Planning",
    },
    {
      title: "Technical Audit",
    },
    {
      title: "Design",
    },
    {
      title: "Design Approval",
    },
    {
      title: "Development",
    },
    {
      title: "Minor Adjustments",
    },
    {
      title: "SEO & Launch",
    },
  ];
  return (
    <section className="section-base relative gap-12 md:gap-16">
      <div className="flex flex-col gap-4">
        <div className="h-px w-full bg-foreground/10" />
        <div className="flex justify-between lg:grid w-full gap-6 lg:grid-cols-10 lg:gap-32">
          <h2 className="subtitle-small lg:col-span-4">My WorkFlow</h2>
          <div className="flex lg:w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:col-span-6">
            <span className="subtitle-small">(Valencia, Spain)</span>
            <span className="subtitle-small hidden lg:block">
              (Personalized approach)
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: copy + mission first; image + process last. lg+: image|process left, copy right */}
      <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-10 lg:gap-32">
        <div className="flex w-full flex-col items-start gap-10 md:gap-16 lg:col-span-6 lg:col-start-5">
          <p className="p-big max-w-full">
            Each project is a unique opportunity to create something special
            that stands out and matches the brand's vision.
          </p>
          <p className="p-big max-w-full">
            Analyzing the target audience and their needs, I craft
            animation-driven solutions that feel alive and engaging.
          </p>
          <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 lg:gap-4">
            <div className="flex flex-col gap-4">
              <span className="subtitle-small">My Mission</span>
              <div className="flex flex-col gap-0">
                <p className="max-w-full! sm:max-w-xs!">
                  I'm passionate about collaborating with businesses who strive
                  for quality and want to make something memorable. My goal is
                  to create visually compelling, result-driven projects led by
                  clear communication throughout each stage.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="subtitle-small">Social Media</span>
              <div className="flex flex-col items-start gap-2">
                <LinkArrow href="https://www.linkedin.com/in/borisvedernikov/">
                  LinkedIn
                </LinkArrow>
                <LinkArrow href="https://www.instagram.com/bv_dsgn/">
                  Instagram
                </LinkArrow>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-8 lg:col-span-4 lg:col-start-1 lg:row-start-1">
          <div className="relative aspect-3/2 w-full overflow-hidden rounded-sm bg-[#313131]">
            <Image
              src="/AboutImg.avif"
              alt="About — workflow and process"
              className="object-cover opacity-80"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <span className="subtitle-small">The Process</span>
              <span className="subtitle-small">(0{process.length} Stages)</span>
            </div>
            <div className="flex flex-col">
              {process.map((item, index) => (
                <ProcessItem
                  key={item.title}
                  index={index}
                  title={item.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

const ProcessItem = ({ index, title }: { index: number; title: string }) => {
  return (
    <div className="flex items-center justify-between border-t border-foreground/10 py-4">
      <div className="flex flex-col">
        <span className="text-base">{title}</span>
      </div>

      <span className="subtitle-small font-normal! text-base">
        0{index + 1}
      </span>
    </div>
  );
};
