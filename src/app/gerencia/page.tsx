import { authOptions } from "@/lib/auth";
import { database } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import GerenciaClient from "./client";
import GerenciaHeader from "./header";

export default async function Gerencia() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  const subscriptions = await database.subscription.findMany();

  return (
    <div className="container mx-auto p-4">
      <GerenciaHeader />
      <GerenciaClient subscriptions={subscriptions} />
    </div>
  );
}
