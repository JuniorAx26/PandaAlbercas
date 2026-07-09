# ROADMAP — PandaAlbercas (Triana's clean)

> Landing de limpieza/mantenimiento de albercas en la Zona Sur de Tamaulipas.
> Next.js 15 (App Router) + React 19 + TS + Tailwind (`pool-*`) + Supabase · Deploy Vercel.

**Versión:** v1.0 · **Actualizado:** 2026-07-09

---

## Fase 1 · Landing ✅

- [x] **1.1** Estructura App Router (`layout.tsx`, `page.tsx`, `globals.css`, `icon.tsx` favicon dinámico).
- [x] **1.2** Secciones: Navbar, Hero, Servicios, Cobertura (mapa SVG de la zona), Beneficios, Normatividad.
- [x] **1.3** Diseño azul/blanco/negro (`pool-*`), mobile-first.
- [x] **1.4** SEO base: metadata + JSON-LD `LocalBusiness` + `sitemap.ts`.

## Fase 2 · Backend / contacto ✅ / ⏳

- [x] **2.1** Esquema inicial Supabase (`supabase/migrations/0001_init.sql`).
- [ ] **2.2** [P1] Formulario de contacto/cotización → Supabase (con validación Zod + RLS + anti-spam).
- [ ] **2.3** [P2] Aviso de privacidad (LFPDPPP) si se capturan datos personales.

## Fase 3 · Contenido real ⏳

- [ ] **3.1** [P1] Datos reales (teléfono, WhatsApp, precios/paquetes, fotos de trabajos).
- [ ] **3.2** [P2] Testimonios / galería antes-después.

## Fase 4 · Deploy + local-SEO ⏳

- [ ] **4.1** [P1] Deploy Vercel + dominio.
- [ ] **4.2** [P1] Google Business Profile + directorios locales (ver `documents/seo-kit-local-backlinks.md`).
- [ ] **4.3** [P3] PWA opcional.

---

_Repo privado. Giro: landing de servicio local (Zona Sur de Tamaulipas)._
