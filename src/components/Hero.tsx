import { whatsappLink, SITE } from "@/lib/site";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-pool-grad text-white">
      <div className="absolute inset-0 water-pattern" aria-hidden />
      <div className="absolute inset-x-0 -bottom-1 h-16 bg-gradient-to-t from-cream to-transparent" aria-hidden />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-28 sm:pb-32">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-semibold uppercase tracking-wider">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              Atención en {SITE.cities.join(" · ")}
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Agua cristalina en tu alberca
              <span className="block text-pool-100">de Tampico, Madero y Altamira.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg max-w-xl text-pool-100/95">
              Limpieza profunda, balance químico y mantenimiento preventivo con químicos
              certificados ante <b>COFEPRIS</b> y procedimientos alineados a la{" "}
              <b>NOM-245-SSA1-2010</b>. Servicio garantizado o regresamos sin costo extra.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-pool-700 font-bold shadow-card hover:shadow-card-hover transition"
              >
                <WaIcon />
                Cotizar por WhatsApp
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-white font-semibold hover:bg-white/10 transition"
              >
                Ver servicios
              </a>
            </div>

            <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl text-sm">
              <li className="flex items-center gap-2">
                <Check /> Cotización en menos de 24 h
              </li>
              <li className="flex items-center gap-2">
                <Check /> Personal de confianza
              </li>
              <li className="flex items-center gap-2">
                <Check /> Agua 100% segura
              </li>
            </ul>
          </div>

          <div className="relative hidden lg:block">
            <PoolGraphic />
          </div>
        </div>
      </div>
    </section>
  );
}

function WaIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.95 11.95 0 0012.05.05C5.5.05.16 5.39.16 11.93c0 2.1.55 4.14 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 005.78 1.47h.01c6.55 0 11.88-5.34 11.88-11.88 0-3.17-1.23-6.15-3.42-8.47zM12.06 21.8h-.01a9.86 9.86 0 01-5.02-1.37l-.36-.21-3.73.98 1-3.64-.24-.37a9.85 9.85 0 01-1.52-5.26c0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.13 1.03 7 2.9a9.85 9.85 0 012.9 7c0 5.45-4.44 9.88-9.9 9.88zm5.42-7.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.15-.17.2-.34.22-.64.07a8.13 8.13 0 01-2.39-1.48 8.97 8.97 0 01-1.65-2.06c-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.57-.49-.5-.66-.51l-.57-.01c-.2 0-.5.07-.77.37s-1.02 1-1.02 2.44 1.04 2.83 1.19 3.03c.15.2 2.06 3.15 5 4.42.7.3 1.24.48 1.66.62.7.22 1.34.19 1.84.12.56-.08 1.75-.71 2-1.4.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.34z" />
    </svg>
  );
}

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="text-pool-100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PoolGraphic() {
  return (
    <div className="relative aspect-[5/4]">
      <div className="absolute inset-0 rounded-3xl bg-white/8 backdrop-blur-sm border border-white/20 shadow-2xl overflow-hidden">
        {/* superficie de agua */}
        <div className="absolute inset-4 rounded-2xl bg-gradient-to-b from-pool-300 to-pool-600 overflow-hidden">
          <div className="absolute inset-0 bg-pool-shine opacity-60" />
          <div className="absolute inset-x-0 top-1/3 h-px bg-white/30 animate-wave" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/20 animate-wave" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-x-0 top-2/3 h-px bg-white/15 animate-wave" style={{ animationDelay: "2s" }} />
        </div>
        {/* etiqueta */}
        <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/85 text-ink px-4 py-3 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-widest text-pool-700 font-semibold">Parámetros típicos</p>
          <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm">
            <span><b>Cloro libre</b>: 1–3 ppm</span>
            <span><b>pH</b>: 7.2 – 7.6</span>
            <span><b>Alcalinidad</b>: 80–120 ppm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
