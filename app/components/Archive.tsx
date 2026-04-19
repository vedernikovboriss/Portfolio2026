"use client";
import React, { useState } from "react";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

const Archive = () => {
  const [openProjectId, setOpenProjectId] = useState<number | null>(null);

  const handleToggleProject = (projectId: number) => {
    setOpenProjectId((current) => (current === projectId ? null : projectId));
  };

  return (
    <section className="section-base relative z-10 flex flex-col gap-12 md:gap-16">
      <div className="flex flex-col gap-4">
        <div className="h-px w-full bg-foreground/10" />
        <div className="flex justify-between lg:grid gap-4 lg:grid-cols-3 lg:gap-8">
          <h2 className="subtitle-small">Archive</h2>
          <span className="subtitle-small hidden lg:block">Past Work</span>
          <span className="subtitle-small sm:justify-self-end">
            {projects.length < 10
              ? `(0${projects.length})`
              : `(${projects.length})`}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <p className="lg:col-start-2 lg:max-w-sm">
          Here you can find all my projects, sorted by year. Click on a project
          to see more details. For more details, check out my Instagram and
          Linkedin
        </p>
        <p className="max-w-sm">
          Some projects are not yet public, but you can still see the details
          and visuals.
        </p>
      </div>
      <div className="flex flex-col gap-0">
        <div className="hidden grid-cols-6 gap-8 border-b border-foreground/10 pb-8 tracking-wider lg:grid">
          <span className="col-span-2 subtitle-small text-xs!">Client</span>
          <span className="subtitle-small text-xs!">Year</span>
          <span className="subtitle-small text-xs!">Industry</span>
          <span className="subtitle-small text-xs!">Services</span>
          <span className="subtitle-small text-xs!">Location</span>
        </div>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            photos={project.photos}
            title={project.title}
            year={project.year}
            type={project.type}
            link={project.link}
            tools={project.tools}
            description={project.description}
            industry={project.industry}
            location={project.location}
            isOpen={openProjectId === project.id}
            onToggle={() => handleToggleProject(project.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Archive;
