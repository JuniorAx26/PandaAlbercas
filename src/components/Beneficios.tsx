const BENEFICIOS = [
  {
    titulo: "Puntualidad real",
    desc: "Llegamos en la ventana acordada o avisamos con al menos 1 hora de anticipación. Sin ghosting.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    titulo: "Personal de confianza",
    desc: "Técnicos uniformados, identificados, capacitados en manejo de químicos NOM-018-STPS-2015.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    titulo: "Agua 100% segura",
    desc: "Parámetros del agua dentro del rango de la NOM-245-SSA1-2010 para uso recreativo en albercas.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z" />
        <circle cx="12" cy="9" r="3" />
      </svg>
    ),
  },
  {
    titulo: "Cotización rápida",
    desc: "Respuesta por WhatsApp en menos de 24 horas hábiles con propuesta clara y por escrito.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
  },
];

export function Beneficios() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-pool-600">¿Por qué Triana&apos;s clean?</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Lo mínimo aceptable para nosotros es lo mejor para ti.
          </h2>
        </header>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BENEFICIOS.map((b) => (
            <div
              key={b.titulo}
              className="rounded-2xl p-5 bg-cream border border-pool-100 card-hover"
            >
              <div className="inline-flex items-center justify-center size-11 rounded-xl bg-pool-grad text-white">
                {b.icon}
              </div>
              <h3 className="mt-4 font-bold text-ink">{b.titulo}</h3>
              <p className="mt-1.5 text-sm text-ink-mute leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
