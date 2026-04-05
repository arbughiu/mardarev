import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  links: { label: string; href: string }[];
  contactInfo: {
    email?: string | null;
    phone?: string | null;
    address?: string | null;
  };
}

export function Footer({ links, contactInfo }: FooterProps) {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="MardareV Arhitectură"
                width={114}
                height={62}
                className="h-9 w-auto mix-blend-screen brightness-[.85] hue-rotate-[3deg] invert saturate-[3] sepia-[.85]"
              />
              <p className="text-lg font-semibold tracking-tight">
                Arhitectură
              </p>
            </div>
            <p className="text-muted mt-4 text-sm">
              Arhitectură personalizată cu livrare rapidă, de la concept la
              realitate.
            </p>
          </div>
          <div>
            <p className="text-muted text-sm font-medium tracking-wider uppercase">
              Navigare
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-accent text-sm text-zinc-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-muted text-sm font-medium tracking-wider uppercase">
              Contact
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-zinc-400">
              {contactInfo.email && <p>{contactInfo.email}</p>}
              {contactInfo.phone && <p>{contactInfo.phone}</p>}
              {contactInfo.address && <p>{contactInfo.address}</p>}
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/5 pt-8 text-center text-xs text-zinc-600">
          &copy; {new Date().getFullYear()} MardareV Arhitectură. Toate
          drepturile rezervate.
        </div>
      </div>
    </footer>
  );
}
