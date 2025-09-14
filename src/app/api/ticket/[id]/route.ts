import { NextResponse } from "next/server";
import { database } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const body = await req.json();
  const { id } = await params;

  const { instagram, igAvatar, igName } = body;

  try {
    const ticket = await database.ticket.update({
      where: {
        id,
      },
      data: {
        instagram,
        igAvatar,
        igName,
      },
    });

    return NextResponse.json(ticket);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar ingresso." },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await database.ticket.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Ingresso deletado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar ingresso." },
      { status: 400 }
    );
  }
}
