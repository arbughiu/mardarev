"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/project-card";
import type { ProjectCardData } from "@/components/project-card";

const categories = [
  { value: "toate", label: "Toate" },
  { value: "rezidential", label: "Rezidențial" },
  { value: "comercial", label: "Comercial" },
  { value: "interior", label: "Design Interior" },
  { value: "peisagistica", label: "Peisagistică" },
];

interface ProjectFilterProps {
  projects: ProjectCardData[];
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [active, setActive] = useState("toate");

  const filtered =
    active === "toate"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="mt-12 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`px-4 py-2 text-sm transition-colors ${
              active === cat.value
                ? "bg-accent text-black"
                : "text-muted border border-white/10 hover:border-white/30"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
