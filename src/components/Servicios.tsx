type Servicio = {
  titulo: string;
  desc: string;
  bullets: string[];
  icon: React.ReactNode;
};

const SERVICIOS: Servicio[] = [
  {
    titulo: "Limpieza profunda y aspirado",
    desc:
      "Cepillado de muros, pisos, escalones y nivel de azulejo + aspirado de sedimento. Retiro de hojas y algas adheridas. Lavado de skimmer y trampa de pelos.",
    bullets: [
      "Aspiradora profesional y cepillos no abrasivos",
      "Lavado de filtro de arena o cartucho según el caso",
      "Reporte fotográfico antes / después",
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M3 17c4-1 6-1 9 0s5 1 9 0" />
        <path d="M3 13c4-1 6-1 9 0s5 1 9 0" />
        <path d="M3 9c4-1 6-1 9 0s5 1 9 0" />
      </svg>
    ),
  },
  {
    titulo: "Balance químico (Cloro · pH · Algicidas)",
    desc:
      "Medición de cloro libre, pH, alcalinidad total, dureza cálcica y ácido cianúrico. Dosificación con productos avalados por COFEPRIS y registro de cada aplicación.",
    bullets: [
      "Kit profesional de medición fotométrica",
      "Algicida, clarificador y estabilizante grado piscina",
      "Bitácora física + digital por cada visita",
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9 2v6L4 19a2 2 0 002 3h12a2 2 0 002-3L15 8V2" />
        <line x1="9" y1="2" x2="15" y2="2" />
        <line x1="7" y1="14" x2="17" y2="14" />
      </svg>
    ),
  },
  {
    titulo: "Mantenimiento de bombas, filtros y equipos",
    desc:
      "Revisión preventiva y correctiva de bombas, filtros de arena o cartucho, calentadores, válvulas multipuerto, iluminación sumergible y bordes de azulejo.",
    bullets: [
      "Cambio de empaques, sellos y rodamientos",
      "Retrolavado y respaldo de filtro",
      "Diagnóstico eléctrico con multímetro",
    ],
    icon: (
      <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 005 15a1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 005 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 5a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09A1.65 1.65 0 0015 5a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019 9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09A1.65 1.65 0 0019.4 15z" />
      </svg>
    ),
  },
];

export function Servicios() {
  return (
    <section id="servicios" className="bg-cream py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-pool-600">Servicios</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Servicio integral para que tu alberca esté lista cuando la quieras usar.
          </h2>
          <p className="mt-3 text-ink-mute">
            Atendemos residencial y comercial (hoteles, salones de eventos, condominios y
            casas particulares) en la Zona Sur de Tamaulipas.
          </p>
        </header>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {SERVICIOS.map((s) => (
            <article
              key={s.titulo}
              className="card-hover relative rounded-2xl bg-white border border-pool-100 p-6 shadow-card"
            >
              <div className="absolute -top-4 left-6 inline-flex items-center justify-center size-12 rounded-xl bg-pool-grad text-white shadow-card">
                {s.icon}
              </div>
              <h3 className="mt-6 text-lg font-bold text-ink">{s.titulo}</h3>
              <p className="mt-2 text-sm text-ink-mute leading-relaxed">{s.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-ink-soft">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-pool-500" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
