import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#servicios`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#cobertura`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#normatividad`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#contacto`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
