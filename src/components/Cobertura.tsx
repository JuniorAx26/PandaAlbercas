const CIUDADES = [
  {
    nombre: "Tampico",
    desc: "Capital comercial del sur de Tamaulipas. Cobertura completa en todas las colonias y fraccionamientos.",
  },
  {
    nombre: "Ciudad Madero",
    desc: "Zona residencial costera. Atención especial a propiedades cerca de la playa por la salinidad ambiental.",
  },
  {
    nombre: "Altamira",
    desc: "Industrial y residencial. Cubrimos fraccionamientos privados y plazas comerciales con plan mensual.",
  },
];

export function Cobertura() {
  return (
    <section id="cobertura" className="relative bg-gradient-to-b from-white to-pool-50 py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-pool-600">Cobertura</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Servicio exclusivo en la Zona Sur de Tamaulipas.
          </h2>
          <p className="mt-3 text-ink-mute">
            Atención residencial y comercial en Tampico, Ciudad Madero y Altamira.
            Si no estás dentro de la zona, escríbenos: agendamos rutas mensuales hacia
            municipios cercanos del sur del estado.
          </p>
        </header>

        <div className="mt-12 grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center">
          <div className="grid sm:grid-cols-3 gap-4">
            {CIUDADES.map((c) => (
              <div
                key={c.nombre}
                className="rounded-2xl bg-white p-5 border border-pool-100 shadow-card card-hover"
              >
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center justify-center size-9 rounded-lg bg-pool-grad text-white">
                    <PinIcon />
                  </span>
                  <h3 className="font-bold text-ink">{c.nombre}</h3>
                </div>
                <p className="mt-3 text-sm text-ink-mute leading-relaxed">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-pool-700">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  Disponible
                </span>
              </div>
            ))}
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-pool-100 shadow-card">
            <MapaTamaulipas />
          </div>
        </div>
      </div>
    </section>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/**
 * Mapa estilizado de la Zona Sur de Tamaulipas. SVG decorativo, no requiere
 * librería de mapas: el objetivo es comunicar la zona y los 3 municipios.
 */
function MapaTamaulipas() {
  return (
    <svg
      viewBox="0 0 600 460"
      className="w-full h-full"
      role="img"
      aria-label="Mapa estilizado de la Zona Sur de Tamaulipas"
    >
      <defs>
        <linearGradient id="seaG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D9F0F8" />
          <stop offset="100%" stopColor="#7DC8E6" />
        </linearGradient>
        <linearGradient id="landG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F2F7FA" />
        </linearGradient>
      </defs>

      <rect width="600" height="460" fill="url(#seaG)" />
      {/* tierra (forma estilizada del sur del estado) */}
      <path
        d="M30 60 C150 30, 320 50, 430 120 C480 155, 470 220, 440 290 C420 340, 380 380, 320 400 C260 420, 200 410, 150 380 C90 340, 50 270, 40 200 C32 150, 20 100, 30 60 Z"
        fill="url(#landG)"
        stroke="#B1DFF1"
        strokeWidth="2"
      />
      {/* río Pánuco estilizado */}
      <path
        d="M120 360 Q220 340 320 360 T520 380"
        stroke="#3FAAD3"
        strokeWidth="3"
        fill="none"
        opacity="0.55"
      />
      <text x="450" y="375" fill="#0A5572" fontSize="11" fontWeight="600">Río Pánuco</text>

      {/* puntos */}
      <Pin x={245} y={345} label="Tampico" />
      <Pin x={310} y={330} label="Cd. Madero" />
      <Pin x={300} y={275} label="Altamira" />

      {/* etiqueta zona */}
      <g>
        <rect x="30" y="30" width="200" height="46" rx="10" fill="#FBFCFD" stroke="#B1DFF1" />
        <text x="50" y="50" fill="#0A5572" fontSize="12" fontWeight="700">ZONA SUR DE TAMAULIPAS</text>
        <text x="50" y="66" fill="#0F6F94" fontSize="11">Tampico · Madero · Altamira</text>
      </g>
    </svg>
  );
}

function Pin({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="22" fill="#1E8FB8" opacity="0.18" />
      <circle cx={x} cy={y} r="9" fill="#0A5572" />
      <circle cx={x} cy={y} r="3" fill="#FBFCFD" />
      <rect x={x + 14} y={y - 14} width={Math.max(80, label.length * 6.6)} height="22" rx="6" fill="#FBFCFD" stroke="#B1DFF1" />
      <text x={x + 22} y={y + 2} fontSize="12" fontWeight="700" fill="#0A5572">{label}</text>
    </g>
  );
}
