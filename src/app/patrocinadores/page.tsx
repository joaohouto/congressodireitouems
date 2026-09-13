import type { Metadata } from "next";
import { appConfig } from "@/config/app";
import { SponsorsClient } from "./client";

export const metadata: Metadata = {
  title: "Patrocinadores",
  description:
    "Conheça os parceiros, patrocinadores e apoiadores que tornam o IV Congresso Jurídico do Curso de Direito da UEMS - Aquidauana possível.",
  alternates: {
    canonical: "/patrocinadores",
  },
  openGraph: {
    title: `Patrocinadores | ${appConfig.shortTitle}`,
    description:
      "Conheça os parceiros, patrocinadores e apoiadores que tornam o IV Congresso Jurídico do Curso de Direito da UEMS - Aquidauana possível.",
    url: `${appConfig.siteUrl}/patrocinadores`,
  },
};

export default function SponsorsPage() {
  return <SponsorsClient />;
}
