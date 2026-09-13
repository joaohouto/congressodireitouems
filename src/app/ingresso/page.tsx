import type { Metadata } from "next";
import { appConfig } from "@/config/app";
import { IngressoClient } from "./client";

export const metadata: Metadata = {
  title: "Gerar Ingresso",
  description:
    "Gere seu ingresso digital e personalizado para o IV Congresso Jurídico do Curso de Direito da UEMS - Aquidauana.",
  alternates: {
    canonical: "/ingresso",
  },
  openGraph: {
    title: `Gerar Ingresso | ${appConfig.shortTitle}`,
    description:
      "Gere seu ingresso digital e personalizado para o IV Congresso Jurídico do Curso de Direito da UEMS - Aquidauana.",
    url: `${appConfig.siteUrl}/ingresso`,
  },
};

export default function IngressoPage() {
  return <IngressoClient />;
}
