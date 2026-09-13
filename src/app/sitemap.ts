import type { MetadataRoute } from "next";
import { appConfig } from "@/config/app";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = appConfig.siteUrl;
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/encontro-cientifico`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/editais`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ingresso`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeria`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/patrocinadores`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
