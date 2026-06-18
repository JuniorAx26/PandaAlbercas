import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · Limpieza y mantenimiento de albercas — Tampico, Madero y Altamira`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "Limpieza profunda, balance químico y mantenimiento profesional de albercas en Tampico, Ciudad Madero y Altamira. Químicos COFEPRIS y procedimientos NOM-245-SSA1-2010.",
  keywords: [
    "limpieza de albercas",
    "mantenimiento de albercas",
    "Tampico",
    "Ciudad Madero",
    "Altamira",
    "químicos para alberca",
    "NOM-245-SSA1-2010",
    "COFEPRIS",
    "Triana's clean",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Albercas cristalinas en la Zona Sur de Tamaulipas`,
    description:
      "Servicio garantizado de limpieza y mantenimiento de albercas en Tampico, Madero y Altamira. NOM-245-SSA1-2010 + COFEPRIS.",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description:
      "Albercas cristalinas en Tampico, Madero y Altamira. Cotiza por WhatsApp.",
  },
  alternates: { canonical: SITE.url },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1E8FB8",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  image: `${SITE.url}/og.png`,
  url: SITE.url,
  telephone: `+${SITE.whatsapp}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tampico",
    addressRegion: "Tamaulipas",
    addressCountry: "MX",
  },
  areaServed: SITE.cities.map((c) => ({ "@type": "City", name: c })),
  priceRange: "$$",
  description:
    "Limpieza y mantenimiento profesional de albercas. Apegados a NOM-245-SSA1-2010 y químicos certificados COFEPRIS.",
  contactPoint: [{
    "@type": "ContactPoint",
    telephone: `+${SITE.whatsapp}`,
    contactType: "customer service",
    contactOption: "WhatsApp",
    areaServed: "MX",
    availableLanguage: ["Spanish"],
  }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-MX">
      <body className="min-h-screen antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
