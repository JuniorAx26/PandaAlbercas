export const SITE = {
  name: "Triana's clean",
  tagline: "Limpieza y mantenimiento profesional de albercas",
  cities: ["Tampico", "Ciudad Madero", "Altamira"],
  // Número de prueba (José Alvarado). Cambiar a la línea oficial del negocio
  // cuando el dueño la confirme — basta con setear NEXT_PUBLIC_WHATSAPP_NUMBER
  // en Vercel y borrar NEXT_PUBLIC_TEST_MODE.
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "525655867604",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pandaalbercas.vercel.app",
  email: "contacto@trianasclean.mx",
  hours: "Lunes a sábado · 7:00 a 19:00 hrs",
  // Si NEXT_PUBLIC_TEST_MODE !== "0" mostramos un banner sutil en el sitio
  // avisando que los mensajes van a una línea de prueba.
  testMode: (process.env.NEXT_PUBLIC_TEST_MODE ?? "1") !== "0",
} as const;

const TEST_TAG = " [PRUEBA]";

export function whatsappLink(message?: string): string {
  const baseMessage =
    message ??
    `Hola ${SITE.name}, me interesa una cotización para mi alberca en Tampico/Madero/Altamira.`;
  const finalMessage = SITE.testMode ? `${baseMessage}${TEST_TAG}` : baseMessage;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(finalMessage)}`;
}

/**
 * "525655867604" -> "+52 56 5586 7604"
 * Solo asume números mexicanos de 10 dígitos con prefijo 52.
 */
export function formatWhatsappPretty(raw: string): string {
  if (raw.length === 12 && raw.startsWith("52")) {
    const a = raw.slice(2, 4);
    const b = raw.slice(4, 8);
    const c = raw.slice(8);
    return `+52 ${a} ${b} ${c}`;
  }
  // Fallback: agrupa en bloques de 3 desde el final.
  return `+${raw}`;
}
