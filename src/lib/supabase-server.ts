import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

/**
 * Cliente Supabase con service_role — solo para Server Actions / Route Handlers.
 * Bypassea RLS, así que NUNCA lo expongas al navegador.
 */
function getServiceRoleKey(): string | undefined {
  // Soporta los dos nombres: el manual (SUPABASE_SERVICE_ROLE) y el que
  // inyecta la integración Vercel Marketplace (SUPABASE_SERVICE_ROLE_KEY).
  return (
    process.env.SUPABASE_SERVICE_ROLE ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SECRET_KEY
  );
}

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = getServiceRoleKey();

  if (!url || !serviceRole) {
    throw new Error(
      "Supabase no configurado: faltan SUPABASE_URL y/o SUPABASE_SERVICE_ROLE(_KEY)",
    );
  }

  cached = createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export function isSupabaseServerConfigured(): boolean {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && getServiceRoleKey());
}
