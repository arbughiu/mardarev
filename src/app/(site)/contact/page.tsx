import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — MardareV Arhitectură",
  description: "Contactați-ne pentru o consultare gratuită.",
};

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise });
  const siteSettings = await payload.findGlobal({ slug: "site-settings" });

  const contactInfo = siteSettings.contactInfo;

  return (
    <main className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-accent text-sm font-medium tracking-wider uppercase">
          Contact
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Hai să vorbim.
        </h1>
        <p className="text-muted mt-4 max-w-2xl">
          Aveți un proiect în minte sau doriți mai multe informații? Completați
          formularul sau contactați-ne direct.
        </p>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_400px]">
          <ContactForm />

          <div className="space-y-8">
            <div>
              <p className="text-muted text-sm font-medium tracking-wider uppercase">
                Email
              </p>
              <p className="mt-2">
                {contactInfo?.email ?? "contact@mardarev.ro"}
              </p>
            </div>
            <div>
              <p className="text-muted text-sm font-medium tracking-wider uppercase">
                Telefon
              </p>
              <p className="mt-2">{contactInfo?.phone ?? "+40 721 000 000"}</p>
            </div>
            <div>
              <p className="text-muted text-sm font-medium tracking-wider uppercase">
                Adresă
              </p>
              <p className="mt-2 whitespace-pre-line">
                {contactInfo?.address ??
                  "Str. Arhitecților 42\nSector 1, București\nRomânia"}
              </p>
            </div>
            <div>
              <p className="text-muted text-sm font-medium tracking-wider uppercase">
                Program
              </p>
              <p className="mt-2 whitespace-pre-line">
                {contactInfo?.hours ??
                  "Luni — Vineri: 09:00 — 18:00\nSâmbătă — Duminică: Închis"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
