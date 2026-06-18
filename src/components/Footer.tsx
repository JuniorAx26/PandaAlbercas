import Link from "next/link";
import { PandaLogo } from "./PandaLogo";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "#inicio",      label: "Inicio" },
  { href: "#servicios",   label: "Servicios" },
  { href: "#cobertura",   label: "Cobertura" },
  { href: "#normatividad", label: "Normatividad" },
  { href: "#contacto",    label: "Contacto" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-[1.3fr_1fr_1fr] gap-10">
        <div>
          <Link href="#inicio" className="flex items-center gap-2.5">
            <PandaLogo size={48} variant="light" />
            <div>
              <p className="font-bold text-lg">{SITE.name}</p>
              <p className="text-xs uppercase tracking-widest text-pool-300">Albercas Zona Sur · Tamps.</p>
            </div>
          </Link>
          <p className="mt-4 text-sm text-white/70 max-w-sm leading-relaxed">
            Limpieza, balance químico y mantenimiento profesional de albercas en Tampico,
            Ciudad Madero y Altamira. Cumplimos NOM-245-SSA1-2010, COFEPRIS y NOM-018-STPS-2015.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-pool-300 font-bold">Enlaces</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-pool-300 font-bold">Redes &amp; contacto</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp directo
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
            </li>
            <li>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
            </li>
            <li>{SITE.hours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between text-xs text-white/55">
          <p>© {year} {SITE.name}. Todos los derechos reservados.</p>
          <p>
            Hecho en Tampico, Tamaulipas, México · Cumplimiento sanitario alineado a
            NOM-245-SSA1-2010
          </p>
        </div>
      </div>
    </footer>
  );
}
