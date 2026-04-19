import React from "react";
import Image from "next/image";

const serviceCards = [
  {
    title: "Web Development",
    description:
      "I build fast, custom-coded websites that reflect your brand and engage users with smooth experiences and subtle animations.",
  },
  {
    title: "Web Design",
    description:
      "I design impactful, user-friendly websites tailored to your goals—helping your business stand out online.",
  },
  {
    title: "Motion & Interactions",
    description:
      "I create smooth, interactive animations and transitions to enhance your website's user experience.",
  },
  {
    title: "Full Stack",
    description:
      "From concept to launch, I handle both design and development for cohesive, interactive results. Let's talk about how I can help your next project succeed.",
  },
];
const ServicesSection = () => {
  return (
    <section
      id="services"
      className="section-base flex flex-col gap-12 md:gap-16"
    >
      <div className="flex flex-col gap-4">
        <div className="w-full h-px bg-foreground/10" />
        <div className="flex justify-between lg:grid gap-3 lg:grid-cols-4 lg:gap-16">
          <span className="subtitle-small">My Services</span>
          <span className="subtitle-small hidden lg:block lg:col-start-3">
            (How I can help you)
          </span>
          <span className="subtitle-small lg:justify-self-end">(03)</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-10 min-h-0 md:grid-cols-2 lg:min-h-[600px] lg:grid-cols-4 lg:gap-16">
        <div className="relative min-h-[280px] w-full overflow-hidden rounded-md bg-[#313131] text-background sm:min-h-[360px] md:col-span-2 lg:row-span-2 lg:min-h-[400px]">
          <Image
            src="/imgBalcony.avif"
            alt="Service visual"
            className="object-cover opacity-80"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        {serviceCards.map((card) => (
          <ServiceCard
            key={card.title}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;

function ServiceCard({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-3 justify-start lg:justify-between sm:gap-4 h-full ${className ?? ""}`}
    >
      <h3 className="font-sans text-xl font-medium tracking-wide sm:text-2xl max-w-full sm:max-w-3xl z-10">
        {title}
      </h3>
      <p className="p-secondary max-w-sm lg:max-w-3xl!">{description}</p>
    </div>
  );
}
