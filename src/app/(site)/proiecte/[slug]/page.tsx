import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getMediaUrl } from "@/lib/getMediaUrl";
import { categoryGradients } from "@/components/project-card";
import { Gallery } from "@/components/lightbox";

interface Props {
  params: Promise<{ slug: string }>;
}

function richTextToPlain(richText: unknown): string {
  if (!richText || typeof richText !== "object") return "";
  const root = (richText as Record<string, unknown>).root;
  if (!root || typeof root !== "object") return "";
  const children = (root as Record<string, unknown>).children;
  if (!Array.isArray(children)) return "";
  return children
    .map((node: Record<string, unknown>) => {
      if (Array.isArray(node.children)) {
        return node.children
          .map((c: Record<string, unknown>) => c.text ?? "")
          .join("");
      }
      return node.text ?? "";
    })
    .join("\n");
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "projects",
    limit: 100,
    select: { slug: true },
  });
  return result.docs.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "projects",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const project = result.docs[0];
  if (!project) return {};
  return {
    title: `${project.title} — MardareV Arhitectură`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: "projects",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const project = result.docs[0];
  if (!project) notFound();

  const heroImageUrl = getMediaUrl(project.heroImage);
  const galleryImages: string[] = (project.galleryImages ?? [])
    .map((item) => getMediaUrl(item.image))
    .filter((url): url is string => url !== null);

  const details = richTextToPlain(project.details);
  const gradient = categoryGradients[project.category ?? "rezidential"];

  return (
    <main className="pt-20 pb-24">
      {/* Hero */}
      <div className="relative aspect-[21/9] w-full">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        )}
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Link
          href="/proiecte"
          className="text-muted hover:text-accent mt-8 inline-block text-sm transition-colors"
        >
          &larr; Toate proiectele
        </Link>

        <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">
          {project.title}
        </h1>

        <div className="text-muted mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <span className="text-accent">{project.categoryLabel}</span>
          <span>{project.year}</span>
          <span>{project.location}</span>
          <span>{project.area}</span>
        </div>

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-300">
          {details || project.description}
        </p>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <div className="mt-16">
            <h2 className="text-muted text-sm font-medium tracking-wider uppercase">
              Galerie
            </h2>
            <Gallery images={galleryImages} alt={project.title} />
          </div>
        )}

        <Link
          href="/proiecte"
          className="text-muted hover:text-accent mt-16 inline-block text-sm transition-colors"
        >
          &larr; Înapoi la proiecte
        </Link>
      </div>
    </main>
  );
}
