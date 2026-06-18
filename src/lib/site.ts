export const SITE = {
  name: "Triana's clean",
  tagline: "Limpieza y mantenimiento profesional de albercas",
  cities: ["Tampico", "Ciudad Madero", "Altamira"],
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "528331074325",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pandaalbercas.vercel.app",
  email: "contacto@trianasclean.mx",
  hours: "Lunes a sábado · 7:00 a 19:00 hrs",
} as const;

export function whatsappLink(message?: string): string {
  const text = encodeURIComponent(
    message ??
      `Hola ${SITE.name}, me interesa una cotización para mi alberca en Tampico/Madero/Altamira.`,
  );
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}
