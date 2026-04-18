"use client";

import React, { useEffect, useState } from "react";
import { projects } from "@/app/data/projects";
import Link from "next/link";
import Image from "next/image";

import Archive from "./Archive";
const ProjectsSection = () => {
  return (
    <section className="relative section-base flex items-center justify-center">
      <div className="relative grid grid-cols-2 gap-16 z-10">
        <div className="flex flex-col gap-2">
          <div className="relative w-full aspect-video bg-[#313131] rounded-sm flex items-center justify-center overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="relative z-10 size-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
            <Image
              src="/imgBalcony.jpg"
              alt="Reel"
              fill
              className="absolute z-0 top-0 left-0 w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="w-full flex items-center justify-between gap-2">
            <span className="subtitle-small text-xs!">Play Reel</span>
            <span className="subtitle-small text-xs!">00:22</span>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="subtitle-small">(Recent Work)</span>
            <h2 className="p-big">
              Explore projects reflecting my dedication to quality and detail.
            </h2>
          </div>
          <p className="p-secondary">
            Watch my showreel to see my work in action or click on a project to
            learn more. For more details, check out my Instagram and Linkedin
            profiles.
          </p>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Image
          src="/testImg2.png"
          alt="About"
          className="object-cover object-top-left grayscale opacity-0 pointer-events-none"
          fill
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
