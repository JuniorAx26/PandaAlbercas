"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { getSupabaseAdmin, isSupabaseServerConfigured } from "@/lib/supabase-server";
import { SITE, whatsappLink } from "@/lib/site";

// ---------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------
const quoteInputSchema = z.object({
  nombre: z.string().trim().min(2, "Nombre muy corto").max(80),
  ciudad: z.enum(["Tampico", "Ciudad Madero", "Altamira"]),
  tipo: z
    .enum(["Residencial", "Comercial"])
    .optional()
    .default("Residencial"),
  mensaje: z.string().trim().max(800).optional().default(""),
  // honeypot: bots llenan este campo oculto
  website: z.string().optional().default(""),
});

export type QuoteInput = z.infer<typeof quoteInputSchema>;

export type CreateQuoteResult =
  | {
      ok: true;
      id: string | null;
      whatsappUrl: string;
      stored: boolean;
    }
  | {
      ok: false;
      error: string;
      whatsappUrl: string;
      stored: false;
    };

// ---------------------------------------------------------------------
// Rate-limit en memoria (por instancia). Suficiente para landing pequeña.
// ---------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 4;
const rateBucket = new Map<string, number[]>();

function rateLimit(ipHash: string): boolean {
  const now = Date.now();
  const recent = (rateBucket.get(ipHash) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  recent.push(now);
  rateBucket.set(ipHash, recent);
  return recent.length <= RATE_LIMIT_MAX;
}

async function hashIp(ip: string): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const buf = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(ip),
    );
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32);
  }
  return ip.slice(0, 32);
}

// ---------------------------------------------------------------------
// Construcción del mensaje prefill para WhatsApp
// ---------------------------------------------------------------------
function buildWhatsAppMessage(q: QuoteInput, refId: string | null): string {
  const tag = SITE.testMode ? " [PRUEBA]" : "";
  const refLine = refId ? `\n🔖 Ref: ${refId.slice(0, 8)}` : "";
  const detalle = q.mensaje?.trim() ? `\n\n📝 Detalle: ${q.mensaje.trim()}` : "";
  return (
    `✨ Hola ${SITE.name}, soy ${q.nombre}.\n` +
    `Me interesa una cotización para mi alberca en ${q.ciudad} ` +
    `(${q.tipo.toLowerCase()}).` +
    detalle +
    refLine +
    tag
  );
}

// ---------------------------------------------------------------------
// Server Action
// ---------------------------------------------------------------------
export async function createQuote(
  input: unknown,
): Promise<CreateQuoteResult> {
  let data: QuoteInput;
  try {
    data = quoteInputSchema.parse(input);
  } catch (err) {
    const msg =
      err instanceof z.ZodError ? err.issues[0]?.message ?? "Datos inválidos" : "Datos inválidos";
    return {
      ok: false,
      error: msg,
      stored: false,
      whatsappUrl: whatsappLink(),
    };
  }

  // Honeypot — si llega lleno, fingimos éxito sin guardar nada.
  if (data.website && data.website.trim().length > 0) {
    return {
      ok: true,
      id: null,
      stored: false,
      whatsappUrl: whatsappLink(buildWhatsAppMessage(data, null)),
    };
  }

  // Rate-limit por IP hasheada
  const hdrs = await headers();
  const fwd =
    hdrs.get("x-forwarded-for") ??
    hdrs.get("cf-connecting-ip") ??
    "anon";
  const ip = fwd.split(",")[0]?.trim() || "anon";
  const ua = hdrs.get("user-agent") ?? null;
  const ipHash = await hashIp(ip);

  if (!rateLimit(ipHash)) {
    return {
      ok: false,
      error: "Demasiadas solicitudes seguidas. Intenta en un minuto.",
      stored: false,
      whatsappUrl: whatsappLink(),
    };
  }

  // Intento de persistencia. Si Supabase no está configurado seguimos
  // adelante con WhatsApp — el sitio nunca queda muerto por falta de DB.
  let quoteId: string | null = null;
  let storedOk = false;

  if (isSupabaseServerConfigured()) {
    try {
      const admin = getSupabaseAdmin();
      const { data: row, error } = await admin
        .from("quotes")
        .insert({
          nombre: data.nombre,
          ciudad: data.ciudad,
          tipo: data.tipo,
          mensaje: data.mensaje?.trim() || null,
          source: "web",
          ip_hash: ipHash,
          user_agent: ua,
        })
        .select("id")
        .single();

      if (error) throw error;
      quoteId = row.id as string;
      storedOk = true;
    } catch (err) {
      console.error("createQuote · supabase insert failed", err);
      // Continuamos sin DB — el cliente igual recibe el link de WhatsApp.
    }
  }

  const whatsappUrl = whatsappLink(buildWhatsAppMessage(data, quoteId));

  return { ok: true, id: quoteId, stored: storedOk, whatsappUrl };
}
