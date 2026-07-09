# CLAUDE.md — PandaAlbercas (Triana's clean)

Contexto rápido para Claude Code. Doc completa en [README.md](./README.md) · arranque cold en [AGENTS.md](./AGENTS.md).

## Tipo de proyecto
**Next.js 15** (App Router) + React 19 + TS estricto + **Tailwind** + **Supabase**. Landing de
**Triana's clean**, negocio de **limpieza y mantenimiento de albercas** en la Zona Sur de Tamaulipas
(Tampico, Cd. Madero, Altamira). Diseño azul/blanco/negro (paleta `pool-*`), mobile-first. Deploy **Vercel**.

## Comandos
```bash
npm install
npm run dev          # next dev
npm run build        # next build
```

## Estructura clave
- `src/app/` — `layout.tsx` (SEO, JSON-LD `LocalBusiness`, fuentes), `page.tsx` (composición), `sitemap.ts`, `icon.tsx` (favicon dinámico).
- `src/components/` — `Navbar`, `Hero`, `Servicios`, `Cobertura` (mapa SVG de la zona), `Beneficios`, `Normatividad` (NOM-245/018/005, COFEPRIS, PROFECO), etc.
- `src/lib/` — utilidades + cliente Supabase.
- `supabase/migrations/0001_init.sql` — esquema inicial (probablemente formulario de contacto/leads).

## Gotchas
- **Next.js metadata API** (no react-helmet): el SEO se define en `layout.tsx`/`generateMetadata`, no en un index.html. No dupliques meta.
- Paleta `pool-*` (azul agua) + ink/cream en `tailwind.config`.
- Sección **Normatividad** cita NOMs reales (NOM-245-SSA1, etc.) — verificar antes de cambiar.
- Si hay formulario → leads a Supabase (RLS por si guarda datos personales).

## Datos del negocio
- Triana's clean · limpieza/mantenimiento de albercas · Zona Sur de Tamaulipas.
