import { SITE, formatWhatsappPretty } from "@/lib/site";

/**
 * Banner discreto en la parte superior de la página cuando el sitio corre en
 * modo prueba. Se quita automáticamente al setear NEXT_PUBLIC_TEST_MODE=0 en
 * Vercel (o cuando el dueño confirme su línea oficial y borremos la variable).
 */
export function TestModeBanner() {
  if (!SITE.testMode) return null;

  return (
    <div
      role="status"
      className="bg-amber-400 text-ink text-center text-xs sm:text-sm font-semibold px-4 py-2 border-b border-amber-500/60"
    >
      <span className="inline-flex items-center gap-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        Sitio en modo prueba — los mensajes de WhatsApp llegan a{" "}
        <b>{formatWhatsappPretty(SITE.whatsapp)}</b> (línea temporal de testing).
      </span>
    </div>
  );
}
