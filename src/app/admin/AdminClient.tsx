"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import {
  getSupabaseBrowser,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase-browser";
import { PandaLogo } from "@/components/PandaLogo";
import { SITE } from "@/lib/site";

type Quote = {
  id: string;
  nombre: string;
  ciudad: string;
  tipo: string;
  mensaje: string | null;
  status: "nuevo" | "contactado" | "agendado" | "cerrado" | "cancelado";
  source: string;
  created_at: string;
};

const STATUS_OPTIONS: Quote["status"][] = [
  "nuevo",
  "contactado",
  "agendado",
  "cerrado",
  "cancelado",
];

const STATUS_COLORS: Record<Quote["status"], string> = {
  nuevo:       "bg-amber-100 text-amber-900 border-amber-300",
  contactado:  "bg-sky-100 text-sky-900 border-sky-300",
  agendado:    "bg-indigo-100 text-indigo-900 border-indigo-300",
  cerrado:     "bg-emerald-100 text-emerald-900 border-emerald-300",
  cancelado:   "bg-zinc-100 text-zinc-700 border-zinc-300",
};

export function AdminClient() {
  if (!isSupabaseBrowserConfigured()) {
    return (
      <Shell title="Admin · sin configurar">
        <NotConfigured />
      </Shell>
    );
  }

  return <AdminConfigured />;
}

function AdminConfigured() {
  const supabase = getSupabaseBrowser();
  const [session, setSession] = useState<Session | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    if (!supabase) return;
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoadingSession(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoadingSession(false);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  if (loadingSession) {
    return (
      <Shell title="Admin">
        <div className="text-ink-mute text-sm">Cargando sesión…</div>
      </Shell>
    );
  }

  if (!session) {
    return (
      <Shell title="Admin · Iniciar sesión">
        <LoginForm />
      </Shell>
    );
  }

  return (
    <Shell title="Admin · Cotizaciones" user={session.user} onSignOut={async () => {
      await supabase?.auth.signOut();
    }}>
      <QuotesPanel />
    </Shell>
  );
}

// ---------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------
function Shell({
  title,
  user,
  onSignOut,
  children,
}: {
  title: string;
  user?: User;
  onSignOut?: () => void;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-cream">
      <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur border-b border-pool-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PandaLogo size={36} />
            <div className="leading-none">
              <p className="font-bold text-ink">{SITE.name} · Admin</p>
              <p className="text-[11px] uppercase tracking-widest text-pool-700">{title}</p>
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-ink-mute hidden sm:inline">{user.email}</span>
              <button
                onClick={onSignOut}
                className="px-3 py-1.5 rounded-lg border border-pool-200 text-ink hover:bg-pool-50 text-sm font-semibold"
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </header>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">{children}</section>
    </main>
  );
}

// ---------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------
function LoginForm() {
  const supabase = getSupabaseBrowser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setError(null);
    setInfo(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  }

  async function onMagicLink() {
    if (!supabase || !email) {
      setError("Escribe tu correo primero.");
      return;
    }
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setInfo("Te mandamos un enlace mágico al correo. Revisa tu bandeja.");
  }

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={onSubmit}
        className="rounded-2xl bg-white border border-pool-100 shadow-card p-6 sm:p-8 space-y-4"
      >
        <h1 className="text-2xl font-extrabold text-ink">Acceso administrativo</h1>
        <p className="text-sm text-ink-mute">
          Solo cuentas con rol <code className="font-mono">admin</code> pueden ver el listado
          de cotizaciones.
        </p>

        <label className="block">
          <span className="block text-sm font-semibold text-ink mb-1.5">Correo</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full px-3 py-2.5 rounded-lg border border-pool-200 focus:outline-none focus:border-pool-500"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-semibold text-ink mb-1.5">Contraseña</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full px-3 py-2.5 rounded-lg border border-pool-200 focus:outline-none focus:border-pool-500"
          />
        </label>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-800">
            {error}
          </div>
        )}
        {info && (
          <div className="rounded-lg bg-sky-50 border border-sky-200 px-3 py-2 text-sm text-sky-800">
            {info}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2.5 rounded-lg bg-pool-grad text-white font-bold disabled:opacity-60"
          >
            {loading ? "Procesando…" : "Entrar"}
          </button>
          <button
            type="button"
            onClick={onMagicLink}
            disabled={loading}
            className="px-4 py-2.5 rounded-lg border border-pool-300 text-pool-700 font-semibold hover:bg-pool-50 disabled:opacity-60"
          >
            Magic link
          </button>
        </div>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------
// Listado de cotizaciones
// ---------------------------------------------------------------------
function QuotesPanel() {
  const supabase = getSupabaseBrowser();
  const [quotes, setQuotes] = useState<Quote[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"todas" | Quote["status"]>("todas");

  const fetchQuotes = useCallback(async () => {
    if (!supabase) return;
    setError(null);
    const { data, error } = await supabase
      .from("quotes")
      .select("id, nombre, ciudad, tipo, mensaje, status, source, created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) {
      setError(error.message);
      return;
    }
    setQuotes(data as Quote[]);
  }, [supabase]);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);

  const filtered = useMemo(() => {
    if (!quotes) return null;
    if (filter === "todas") return quotes;
    return quotes.filter((q) => q.status === filter);
  }, [quotes, filter]);

  async function changeStatus(id: string, status: Quote["status"]) {
    if (!supabase) return;
    setQuotes((prev) => prev?.map((q) => (q.id === id ? { ...q, status } : q)) ?? null);
    const { error } = await supabase.from("quotes").update({ status }).eq("id", id);
    if (error) {
      setError(error.message);
      void fetchQuotes();
    }
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">
        <p className="font-semibold">Error al consultar la tabla quotes:</p>
        <p className="mt-1 leading-relaxed">{error}</p>
        <p className="mt-2 text-xs">
          Verifica que tu cuenta tenga <code>app_metadata.role = &lsquo;admin&rsquo;</code>{" "}
          (ver supabase/migrations/0001_init.sql) y que la migración esté aplicada.
        </p>
      </div>
    );
  }

  if (!filtered) {
    return <div className="text-ink-mute text-sm">Cargando cotizaciones…</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <FilterChip
          active={filter === "todas"}
          onClick={() => setFilter("todas")}
        >
          Todas ({quotes?.length ?? 0})
        </FilterChip>
        {STATUS_OPTIONS.map((s) => (
          <FilterChip
            key={s}
            active={filter === s}
            onClick={() => setFilter(s)}
          >
            {s} ({quotes?.filter((q) => q.status === s).length ?? 0})
          </FilterChip>
        ))}
        <button
          onClick={fetchQuotes}
          className="ml-auto text-sm font-semibold text-pool-700 hover:text-pool-900"
        >
          ↻ Recargar
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-white border border-pool-100 p-8 text-center text-ink-mute">
          Sin cotizaciones para este filtro.
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((q) => (
            <li
              key={q.id}
              className="rounded-2xl bg-white border border-pool-100 shadow-card p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-ink">{q.nombre}</p>
                  <p className="text-xs text-ink-mute mt-0.5">
                    {q.ciudad} · {q.tipo} ·{" "}
                    {new Date(q.created_at).toLocaleString("es-MX", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <select
                  value={q.status}
                  onChange={(e) => changeStatus(q.id, e.target.value as Quote["status"])}
                  className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${STATUS_COLORS[q.status]}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              {q.mensaje && (
                <p className="mt-3 text-sm text-ink-soft leading-relaxed border-l-2 border-pool-200 pl-3">
                  {q.mensaje}
                </p>
              )}
              <p className="mt-2 text-[10px] uppercase tracking-widest text-ink-mute">
                Ref: <code className="font-mono">{q.id.slice(0, 8)}</code> · origen {q.source}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border " +
        (active
          ? "bg-pool-grad text-white border-transparent shadow-card"
          : "bg-white text-ink-mute border-pool-200 hover:border-pool-400")
      }
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------
// Estado: Supabase no configurado
// ---------------------------------------------------------------------
function NotConfigured() {
  return (
    <div className="max-w-2xl mx-auto rounded-2xl bg-white border border-amber-200 shadow-card p-6 sm:p-8 space-y-4">
      <div className="inline-flex items-center gap-2 text-amber-700 font-bold">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        Falta configurar Supabase
      </div>
      <p className="text-sm text-ink-soft leading-relaxed">
        El admin necesita una conexión a Supabase para listar las cotizaciones. Setea
        estas variables en Vercel (Settings → Environment Variables) y vuelve a desplegar:
      </p>
      <ul className="text-sm font-mono bg-pool-50 rounded-lg p-4 space-y-1">
        <li>NEXT_PUBLIC_SUPABASE_URL</li>
        <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
        <li>SUPABASE_SERVICE_ROLE</li>
      </ul>
      <p className="text-xs text-ink-mute">
        Pasos completos en <code>SETUP.md</code>. Mientras tanto, el formulario público
        igual abre WhatsApp con el mensaje prearmado — solo no queda registro en DB.
      </p>
    </div>
  );
}
