import { Geist, Geist_Mono } from "next/font/google";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getPayload({ config: configPromise });

  const [navigation, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: "navigation" }),
    payload.findGlobal({ slug: "site-settings" }),
  ]);

  const headerLinks = (navigation.headerLinks ?? []).map((link) => ({
    label: link.label,
    href: link.href,
  }));

  const footerLinks = (navigation.footerLinks ?? []).map((link) => ({
    label: link.label,
    href: link.href,
  }));

  const contactInfo = {
    email: siteSettings.contactInfo?.email ?? null,
    phone: siteSettings.contactInfo?.phone ?? null,
    address: siteSettings.contactInfo?.address ?? null,
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
    >
      <Navbar links={headerLinks} />
      <div className="flex-1">{children}</div>
      <Footer links={footerLinks} contactInfo={contactInfo} />
    </div>
  );
}
