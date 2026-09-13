import type { MetadataRoute } from "next";
import { appConfig } from "@/config/app";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appConfig.title,
    short_name: appConfig.shortTitle,
    description: appConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f4",
    theme_color: "#2e5a36",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192 512x512",
        type: "image/png",
      },
      {
        src: "/icon-light.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
