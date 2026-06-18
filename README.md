# PandaAlbercas — Landing de `Triana's clean`

Landing page profesional para un negocio de **limpieza y mantenimiento de albercas**
en la Zona Sur de Tamaulipas (Tampico, Ciudad Madero y Altamira). Diseño limpio en
azul/blanco/negro, mobile-first, listo para desplegar en Vercel.

## Stack

- **Next.js 15** · App Router · TypeScript estricto
- **React 19**
- **Tailwind CSS 3.4** · paleta `pool-*` (azul agua) + ink/cream
- **Vercel CLI** para despliegue

## Estructura

```
src/
├── app/
│   ├── layout.tsx       # SEO, JSON-LD LocalBusiness, fuentes
│   ├── page.tsx         # composición de la landing
│   ├── globals.css      # Tailwind + tokens
│   ├── icon.tsx         # favicon dinámico
│   └── sitemap.ts
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Servicios.tsx
│   ├── Cobertura.tsx        # mapa SVG estilizado de la zona
│   ├── Beneficios.tsx
│   ├── Normatividad.tsx     # NOM-245, NOM-018, NOM-005, COFEPRIS, PROFECO
│   ├── Contacto.tsx         # formulario → WhatsApp prefill
│   ├── Footer.tsx
│   ├── WhatsAppFloat.tsx    # botón flotante
│   └── PandaLogo.tsx        # SVG inline
└── lib/
    └── site.ts              # configuración de marca + WhatsApp helper
```

## Setup local

```bash
bun install            # o npm install / pnpm install
cp .env.example .env.local
bun run dev            # http://localhost:3000
```

Variables:

| Variable                       | Uso                                                     |
| ------------------------------ | ------------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER`  | Número del negocio (sin +, sin espacios). Default `528331074325`. |
| `NEXT_PUBLIC_SITE_URL`         | URL canónica (sin slash final). Default Vercel preview. |

## Normatividad documentada

La sección `#normatividad` lista las referencias que respaldan el servicio:

- **NOM-245-SSA1-2010** — calidad sanitaria del agua en albercas.
- **NOM-018-STPS-2015** — comunicación de peligros químicos (SGA).
- **NOM-005-STPS-1998** — manejo, transporte y almacenamiento de químicos.
- **Registros COFEPRIS** — todos los insumos sanitizantes utilizados.
- **NOM-127-SSA1-2021** — agua para uso y consumo humano (referencia).
- **LFPC · PROFECO** — cotizaciones por escrito, contrato civil disponible.

Más: garantías contractuales (visita gratuita si el agua no queda dentro de
parámetros), bitácora física, reporte fotográfico y referencia al art. 1910 CCF
sobre responsabilidad civil.

## Deploy en Vercel

```bash
vercel link            # primera vez
vercel deploy --prod   # promueve a producción
```

El proyecto está pensado para correr sin variables obligatorias (el WhatsApp
number tiene default), pero **es recomendable** definir `NEXT_PUBLIC_SITE_URL`
en el dashboard de Vercel para que el `sitemap.xml`, JSON-LD y Open Graph
apunten al dominio final.
