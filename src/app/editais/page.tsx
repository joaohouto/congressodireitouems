import Link from "next/link";
import Image from "next/image";

import { EditaisList } from "./client";
import { appConfig } from "../config";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editais",
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
              layout="contain"
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
