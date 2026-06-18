"use client";

import Link from "next/link";
import { useState } from "react";
import { PandaLogo } from "./PandaLogo";
import { SITE, whatsappLink } from "@/lib/site";

const links = [
  { href: "#inicio",      label: "Inicio" },
  { href: "#servicios",   label: "Servicios" },
  { href: "#cobertura",   label: "Cobertura" },
  { href: "#normatividad", label: "Garantía" },
  { href: "#contacto",    label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream/85 backdrop-blur supports-[backdrop-filter]:bg-cream/70 border-b border-pool-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="#inicio" className="flex items-center gap-2.5 group">
          <PandaLogo size={40} />
          <span className="flex flex-col leading-none">
            <span className="font-bold text-ink text-base sm:text-lg">{SITE.name}</span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-pool-700">
              Albercas Zona Sur
            </span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-ink-soft hover:text-pool-600 transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-pool-grad text-white text-sm font-semibold shadow-card hover:shadow-card-hover transition-shadow"
          >
            Cotizar ahora
          </a>
        </div>

        <button
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 rounded-md text-ink"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6"  x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-pool-100 bg-cream">
          <ul className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-lg text-ink-soft hover:bg-pool-50 hover:text-pool-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block text-center px-4 py-2.5 rounded-full bg-pool-grad text-white font-semibold shadow-card"
              >
                Cotizar ahora
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
