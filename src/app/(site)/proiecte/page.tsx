import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { ProjectFilter } from "./project-filter";
import type { ProjectCardData } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Proiecte — MardareV Arhitectură",
  description:
    "Portofoliul nostru de proiecte de arhitectură, design interior și peisagistică.",
};

export default async function ProiectePage() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "projects",
    sort: "order",
    limit: 100,
  });

  const projects: ProjectCardData[] = result.docs.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category ?? "rezidential",
    categoryLabel: p.categoryLabel ?? "",
    year: p.year,
    location: p.location,
    heroImageUrl: getMediaUrl(p.heroImage),
  }));

  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-accent text-sm font-medium tracking-wider uppercase">
          Portofoliu
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Proiectele noastre
        </h1>
        <p className="text-muted mt-4 max-w-2xl">
          De la rezidențial la comercial, fiecare proiect reflectă atenția
          noastră pentru detaliu și angajamentul față de viziunea clientului.
        </p>
        <ProjectFilter projects={projects} />
      </div>
    </main>
  );
}
