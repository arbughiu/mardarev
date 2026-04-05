import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Proces — MardareV Arhitectură",
  description:
    "Procesul nostru de lucru — de la concept la realitate, pas cu pas.",
};

function ConsultareIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      {/* Terrain line */}
      <path
        d="M10 95 L30 80 L50 88 L70 72 L90 78 L110 65"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
      />
      {/* House */}
      <path d="M40 70 L60 52 L80 70" stroke="currentColor" strokeWidth="1.5" />
      <rect
        x="44"
        y="70"
        width="32"
        height="22"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="54"
        y="78"
        width="12"
        height="14"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Location pin */}
      <circle cx="92" cy="35" r="8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="92" cy="35" r="3" fill="currentColor" opacity="0.4" />
      <path
        d="M92 43 L92 55"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      {/* Compass lines */}
      <path
        d="M15 30 L25 30 M20 25 L20 35"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
    </svg>
  );
}

function ConceptIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      {/* Overlapping rectangles - floor plan feel */}
      <rect
        x="20"
        y="30"
        width="50"
        height="60"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <rect
        x="35"
        y="20"
        width="55"
        height="65"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* Inner divisions */}
      <line
        x1="35"
        y1="50"
        x2="90"
        y2="50"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="60"
        y1="20"
        x2="60"
        y2="85"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      {/* Pencil */}
      <line
        x1="75"
        y1="95"
        x2="100"
        y2="70"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M73 97 L75 91 L79 95 Z" fill="currentColor" opacity="0.6" />
      <line
        x1="97"
        y1="73"
        x2="101"
        y2="69"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Vizualizare3DIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      {/* Isometric cube */}
      <path
        d="M60 25 L95 45 L95 80 L60 100 L25 80 L25 45 Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M60 25 L60 60" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M60 60 L95 80"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <path
        d="M60 60 L25 80"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
      />
      {/* Front faces shading */}
      <path
        d="M60 60 L60 100 L25 80 L25 45 Z"
        fill="currentColor"
        opacity="0.08"
      />
      <path
        d="M60 60 L60 100 L95 80 L95 45 Z"
        fill="currentColor"
        opacity="0.04"
      />
      {/* Grid lines on top face */}
      <line
        x1="42"
        y1="35"
        x2="77"
        y2="55"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.2"
      />
      <line
        x1="43"
        y1="52"
        x2="78"
        y2="32"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.2"
      />
    </svg>
  );
}

function DocumentatieIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      {/* Back sheet */}
      <rect
        x="30"
        y="18"
        width="60"
        height="78"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
        rx="1"
      />
      {/* Middle sheet */}
      <rect
        x="25"
        y="24"
        width="60"
        height="78"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.4"
        rx="1"
        fill="currentColor"
        fillOpacity="0.02"
      />
      {/* Front sheet */}
      <rect
        x="20"
        y="30"
        width="60"
        height="78"
        stroke="currentColor"
        strokeWidth="1.5"
        rx="1"
        fill="currentColor"
        fillOpacity="0.04"
      />
      {/* Text lines */}
      <line
        x1="30"
        y1="48"
        x2="60"
        y2="48"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <line
        x1="30"
        y1="56"
        x2="70"
        y2="56"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />
      <line
        x1="30"
        y1="63"
        x2="65"
        y2="63"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />
      <line
        x1="30"
        y1="70"
        x2="55"
        y2="70"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.25"
      />
      {/* Stamp / checkmark */}
      <circle
        cx="90"
        cy="85"
        r="14"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path
        d="M83 85 L88 90 L97 80"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AsistentaIcon() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="h-full w-full">
      {/* Building structure */}
      <rect
        x="25"
        y="40"
        width="45"
        height="58"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Floors */}
      <line
        x1="25"
        y1="58"
        x2="70"
        y2="58"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      <line
        x1="25"
        y1="74"
        x2="70"
        y2="74"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.3"
      />
      {/* Windows */}
      <rect
        x="32"
        y="44"
        width="8"
        height="10"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      <rect
        x="50"
        y="44"
        width="8"
        height="10"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      <rect
        x="32"
        y="62"
        width="8"
        height="8"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      <rect
        x="50"
        y="62"
        width="8"
        height="8"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      {/* Crane */}
      <line
        x1="85"
        y1="98"
        x2="85"
        y2="22"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <line
        x1="85"
        y1="22"
        x2="55"
        y2="22"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <line
        x1="85"
        y1="22"
        x2="100"
        y2="22"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* Crane cable */}
      <line
        x1="65"
        y1="22"
        x2="65"
        y2="36"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="3 2"
        opacity="0.4"
      />
      {/* Counterweight */}
      <rect
        x="95"
        y="22"
        width="8"
        height="6"
        fill="currentColor"
        opacity="0.2"
      />
      {/* Ground line */}
      <line
        x1="15"
        y1="98"
        x2="105"
        y2="98"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.2"
      />
    </svg>
  );
}

const steps: {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    number: "01",
    title: "Consultare Inițială",
    description:
      "Totul începe cu o întâlnire. Vizităm locația, discutăm despre nevoile și viziunea dumneavoastră, evaluăm terenul și contextul urban. Această etapă ne permite să înțelegem nu doar ce doriți, ci și de ce.",
    icon: <ConsultareIcon />,
  },
  {
    number: "02",
    title: "Concept & Design",
    description:
      "Dezvoltăm conceptul arhitectural pornind de la concluziile consultării. Studii de volum, schițe și variante de design — toate personalizate pentru proiectul dumneavoastră. Prezentăm conceptul și îl rafinăm împreună.",
    icon: <ConceptIcon />,
  },
  {
    number: "03",
    title: "Vizualizare 3D",
    description:
      "Prin modelarea BIM completă și randări fotorealiste, veți vedea exact cum va arăta proiectul final. Tururile virtuale 3D vă permit să explorați fiecare spațiu și să luați decizii informate.",
    icon: <Vizualizare3DIcon />,
  },
  {
    number: "04",
    title: "Documentație Tehnică",
    description:
      "Elaborăm documentația tehnică completă, coordonând toate specialitățile: structură, instalații, finisaje. Datorită fluxului BIM, documentația este consistentă, precisă și gata pentru execuție.",
    icon: <DocumentatieIcon />,
  },
  {
    number: "05",
    title: "Asistență în Execuție",
    description:
      "Nu ne oprim la proiect. Oferim asistență tehnică pe toată durata construcției, cu vizite periodice pe șantier și verificarea conformității lucrărilor cu documentația de proiect.",
    icon: <AsistentaIcon />,
  },
];

export default function ProcesPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-accent text-sm font-medium tracking-wider uppercase">
          Proces
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          De la idee la realitate.
        </h1>
        <p className="text-muted mt-4 max-w-2xl text-lg">
          Un proces transparent și eficient, gândit să transforme viziunea
          dumneavoastră în spații construite — rapid și fără surprize.
        </p>

        <div className="mt-20">
          {steps.map((step) => (
            <div
              key={step.number}
              className="grid gap-8 border-t border-white/5 py-16 md:grid-cols-[120px_1fr]"
            >
              <div className="relative h-28 w-28">
                <p className="text-accent/30 relative z-10 text-5xl font-bold">
                  {step.number}
                </p>
                <div className="text-accent/40 absolute -top-4 -left-2 h-28 w-28">
                  {step.icon}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{step.title}</h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-zinc-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-white/5 pt-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Gata să începem?
          </h2>
          <p className="text-muted mt-4">
            Contactați-ne pentru o consultare inițială gratuită.
          </p>
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent-hover mt-8 inline-block px-8 py-3 text-sm font-medium text-black transition-colors"
          >
            Programează o consultare
          </Link>
        </div>
      </div>
    </main>
  );
}
