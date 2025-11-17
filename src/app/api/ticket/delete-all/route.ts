import { NextResponse } from "next/server";
import { database } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    await database.ticket.deleteMany({});
    return NextResponse.json({
      message: "Todos os ingressos foram deletados com sucesso!",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar ingressos." },
      { status: 500 }
    );
  }
}
