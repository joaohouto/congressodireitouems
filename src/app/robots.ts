import type { MetadataRoute } from "next";
import { appConfig } from "@/config/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/editais",
          "/encontro-cientifico",
          "/galeria",
          "/ingresso",
          "/patrocinadores",
        ],
        disallow: ["/gerencia", "/gerencia/*", "/api/*", "/ingresso/*"],
      },
    ],
    sitemap: `${appConfig.siteUrl}/sitemap.xml`,
  };
}
