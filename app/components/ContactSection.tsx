import React from "react";
import Globe from "./Globe/Globe";
import LinkArrow from "./LinkArrow";

const ContactSection = () => {
  return (
    <section className="section-base flex flex-col gap-12 md:gap-16">
      <div className="grid w-full grid-cols-1 gap-12 md:gap-16 lg:grid-cols-2 lg:gap-32">
        {/* Globe: second on mobile, left column on lg */}
        <div className="order-2 flex flex-col gap-6 md:gap-8 lg:order-1">
          <div className="flex flex-col gap-4">
            <div className="h-px w-full bg-foreground/10" />
            <span className="subtitle-small">Contact me</span>
          </div>
          <div className="px-0 py-4 md:px-8 md:py-8 lg:px-16">
            <Globe />
          </div>
          <div className="flex gap-2 flex-row items-center justify-between">
            <span className="subtitle-small text-xs! md:text-sm">
              (Working Globally)
            </span>
            <span className="subtitle-small text-xs! md:text-sm">
              (Creative Dev)
            </span>
          </div>
        </div>
        {/* Copy + CTAs: first on mobile, right column on lg */}
        <div className="order-1 flex flex-col justify-between gap-12 md:gap-16 lg:order-2">
          <div className="flex w-full flex-col items-start gap-6 md:gap-8">
            <div className="flex w-full flex-col gap-4">
              <div className="h-px w-full bg-foreground/10" />
              <span className="subtitle-small">Let's connect</span>
            </div>
            <p className="p-big max-w-full lg:max-w-5xl">
              Open to new projects and collaborations. Contact me to work
              together.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 md:gap-16">
            <div className="flex flex-col items-start gap-2">
              <span className="subtitle-small text-xs!">
                Available for work
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl">APR'26</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="subtitle-small">(Get in touch)</span>
              <div className="flex flex-col items-start gap-2">
                <LinkArrow href="https://cal.com/boris.vedernikov/30min">
                  Book a call
                </LinkArrow>
                <LinkArrow href="mailto:vedernikovboris4@gmail.com">
                  Email me
                </LinkArrow>
                <LinkArrow href="https://www.linkedin.com/in/borisvedernikov/">
                  LinkedIn
                </LinkArrow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
