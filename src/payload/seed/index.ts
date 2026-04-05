/* eslint-disable no-console */
import "dotenv/config";
import { getPayload } from "payload";
import config from "@payload-config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    default:
      return "image/jpeg";
  }
}

function textToLexical(text: string) {
  return {
    root: {
      type: "root",
      children: text
        .split("\n")
        .filter(Boolean)
        .map((paragraph) => ({
          type: "paragraph",
          children: [
            {
              type: "text",
              text: paragraph,
              format: 0,
              detail: 0,
              mode: "normal",
              style: "",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          textFormat: 0,
          textStyle: "",
          version: 1,
        })),
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

// ---------------------------------------------------------------------------
// Source data — Projects
// ---------------------------------------------------------------------------

interface ProjectData {
  slug: string;
  title: string;
  category: "rezidential" | "comercial" | "interior" | "peisagistica";
  categoryLabel: string;
  year: number;
  location: string;
  area: string;
  description: string;
  details: string;
  featured: boolean;
  images: string[];
}

const projectsData: ProjectData[] = [
  {
    slug: "cuza-voda",
    title: "Cuza Vodă",
    category: "rezidential",
    categoryLabel: "Rezidențial",
    year: 2024,
    location: "Suceava",
    area: "3.200 mp",
    description:
      "Ansamblu rezidențial modern cu fațadă din cărămidă aparentă și volume fragmentate, integrat sensibil în țesutul urban existent.",
    details:
      "Proiectul Cuza Vodă este un bloc de locuințe care reinterpretează scala și ritmul cartierului prin fragmentarea volumetriei și utilizarea cărămizii aparente ca material dominant. Conceptul arhitectural pornește de la analiza reglementărilor urbanistice și a orientării solare, rezultând o serie de excavări ale fațadei care creează balcoane generoase și jocuri de lumină. Gridul structural a fost optimizat pentru a maximiza suprafețele utile, iar tratamentul bichrom al fațadei — cărămidă și tencuială albă — conferă clădirii o identitate puternică în peisajul urban.",
    featured: true,
    images: [
      "/projects/cuza-voda/01_cuza-voda.jpg",
      "/projects/cuza-voda/02_cuza-voda.jpg",
      "/projects/cuza-voda/03_cuza-voda.jpg",
      "/projects/cuza-voda/3.3_cuza-voda.jpg",
      "/projects/cuza-voda/04_cuza-voda.jpg",
      "/projects/cuza-voda/04.1_cuza-voda_concept.jpg",
      "/projects/cuza-voda/05_cuza-voda.jpg",
      "/projects/cuza-voda/06_cuza-voda.jpg",
      "/projects/cuza-voda/07_cuza-voda.jpg",
      "/projects/cuza-voda/08_cuza-voda.jpg",
      "/projects/cuza-voda/09_cuza-voda.jpg",
      "/projects/cuza-voda/11_cuza-voda.jpg",
      "/projects/cuza-voda/12_cuza-voda.jpg",
      "/projects/cuza-voda/13_cuza-voda.jpg",
      "/projects/cuza-voda/15_cuza-voda.jpg",
    ],
  },
  {
    slug: "lupcina",
    title: "Lupcina",
    category: "rezidential",
    categoryLabel: "Rezidențial",
    year: 2025,
    location: "Câmpulung Moldovenesc",
    area: "450 mp",
    description:
      "Ansamblu de locuințe din lemn pe un versant montan, cu vedere panoramică spre valea Moldovei.",
    details:
      "Proiectul Lupcina îmbină tradiția constructivă locală cu limbajul arhitectural contemporan. Cele două volume — unul tradițional și unul modern — sunt amplasate pe un versant abrupt cu priveliște spectaculoasă spre munții Obcinei. Îmbrăcămintea din lemn natural conectează clădirile cu peisajul, iar volumetria fragmentată reduce impactul vizual în sit. Interioarele sunt gândite pentru a cadra peisajul, transformând fiecare fereastră într-un tablou viu.",
    featured: true,
    images: [
      "/projects/lupcina/1.jpg",
      "/projects/lupcina/2.jpg",
      "/projects/lupcina/3.jpg",
      "/projects/lupcina/4.jpg",
      "/projects/lupcina/5.jpg",
      "/projects/lupcina/6.jpg",
      "/projects/lupcina/7.jpg",
      "/projects/lupcina/8.jpg",
      "/projects/lupcina/9.jpg",
      "/projects/lupcina/10.jpg",
    ],
  },
  {
    slug: "farkas",
    title: "Farkas",
    category: "rezidential",
    categoryLabel: "Rezidențial",
    year: 2024,
    location: "Cluj-Napoca",
    area: "320 mp",
    description:
      "Vilă minimalistă cu volume curate și ferestre generoase, amplasată într-o zonă verde rezidențială.",
    details:
      "Casa Farkas este un exercițiu de simplitate și proporție. Volumele albe, decupate cu precizie, creează o compoziție echilibrată între plin și gol. Pergola de pe terasa superioară filtrează lumina și extinde spațiul de locuit în aer liber. Grădina matură înconjoară casa, oferind intimitate și o relație directă cu natura. Planimetria eficientă organizează zonele de zi la parter cu deschidere completă spre grădină, iar dormitoarele la etaj beneficiază de lumină naturală din toate direcțiile.",
    featured: true,
    images: [
      "/projects/farkas/1.jpg",
      "/projects/farkas/2.jpg",
      "/projects/farkas/3.jpg",
      "/projects/farkas/4.jpg",
      "/projects/farkas/5.jpg",
      "/projects/farkas/6.jpg",
      "/projects/farkas/7.jpg",
      "/projects/farkas/8.jpg",
      "/projects/farkas/9.jpg",
      "/projects/farkas/10.jpg",
    ],
  },
  {
    slug: "turtureanu",
    title: "Turtureanu",
    category: "rezidential",
    categoryLabel: "Rezidențial",
    year: 2023,
    location: "Suceava",
    area: "280 mp",
    description:
      "Locuință modernă cu geometrie expresivă și spații interioare fluide, adaptată contextului suburban.",
    details:
      "Proiectul Turtureanu propune o locuință cu identitate puternică într-un context suburban. Conceptul pornește de la intersecția a două volume — unul orizontal și unul vertical — generând spații cu înălțimi variate și perspective neașteptate. Fațadele albe cu accente de lemn și metal creează un joc subtil de texturi. Interioarele sunt gândite ca un traseu continuu, cu zone de zi deschise la parter și spații private retrase la etaj. Documentația tehnică completă, inclusiv fațade și planuri detaliate, a fost livrată prin flux BIM integrat.",
    featured: false,
    images: [
      "/projects/turtureanu/1.jpg",
      "/projects/turtureanu/2.jpg",
      "/projects/turtureanu/3.jpg",
      "/projects/turtureanu/4.jpg",
      "/projects/turtureanu/5.jpg",
      "/projects/turtureanu/6.jpg",
      "/projects/turtureanu/7.jpg",
      "/projects/turtureanu/8.jpg",
      "/projects/turtureanu/9.jpg",
      "/projects/turtureanu/10.jpg",
      "/projects/turtureanu/11.jpg",
      "/projects/turtureanu/12.jpg",
      "/projects/turtureanu/13.jpg",
      "/projects/turtureanu/14.jpg",
      "/projects/turtureanu/15.jpg",
      "/projects/turtureanu/16.jpg",
    ],
  },
  {
    slug: "moara-vlasiei",
    title: "Moara Vlăsiei",
    category: "rezidential",
    categoryLabel: "Rezidențial",
    year: 2025,
    location: "Moara Vlăsiei",
    area: "240 mp",
    description:
      "Casă cu inflexiuni tradiționale și materiale naturale, inserată organic într-un peisaj rural.",
    details:
      "Casa din Moara Vlăsiei reinterpretează tipologia locuinței rurale românești prin materiale contemporane și proporții recalibrate. Acoperișul în două ape și îmbrăcămintea din lemn dialoghează cu construcțiile din vecinătate, în timp ce ferestrele generoase și planul deschis reflectă modul de viață actual. Carportul cu structură din lemn completează ansamblul, iar grădina perimetrală asigură tranziția naturală între spațiul privat și drumul comunal.",
    featured: false,
    images: [
      "/projects/moara-vlasiei/1.jpg",
      "/projects/moara-vlasiei/2.jpg",
      "/projects/moara-vlasiei/3.jpg",
      "/projects/moara-vlasiei/4.jpg",
      "/projects/moara-vlasiei/5.jpg",
    ],
  },
  {
    slug: "snagov",
    title: "Snagov",
    category: "rezidential",
    categoryLabel: "Rezidențial",
    year: 2024,
    location: "Snagov",
    area: "350 mp",
    description:
      "Locuință contemporană cu acoperiș în două ape și terasă generoasă, proiectată pentru o familie tânără.",
    details:
      "Proiectul din Snagov combină volumetria tradițională a acoperișului în două ape cu un limbaj arhitectural modern și deschis. Balconul generos de la etaj extinde zona de zi în aer liber, iar ferestrele în bandă maximizează lumina naturală. Amenajarea terenului include o grădină structurată pe niveluri, cu zone de recreere și vegetație autohtonă. Planul funcțional organizează eficient spațiile pe trei niveluri — parter, etaj și mansardă — fiecare cu identitate proprie dar conectate printr-o scară centrală luminată zenital.",
    featured: true,
    images: [
      "/projects/snagov/1.jpg",
      "/projects/snagov/2.jpg",
      "/projects/snagov/3.jpg",
      "/projects/snagov/4.jpg",
      "/projects/snagov/5.jpg",
      "/projects/snagov/6.jpg",
      "/projects/snagov/7.jpg",
      "/projects/snagov/8.jpg",
      "/projects/snagov/9.jpg",
      "/projects/snagov/10.jpg",
      "/projects/snagov/11.jpg",
      "/projects/snagov/12.jpg",
      "/projects/snagov/13.jpg",
      "/projects/snagov/14.jpg",
      "/projects/snagov/15.jpg",
    ],
  },
  {
    slug: "deusu",
    title: "Deușu",
    category: "rezidential",
    categoryLabel: "Rezidențial",
    year: 2024,
    location: "Cluj-Napoca",
    area: "180 mp",
    description:
      "Locuință sculptată din piatră și lemn, cu fațadă perforată și acoperiș vegetal, într-o grădină de livadă.",
    details:
      "Casa Deușu este o declarație de materialitate și atenție la detaliu. Fațada din blocuri de piatră reconstituită, întreruptă de o structură din lamele de lemn care susține vegetația cățărătoare, creează un obiect arhitectural viu care se transformă odată cu anotimpurile. Acoperișul ascuțit, tratat ca o continuare a fațadei, amplifică verticalitatea compoziției. Interioarele sunt luminoase și generoase, cu ferestre de la podea la tavan care aduc livada în casă. Fiecare detaliu — de la rosturile pietrelor la profilele tâmplăriei — a fost desenat și coordonat prin modelul BIM.",
    featured: true,
    images: [
      "/projects/deusu/1.jpg",
      "/projects/deusu/2.jpg",
      "/projects/deusu/3.jpg",
      "/projects/deusu/4.jpg",
      "/projects/deusu/5.jpg",
      "/projects/deusu/6.jpg",
      "/projects/deusu/7.jpg",
      "/projects/deusu/8.jpg",
      "/projects/deusu/9.jpg",
      "/projects/deusu/10.jpg",
      "/projects/deusu/11.jpg",
      "/projects/deusu/12.jpg",
      "/projects/deusu/13.jpg",
      "/projects/deusu/14.jpg",
      "/projects/deusu/15.jpg",
      "/projects/deusu/16.jpg",
    ],
  },
  {
    slug: "maftean",
    title: "Maftean",
    category: "rezidential",
    categoryLabel: "Rezidențial",
    year: 2024,
    location: "Suceava",
    area: "380 mp",
    description:
      "Vilă cu accente neoclasice și plan generos, cu garaj integrat și grădină perimetrală.",
    details:
      "Proiectul Maftean reinterpretează villa suburbană prin volume ample și proporții clasice, adaptate nevoilor unei familii contemporane. Planul la parter organizează spațiile sociale într-un circuit fluid, cu deschideri generoase spre grădină pe toate laturile. Fațadele combină tencuiala decorativă cu elemente din piatră, iar acoperișul în patru ape cu învelitoare din țiglă conferă soliditate și eleganță. Garjul cu carport este integrat volumetric, menținând coerența ansamblului. Documentația include fațade detaliate, secțiuni și planuri de mobilare.",
    featured: false,
    images: [
      "/projects/maftean/1.jpg",
      "/projects/maftean/2.jpg",
      "/projects/maftean/3.jpg",
      "/projects/maftean/4.jpg",
      "/projects/maftean/5.jpg",
      "/projects/maftean/6.jpg",
      "/projects/maftean/7.jpg",
      "/projects/maftean/8.jpg",
      "/projects/maftean/9.jpg",
      "/projects/maftean/10.jpg",
      "/projects/maftean/11.jpg",
      "/projects/maftean/12.jpg",
      "/projects/maftean/13.jpg",
      "/projects/maftean/14.jpg",
    ],
  },
  {
    slug: "nicolaie",
    title: "Nicolaie",
    category: "rezidential",
    categoryLabel: "Rezidențial",
    year: 2023,
    location: "București",
    area: "220 mp",
    description:
      "Supraetajare și reconversie a unei locuințe existente, cu volum nou din beton aparent și metal.",
    details:
      "Proiectul Nicolaie transformă o casă modestă de cartier într-o locuință contemporană prin adăugarea unui volum la etaj din beton aparent și lamele metalice. Intervenția respectă amprenta la sol existentă, maximizând spațiul fără a modifica regimul de înălțime al zonei. Contrastul dintre parterul reabilitat și etajul nou creează un dialog între epoci. Lamelele metalice de pe fațadă filtrează lumina și asigură intimitate, în timp ce terasa retrasă de la etaj oferă un spațiu exterior protejat.",
    featured: false,
    images: [
      "/projects/nicolaie/1.jpg",
      "/projects/nicolaie/2.jpg",
      "/projects/nicolaie/3.jpg",
      "/projects/nicolaie/4.jpg",
      "/projects/nicolaie/5.jpg",
      "/projects/nicolaie/6.jpg",
    ],
  },
  {
    slug: "maguri-racatau",
    title: "Măguri Răcătău",
    category: "rezidential",
    categoryLabel: "Rezidențial",
    year: 2025,
    location: "Măguri Răcătău",
    area: "85 mp",
    description:
      "Cabană montană din lemn cu fereastră circulară iconică, pe un versant cu vedere spre vale.",
    details:
      "Cabana din Măguri Răcătău este un proiect esențial — o locuință mică dar cu caracter puternic, amplasată pe un versant abrupt cu priveliște spectaculoasă. Fereastra circulară din fațada principală devine elementul iconic al proiectului, cadrând peisajul montan ca un tablou. Structura din lemn și îmbrăcămintea din scândură naturală ancorează cabana în tradiția constructivă locală, în timp ce geometria ascuțită a acoperișului și proporțiile contemporane o proiectează în prezent.",
    featured: false,
    images: [
      "/projects/maguri-racatau/1.jpg",
      "/projects/maguri-racatau/2.jpg",
      "/projects/maguri-racatau/3.jpg",
      "/projects/maguri-racatau/4.jpg",
      "/projects/maguri-racatau/5.jpg",
    ],
  },
  {
    slug: "piscuc",
    title: "Piscuc",
    category: "comercial",
    categoryLabel: "Comercial",
    year: 2024,
    location: "Suceava",
    area: "1.200 mp",
    description:
      "Clădire mixtă cu funcțiuni comerciale și rezidențiale, cu fațadă articulată și volumetrie urbană.",
    details:
      "Proiectul Piscuc propune o clădire mixtă — comercial la parter, rezidențial la etajele superioare — care răspunde nevoii de densificare urbană responsabilă. Volumetria fragmentată și fațada articulată cu accente de culoare și materiale variate reduc scala percepută a clădirii, integrând-o în țesutul urban existent. Axonometria explodată dezvăluie organizarea funcțională pe verticală, cu circulații separate pentru cele două funcțiuni și spații comune generoase.",
    featured: false,
    images: [
      "/projects/piscuc/1.jpg",
      "/projects/piscuc/2.jpg",
      "/projects/piscuc/3.jpg",
      "/projects/piscuc/4.jpg",
      "/projects/piscuc/5.jpg",
    ],
  },
];

// ---------------------------------------------------------------------------
// Source data — Testimonials
// ---------------------------------------------------------------------------

const testimonialsData = [
  {
    quote:
      "Colaborarea cu echipa MardareV a redus semnificativ timpul de proiectare pentru ansamblul nostru rezidențial. Documentația BIM completă ne-a permis să începem construcția cu trei săptămâni mai devreme decât era planificat.",
    name: "Alexandru Ionescu",
    role: "Director Dezvoltare, Nordis Group",
  },
  {
    quote:
      "De la prima vizită la teren și până la predarea proiectului, ne-am simțit cu adevărat ascultați. Modelul 3D ne-a ajutat să vizualizăm casa visurilor noastre înainte ca prima cărămidă să fie pusă.",
    name: "Maria și Andrei Popescu",
    role: "Proprietari, București",
  },
  {
    quote:
      "Profesionalism, creativitate și respectarea termenelor — exact ce căutam. Echipa MardareV a transformat un spațiu comercial banal într-un mediu care ne reprezintă.",
    name: "Cristian Dumitrescu",
    role: "Fondator, Atelier Urbano",
  },
];

// ---------------------------------------------------------------------------
// Source data — Team Members
// ---------------------------------------------------------------------------

const teamMembersData = [
  { name: "Vlad Mardare", role: "Fondator & Arhitect Șef", order: 1 },
  { name: "Elena Stănescu", role: "Director de Proiecte", order: 2 },
  { name: "Mihai Radu", role: "Arhitect Senior", order: 3 },
  { name: "Ana Voicu", role: "Designer Interior", order: 4 },
  { name: "Bogdan Cristea", role: "Inginer Structuri", order: 5 },
  { name: "Raluca Marinescu", role: "Arhitect Peisagist", order: 6 },
];

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function seed() {
  const payload = await getPayload({ config });

  console.log("Starting seed...");

  // -----------------------------------------------------------------------
  // 1. Idempotency check
  // -----------------------------------------------------------------------
  const existingProjects = await payload.find({
    collection: "projects",
    limit: 1,
  });
  if (existingProjects.totalDocs > 0) {
    console.log("Database already seeded. Skipping.");
    process.exit(0);
  }

  // Resolve the project root so we can find public/projects/
  const projectRoot = path.resolve(__dirname, "..", "..", "..");

  // -----------------------------------------------------------------------
  // 2. Upload media & create projects
  // -----------------------------------------------------------------------
  for (let i = 0; i < projectsData.length; i++) {
    const project = projectsData[i];
    console.log(
      `[${i + 1}/${projectsData.length}] Uploading images for "${project.title}"...`,
    );

    const mediaIds: number[] = [];

    for (let j = 0; j < project.images.length; j++) {
      const imagePath = project.images[j]; // e.g. "/projects/cuza-voda/01_cuza-voda.jpg"
      const absolutePath = path.join(projectRoot, "public", imagePath);
      const filename = path.basename(imagePath);

      if (!fs.existsSync(absolutePath)) {
        console.warn(`  WARNING: File not found, skipping: ${absolutePath}`);
        continue;
      }

      const buffer = fs.readFileSync(absolutePath);

      const media = await payload.create({
        collection: "media",
        data: {
          alt: `${project.title} - ${j + 1}`,
        },
        file: {
          data: buffer,
          name: filename,
          mimetype: getMimeType(filename),
          size: buffer.length,
        },
      });

      mediaIds.push(media.id as number);
    }

    // First image becomes heroImage, rest go into galleryImages
    const heroImageId = mediaIds[0] ?? null;
    const galleryImageIds = mediaIds.slice(1);

    console.log(`  Creating project "${project.title}"...`);

    await payload.create({
      collection: "projects",
      data: {
        title: project.title,
        slug: project.slug,
        category: project.category,
        categoryLabel: project.categoryLabel,
        year: project.year,
        location: project.location,
        area: project.area,
        description: project.description,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        details: textToLexical(project.details) as any,
        featured: project.featured,
        heroImage: heroImageId,
        galleryImages: galleryImageIds.map((id) => ({
          image: id,
        })),
        order: i + 1,
      },
    });

    console.log(`  Done with "${project.title}" (${mediaIds.length} images).`);
  }

  console.log(`Created ${projectsData.length} projects.`);

  // -----------------------------------------------------------------------
  // 3. Testimonials
  // -----------------------------------------------------------------------
  console.log("Creating testimonials...");

  for (let i = 0; i < testimonialsData.length; i++) {
    const t = testimonialsData[i];
    await payload.create({
      collection: "testimonials",
      data: {
        quote: t.quote,
        name: t.name,
        role: t.role,
        featured: true,
        order: i + 1,
      },
    });
  }

  console.log(`Created ${testimonialsData.length} testimonials.`);

  // -----------------------------------------------------------------------
  // 4. Team Members
  // -----------------------------------------------------------------------
  console.log("Creating team members...");

  for (const member of teamMembersData) {
    await payload.create({
      collection: "team-members",
      data: {
        name: member.name,
        role: member.role,
        order: member.order,
      },
    });
  }

  console.log(`Created ${teamMembersData.length} team members.`);

  // -----------------------------------------------------------------------
  // 5. Site Settings (global)
  // -----------------------------------------------------------------------
  console.log("Updating site settings...");

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      siteName: "MardareV Arhitectură",
      tagline: "Viziunea ta merită forma perfectă.",
      taglineSubtitle:
        "Proiecte personalizate, livrare rapidă și vizualizare 3D completă — de la concept la realitate.",
      contactInfo: {
        email: "contact@mardarev.ro",
        phone: "+40 721 000 000",
        address: "Str. Arhitecților 42\nSector 1, București\nRomânia",
        hours: "Luni — Vineri: 09:00 — 18:00",
      },
      stats: {
        projectsCompleted: "150+",
        projectsLabel: "Proiecte finalizate",
        yearsExperience: "12",
        yearsLabel: "Ani de experiență",
        avgDeliveryTime: "45 zile",
        deliveryLabel: "Timp mediu de livrare",
      },
      copyrightText: "MardareV Arhitectură. Toate drepturile rezervate.",
    },
  });

  console.log("Site settings updated.");

  // -----------------------------------------------------------------------
  // 6. Navigation (global)
  // -----------------------------------------------------------------------
  console.log("Updating navigation...");

  await payload.updateGlobal({
    slug: "navigation",
    data: {
      headerLinks: [
        { label: "Acasă", href: "/", order: 1 },
        { label: "Proiecte", href: "/proiecte", order: 2 },
        { label: "Despre noi", href: "/despre-noi", order: 3 },
        { label: "Proces", href: "/proces", order: 4 },
        { label: "Contact", href: "/contact", order: 5 },
      ],
      footerLinks: [
        { label: "Proiecte", href: "/proiecte", order: 1 },
        { label: "Despre noi", href: "/despre-noi", order: 2 },
        { label: "Proces", href: "/proces", order: 3 },
        { label: "Contact", href: "/contact", order: 4 },
      ],
    },
  });

  console.log("Navigation updated.");

  // -----------------------------------------------------------------------
  // Done
  // -----------------------------------------------------------------------
  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
