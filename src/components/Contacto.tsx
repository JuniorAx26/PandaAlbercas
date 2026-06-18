"use client";

import { useState, useTransition } from "react";
import { SITE, whatsappLink, formatWhatsappPretty } from "@/lib/site";
import { createQuote } from "@/app/actions/quotes";

type FormState = {
  nombre: string;
  ciudad: "Tampico" | "Ciudad Madero" | "Altamira" | "";
  tipo: "Residencial" | "Comercial" | "";
  mensaje: string;
  // honeypot
  website: string;
};

const INITIAL: FormState = {
  nombre: "",
  ciudad: "",
  tipo: "",
  mensaje: "",
  website: "",
};

type SubmitState =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success"; ref: string | null; stored: boolean };

export function Contacto() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [touched, setTouched] = useState(false);
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!form.nombre || !form.ciudad) return;

    startTransition(async () => {
      const result = await createQuote({
        nombre: form.nombre,
        ciudad: form.ciudad,
        tipo: form.tipo || "Residencial",
        mensaje: form.mensaje,
        website: form.website,
      });

      if (!result.ok) {
        setState({ kind: "error", message: result.error });
        return;
      }

      setState({ kind: "success", ref: result.id, stored: result.stored });
      // Pequeña pausa para que el usuario vea la confirmación, luego WhatsApp.
      window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  const errNombre = touched && !form.nombre;
  const errCiudad = touched && !form.ciudad;

  return (
    <section id="contacto" className="bg-cream py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-pool-600">Contacto</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Listos para mantener tu alberca cristalina.
            </h2>
            <p className="mt-3 text-ink-mute max-w-xl">
              Llena el formulario y te respondemos por WhatsApp en menos de 24 horas hábiles
              con cotización por escrito. Cada solicitud queda registrada y atendida en orden
              de llegada.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex items-center justify-center size-10 rounded-xl bg-pool-grad text-white">
                  <PhoneIcon />
                </span>
                <div>
                  <p className="font-semibold text-ink">WhatsApp</p>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pool-700 hover:underline text-sm"
                  >
                    {formatWhatsappPretty(SITE.whatsapp)} — solo mensajes
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex items-center justify-center size-10 rounded-xl bg-pool-grad text-white">
                  <MailIcon />
                </span>
                <div>
                  <p className="font-semibold text-ink">Correo</p>
                  <p className="text-pool-700 text-sm">{SITE.email}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex items-center justify-center size-10 rounded-xl bg-pool-grad text-white">
                  <ClockIcon />
                </span>
                <div>
                  <p className="font-semibold text-ink">Horario</p>
                  <p className="text-ink-mute text-sm">{SITE.hours}</p>
                </div>
              </li>
            </ul>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-2xl bg-white border border-pool-100 shadow-card p-6 sm:p-8"
          >
            {/* honeypot — invisible para humanos, captura bots */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => set("website", e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />

            <div className="space-y-5">
              <Field
                label="Nombre completo"
                required
                error={errNombre && "Tu nombre nos ayuda a personalizar la cotización."}
              >
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  className="input"
                  autoComplete="name"
                  placeholder="Ej. José Alvarado"
                  disabled={pending}
                />
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Ciudad" required error={errCiudad && "Selecciona la ciudad."}>
                  <select
                    value={form.ciudad}
                    onChange={(e) => set("ciudad", e.target.value as FormState["ciudad"])}
                    className="input"
                    disabled={pending}
                  >
                    <option value="">Selecciona</option>
                    <option>Tampico</option>
                    <option>Ciudad Madero</option>
                    <option>Altamira</option>
                  </select>
                </Field>
                <Field label="Tipo de propiedad">
                  <select
                    value={form.tipo}
                    onChange={(e) => set("tipo", e.target.value as FormState["tipo"])}
                    className="input"
                    disabled={pending}
                  >
                    <option value="">Residencial (predeterminado)</option>
                    <option>Residencial</option>
                    <option>Comercial</option>
                  </select>
                </Field>
              </div>

              <Field label="Cuéntanos sobre tu alberca">
                <textarea
                  value={form.mensaje}
                  onChange={(e) => set("mensaje", e.target.value)}
                  rows={4}
                  className="input resize-none"
                  placeholder="Ej. Alberca de 6×3 m, agua verdosa hace 5 días, no sé si la bomba sigue funcionando bien."
                  disabled={pending}
                />
              </Field>

              <button
                type="submit"
                disabled={pending}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-pool-grad text-white font-bold shadow-card hover:shadow-card-hover transition disabled:opacity-60 disabled:cursor-wait"
              >
                {pending ? (
                  <>
                    <Spinner /> Guardando…
                  </>
                ) : (
                  <>
                    <WaIcon /> Enviar por WhatsApp
                  </>
                )}
              </button>

              {state.kind === "error" && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
                  {state.message}
                </div>
              )}
              {state.kind === "success" && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-900">
                  <p className="font-semibold">¡Cotización registrada!</p>
                  <p className="mt-0.5 leading-relaxed">
                    {state.stored
                      ? "Quedó guardada y abrimos WhatsApp para que mandes el mensaje. "
                      : "Abrimos WhatsApp con el mensaje prearmado. "}
                    {state.ref && (
                      <span>
                        Referencia: <code className="font-mono">{state.ref.slice(0, 8)}</code>.
                      </span>
                    )}
                  </p>
                </div>
              )}

              <p className="text-xs text-ink-mute leading-relaxed">
                Al enviar autorizas que {SITE.name} te contacte por WhatsApp en
                relación a tu cotización. No compartimos tus datos con terceros.
                Conforme a la Ley Federal de Protección de Datos Personales en Posesión
                de los Particulares.
              </p>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.7rem 0.9rem;
          border-radius: 0.6rem;
          border: 1px solid #D9F0F8;
          background: #FFFFFF;
          color: #0B0D10;
          font-size: 0.95rem;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        .input:focus {
          outline: none;
          border-color: #1E8FB8;
          box-shadow: 0 0 0 3px rgba(30, 143, 184, 0.15);
        }
        .input:disabled {
          background: #F2F7FA;
          color: #5C636B;
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string | false;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink mb-1.5">
        {label} {required && <span className="text-pool-600">*</span>}
      </span>
      {children}
      {error && <span className="block mt-1 text-xs text-red-600">{error}</span>}
    </label>
  );
}

function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.52 3.48A11.95 11.95 0 0012.05.05C5.5.05.16 5.39.16 11.93c0 2.1.55 4.14 1.6 5.96L0 24l6.27-1.64a11.9 11.9 0 005.78 1.47h.01c6.55 0 11.88-5.34 11.88-11.88 0-3.17-1.23-6.15-3.42-8.47z" />
    </svg>
  );
}
function Spinner() {
  return (
    <svg
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h16c1 0 2 1 2 2v12c0 1-1 2-2 2H4c-1 0-2-1-2-2V6c0-1 1-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
