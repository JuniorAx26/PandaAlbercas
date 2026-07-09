# AGENTS.md — PandaAlbercas (Triana's clean)

Arranque en frío para un agente.

## Qué es
Landing (Next.js 15 App Router + React 19 + Tailwind + Supabase) de **Triana's clean**, limpieza y
mantenimiento de **albercas** en la Zona Sur de Tamaulipas (Tampico, Cd. Madero, Altamira). Deploy Vercel.

## Primeros pasos
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verificación (next build)
```

## Mapa mental
- Contenido/SEO → `src/app/layout.tsx` (metadata + JSON-LD LocalBusiness), `src/app/page.tsx`.
- Secciones → `src/components/*` (Hero, Servicios, Cobertura, Beneficios, Normatividad…).
- Backend → `supabase/migrations/` (esquema; probable formulario de contacto).

## Reglas del dominio
1. **SEO vía Next metadata API** (no react-helmet); no duplicar meta description.
2. **Normatividad**: la sección cita NOMs y organismos reales (COFEPRIS/PROFECO) — no inventar números.
3. **Datos personales** (si el formulario captura leads): RLS en Supabase + aviso de privacidad (LFPDPPP).
4. **Mobile-first** + paleta `pool-*` (identidad de marca).

## Convenciones del repo
README + CLAUDE.md + AGENTS.md + ROADMAP.md. Repo **privado**. Ver `claudeproyectos/BONES.md`
(giro: landing informativa/servicio con formulario). Antes de "listo": `npm run build` verde.
