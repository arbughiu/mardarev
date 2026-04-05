import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ProjectCard } from "@/components/project-card";
import type { ProjectCardData } from "@/components/project-card";
import { HeroVideo } from "@/components/hero-video";
import { HeroSlideshow } from "@/components/hero-slideshow";
import { getMediaUrl } from "@/lib/getMediaUrl";

export default async function Home() {
  const payload = await getPayload({ config: configPromise });

  const [projectsResult, testimonialsResult, siteSettings] = await Promise.all([
    payload.find({
      collection: "projects",
      where: { featured: { equals: true } },
      sort: "order",
    }),
    payload.find({
      collection: "testimonials",
      sort: "order",
    }),
    payload.findGlobal({ slug: "site-settings" }),
  ]);

  const featured: ProjectCardData[] = projectsResult.docs.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category ?? "rezidential",
    categoryLabel: p.categoryLabel ?? "",
    year: p.year,
    location: p.location,
    heroImageUrl: getMediaUrl(p.heroImage),
  }));

  const testimonials = testimonialsResult.docs.map((t) => ({
    name: t.name,
    role: t.role,
    quote: t.quote,
  }));

  const heroImages = featured
    .map((p) => p.heroImageUrl)
    .filter((url): url is string => url !== null);

  const stats = siteSettings.stats;
  const tagline = siteSettings.tagline ?? "Viziunea ta merită\nforma perfectă.";
  const taglineSubtitle =
    siteSettings.taglineSubtitle ??
    "Proiecte personalizate, livrare rapidă și vizualizare 3D completă — de la concept la realitate.";

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center">
        <div className="absolute inset-0 bg-[#09090b]" />
        <HeroSlideshow images={heroImages} />
        <HeroVideo />
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-[#09090b]/60 to-[#09090b]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="text-accent text-sm font-medium tracking-[0.3em] uppercase">
            MardareV Arhitectură
          </p>
          <h1 className="mt-6 text-4xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl">
            {tagline.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className="text-muted mx-auto mt-6 max-w-2xl text-lg">
            {taglineSubtitle}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/proiecte"
              className="bg-accent hover:bg-accent-hover px-8 py-3 text-sm font-medium text-black transition-colors"
            >
              Vezi proiectele
            </Link>
            <Link
              href="/contact"
              className="border border-white/10 px-8 py-3 text-sm font-medium transition-colors hover:border-white/30"
            >
              Contactează-ne
            </Link>
          </div>
        </div>
      </section>

      {/* Value pillars */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="border-accent/30 border-t pt-8">
              <h3 className="text-lg font-semibold">Design Personalizat</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">
                Fiecare proiect este unic. Pornim de la viziunea dumneavoastră
                și o transformăm într-un spațiu care reflectă personalitatea și
                nevoile reale.
              </p>
            </div>
            <div className="border-accent/30 border-t pt-8">
              <h3 className="text-lg font-semibold">Livrare Rapidă</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">
                Prin utilizarea tehnologiei BIM și a proceselor optimizate,
                livrăm documentații complete în timp record, fără compromisuri
                de calitate.
              </p>
            </div>
            <div className="border-accent/30 border-t pt-8">
              <h3 className="text-lg font-semibold">Vizualizare 3D</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">
                Vedeți proiectul înainte de a fi construit. Modelele noastre 3D
                vă oferă o imagine completă a spațiului, pentru decizii
                informate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-accent text-sm font-medium tracking-wider uppercase">
                Portofoliu
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                Proiecte selectate
              </h2>
            </div>
            <Link
              href="/proiecte"
              className="text-muted hover:text-accent hidden text-sm transition-colors sm:block"
            >
              Toate proiectele &rarr;
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3">
          <div className="text-center">
            <p className="text-accent text-4xl font-bold">
              {stats?.projectsCompleted ?? "150+"}
            </p>
            <p className="text-muted mt-2 text-sm">
              {stats?.projectsLabel ?? "Proiecte finalizate"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-accent text-4xl font-bold">
              {stats?.yearsExperience ?? "12"}
            </p>
            <p className="text-muted mt-2 text-sm">
              {stats?.yearsLabel ?? "Ani de experiență"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-accent text-4xl font-bold">
              {stats?.avgDeliveryTime ?? "45 zile"}
            </p>
            <p className="text-muted mt-2 text-sm">
              {stats?.deliveryLabel ?? "Timp mediu de livrare"}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-accent text-sm font-medium tracking-wider uppercase">
            Testimoniale
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Ce spun clienții noștri
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="border-accent/30 border-l-2 pl-6"
              >
                <p className="text-sm leading-relaxed text-zinc-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-muted text-xs">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Hai să construim împreună.
          </h2>
          <p className="text-muted mt-4">
            Aveți un proiect în minte? Contactați-ne pentru o consultare
            gratuită.
          </p>
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent-hover mt-8 inline-block px-8 py-3 text-sm font-medium text-black transition-colors"
          >
            Contactează-ne
          </Link>
        </div>
      </section>
    </>
  );
}
