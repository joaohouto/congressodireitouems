import { authOptions } from "@/lib/auth";
import { database } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GerenciaClient from "./client";

export default async function Gerencia() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const tickets = await database.ticket.findMany();

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ingressos</h1>
      </header>

      <GerenciaClient tickets={tickets} />
    </div>
  );
}
