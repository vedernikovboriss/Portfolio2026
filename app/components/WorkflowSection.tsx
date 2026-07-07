import React from "react";
import ParagraphBig from "./ParagraphBig";
import ProcessBlock from "./ProcessBlock";
import { WORKFLOW_URL } from "@/app/data/externalLinks";
import ButtonBlock from "./ButtonBlock/ButtonBlock";

const AboutSection = () => {
  return (
    <section className="section-base relative gap-12 md:gap-16">
      <div className="flex flex-col gap-4">
        <div className="divider" />
        <h2 className="subtitle-small lg:col-span-4 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-foreground inline-block" />
          My WorkFlow
        </h2>
      </div>

      {/* Mobile: copy + mission first; image + process last. lg+: image|process left, copy right */}
      <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
        <div className="flex w-full min-w-0 flex-col gap-10 md:gap-16 lg:col-span-2">
          <ParagraphBig>
            Every project is a chance to build something that feels unmistakably
            yours. I use motion and interaction to sharpen the message, so the
            experience resonates with the people you care about most.
          </ParagraphBig>
          <ParagraphBig>
            I start by understanding your audience and what you need them to
            feel. We stay in close contact through each stage, from first ideas
            to launch, so the final product reflects your vision as much as
            mine.
          </ParagraphBig>
        </div>

        <div className="flex w-full flex-col gap-16 lg:col-span-1">
          <div className="relative aspect-3/2 w-full overflow-hidden rounded-sm bg-foreground/5">
            <video
              src={WORKFLOW_URL}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover brightness-90"
            />
          </div>
          <ProcessBlock />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
