type Norma = {
  codigo: string;
  titulo: string;
  emisor: string;
  aplicacion: string;
};

const NORMAS: Norma[] = [
  {
    codigo: "NOM-245-SSA1-2010",
    titulo: "Requisitos sanitarios y calidad del agua que deben cumplir las albercas",
    emisor: "Secretaría de Salud (DOF, 25/07/2012)",
    aplicacion:
      "Es la norma rectora en México para albercas de uso colectivo y privado. Define cloro residual libre (1–3 ppm), pH (7.2–7.8), turbiedad, recambio y mantenimiento. Cada visita queda documentada con estos parámetros.",
  },
  {
    codigo: "NOM-018-STPS-2015",
    titulo: "Sistema armonizado de identificación y comunicación de peligros químicos",
    emisor: "Secretaría del Trabajo y Previsión Social",
    aplicacion:
      "Todo nuestro personal opera bajo SGA: hojas de datos de seguridad (SDS), pictogramas y EPP para manejar hipoclorito de sodio, ácido cianúrico, sulfato de aluminio y algicidas.",
  },
  {
    codigo: "NOM-005-STPS-1998",
    titulo: "Manejo, transporte y almacenamiento de sustancias químicas peligrosas",
    emisor: "Secretaría del Trabajo y Previsión Social",
    aplicacion:
      "Controla el transporte de químicos hacia y desde tu domicilio en envases originales, bajo condiciones de ventilación y separación de incompatibles.",
  },
  {
    codigo: "Registro COFEPRIS",
    titulo: "Insumos sanitizantes con registro vigente",
    emisor: "Comisión Federal para la Protección contra Riesgos Sanitarios",
    aplicacion:
      "Sólo usamos cloro, algicidas, clarificadores y reguladores de pH con registro sanitario COFEPRIS vigente. Te compartimos el registro de cada producto bajo solicitud.",
  },
  {
    codigo: "NOM-127-SSA1-2021",
    titulo: "Agua para uso y consumo humano — límites permisibles",
    emisor: "Secretaría de Salud",
    aplicacion:
      "Referencia técnica para verificar metales pesados, dureza y minerales que pueden alterar la calidad del agua de tu alberca al rellenar con agua de la red.",
  },
  {
    codigo: "LFPC · PROFECO",
    titulo: "Ley Federal de Protección al Consumidor",
    emisor: "Procuraduría Federal del Consumidor",
    aplicacion:
      "Cada cotización es por escrito, con alcance, precios y plazos. Contrato civil de prestación de servicios disponible para clientes comerciales (hoteles, condominios, salones).",
  },
];

const GARANTIAS = [
  {
    titulo: "Garantía de agua cristalina",
    texto:
      "Si tras nuestra limpieza profunda el agua no queda transparente y dentro de los parámetros NOM-245-SSA1-2010, regresamos sin costo dentro de los 7 días posteriores.",
  },
  {
    titulo: "Reporte por visita",
    texto:
      "Recibes en WhatsApp o correo un reporte con fotos antes/después, medición de cloro libre, pH, alcalinidad y los químicos aplicados (marca, cantidad, registro COFEPRIS).",
  },
  {
    titulo: "Bitácora física en tu domicilio",
    texto:
      "Dejamos una libreta de bitácora donde se anota cada visita y los próximos parámetros esperados — útil para hoteles, condominios y clientes con auditoría sanitaria.",
  },
  {
    titulo: "Responsabilidad civil y penal",
    texto:
      "Cumplimos con la Ley Federal del Trabajo y la Ley Federal de Protección al Consumidor. Los daños imputables a maniobra incorrecta se reparan conforme al artículo 1910 del Código Civil Federal.",
  },
];

export function Normatividad() {
  return (
    <section id="normatividad" className="bg-ink text-white py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-widest text-pool-300">
            Normatividad &amp; Garantía
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Trabajo certificado y trazable — no &ldquo;creérnoslo&rdquo;.
          </h2>
          <p className="mt-3 text-white/70">
            Cumplimos con la regulación sanitaria mexicana aplicable a la limpieza y
            tratamiento del agua en albercas. Cada visita es trazable y reportada por escrito,
            con químicos certificados ante COFEPRIS y procedimientos alineados a la
            NOM-245-SSA1-2010.
          </p>
        </header>

        {/* Normas aplicables */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NORMAS.map((n) => (
            <article
              key={n.codigo}
              className="rounded-2xl p-5 bg-white/[0.04] border border-white/10 backdrop-blur-sm card-hover"
            >
              <div className="flex items-center gap-2 text-xs text-pool-200 font-semibold">
                <DocIcon />
                {n.emisor}
              </div>
              <h3 className="mt-3 font-bold text-white tracking-tight">{n.codigo}</h3>
              <p className="text-sm text-white/85 mt-1">{n.titulo}</p>
              <p className="mt-3 text-sm text-white/65 leading-relaxed">{n.aplicacion}</p>
            </article>
          ))}
        </div>

        {/* Garantías */}
        <div className="mt-14 rounded-3xl overflow-hidden border border-pool-700/50 bg-gradient-to-br from-pool-800 to-pool-900 p-6 sm:p-10">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-start">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pool-300/15 text-pool-200 text-xs font-semibold uppercase tracking-wider">
                <ShieldIcon /> Compromiso por escrito
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight">
                Nuestras garantías contractuales
              </h3>
              <p className="mt-3 text-white/80">
                Si algo no sale bien, no nos escondemos. Tienes contrato, bitácora y reporte
                — y respaldo legal por escrito.
              </p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-4">
              {GARANTIAS.map((g) => (
                <li
                  key={g.titulo}
                  className="rounded-xl bg-white/5 border border-white/10 p-4"
                >
                  <p className="font-bold text-white text-sm">{g.titulo}</p>
                  <p className="mt-1 text-sm text-white/70 leading-relaxed">{g.texto}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-6 text-xs text-white/40 leading-relaxed">
          Los nombres y números de las normas oficiales mexicanas (NOM) son de carácter
          público. Triana&apos;s clean es un proveedor privado de servicios de limpieza y
          mantenimiento; aplicamos las normas listadas como guía técnica de calidad y
          seguridad. Bajo solicitud entregamos copia de las hojas de datos de seguridad
          (SDS) y los registros COFEPRIS de los insumos utilizados.
        </p>
      </div>
    </section>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9"  y1="13" x2="15" y2="13" />
      <line x1="9"  y1="17" x2="15" y2="17" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
