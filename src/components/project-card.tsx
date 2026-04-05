import Image from "next/image";
import Link from "next/link";

export interface ProjectCardData {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  year: number;
  location: string;
  heroImageUrl: string | null;
}

export const categoryGradients: Record<string, string> = {
  rezidential: "from-slate-800 to-blue-950",
  comercial: "from-zinc-800 to-stone-900",
  interior: "from-stone-800 to-amber-950",
  peisagistica: "from-zinc-800 to-emerald-950",
};

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const hasImage = !!project.heroImageUrl;

  return (
    <Link
      href={`/proiecte/${project.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden"
    >
      {hasImage ? (
        <Image
          src={project.heroImageUrl!}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${categoryGradients[project.category]} transition-transform duration-500 group-hover:scale-105`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-colors group-hover:from-black/80" />
      <div className="absolute right-0 bottom-0 left-0 p-6">
        <p className="text-accent text-xs font-medium tracking-wider uppercase">
          {project.categoryLabel}
        </p>
        <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-zinc-400">
          {project.location} &mdash; {project.year}
        </p>
      </div>
    </Link>
  );
}
