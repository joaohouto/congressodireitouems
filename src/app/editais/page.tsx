import Link from "next/link";
import Image from "next/image";

import { EditaisList } from "./client";
import { appConfig } from "@/config/app";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editais",
  description:
    "Acesse os editais oficiais, retificações, regulamentos e modelos de documentos do Congresso Jurídico e do Encontro Científico da UEMS Aquidauana.",
  alternates: {
    canonical: "/editais",
  },
  openGraph: {
    title: `Editais | ${appConfig.shortTitle}`,
    description:
      "Acesse os editais oficiais, retificações, regulamentos e modelos de documentos do Congresso Jurídico e do Encontro Científico da UEMS Aquidauana.",
    url: `${appConfig.siteUrl}/editais`,
  },
};

export default function Editais() {
  return (
    <div className="bg-muted">
      <div className="max-w-[600px] mx-auto my-auto p-4 flex flex-col items-center">
        <header className="flex items-center py-12">
          <Link href="/">
            <Image
              width={300}
              height={200}
              src="/logo.svg"
              alt={appConfig.title}
            />
          </Link>
        </header>

        <EditaisList />

        <Footer />
      </div>
    </div>
  );
}
