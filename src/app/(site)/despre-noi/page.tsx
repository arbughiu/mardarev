import type { Metadata } from "next";
import Image from "next/image";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getMediaUrl } from "@/lib/getMediaUrl";

export const metadata: Metadata = {
  title: "Despre noi — MardareV Arhitectură",
  description:
    "Echipa MardareV Arhitectură — arhitectură personalizată cu livrare rapidă.",
};

export default async function DespreNoiPage() {
  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: "team-members",
    sort: "order",
    limit: 50,
  });

  const team = result.docs.map((member) => ({
    name: member.name,
    role: member.role,
    photoUrl: getMediaUrl(member.photo),
  }));

  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Philosophy */}
        <section>
          <p className="text-accent text-sm font-medium tracking-wider uppercase">
            Despre noi
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Credem în arhitectura care
            <br />
            servește oamenii.
          </h1>
          <div className="mt-8 grid gap-12 md:grid-cols-2">
            <p className="text-lg leading-relaxed text-zinc-300">
              MardareV Arhitectură este un birou de proiectare fondat pe
              principiul că fiecare spațiu trebuie să fie la fel de unic ca
              oamenii care îl locuiesc. Combinăm creativitatea cu tehnologia
              pentru a livra proiecte care depășesc așteptările.
            </p>
            <p className="text-lg leading-relaxed text-zinc-300">
              De la rezidențial la comercial, de la design interior la
              peisagistică, abordarea noastră este mereu aceeași: ascultăm,
              înțelegem și transformăm viziunea clientului într-o realitate
              construită. Folosim cele mai noi tehnologii BIM pentru a asigura
              precizie, eficiență și livrare rapidă.
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="mt-32">
          <p className="text-accent text-sm font-medium tracking-wider uppercase">
            Echipa
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Oamenii din spatele proiectelor
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="group">
                {member.photoUrl ? (
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="aspect-[3/4] bg-gradient-to-br from-zinc-800 to-zinc-900" />
                )}
                <p className="mt-4 font-medium">{member.name}</p>
                <p className="text-muted text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section className="mt-32">
          <p className="text-accent text-sm font-medium tracking-wider uppercase">
            Tehnologie
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">
            Instrumente moderne pentru rezultate excepționale
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="border border-white/5 p-8">
              <h3 className="text-lg font-semibold">BIM</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">
                Building Information Modeling ne permite să coordonăm toate
                disciplinele într-un model unic, reducând erorile și accelerând
                procesul de proiectare.
              </p>
            </div>
            <div className="border border-white/5 p-8">
              <h3 className="text-lg font-semibold">Vizualizare 3D</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">
                Randări fotorealiste și tururi virtuale care vă permit să
                experimentați spațiul înainte de a fi construit, pentru decizii
                informate.
              </p>
            </div>
            <div className="border border-white/5 p-8">
              <h3 className="text-lg font-semibold">Documentație digitală</h3>
              <p className="text-muted mt-3 text-sm leading-relaxed">
                Documentații tehnice complete, extrase direct din modelul BIM,
                asigurând consistență și precizie în fiecare detaliu.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
