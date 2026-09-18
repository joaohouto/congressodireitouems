import { NextResponse } from "next/server";
import { database } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { uploadAvatarDataUrlToSupabase } from "@/lib/supabase";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  let body: any;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Requisição inválida. JSON esperado." },
      { status: 400 }
    );
  }

  const { count, instagram, igAvatar, igName } = body;

  const dataToUpdate: {
    count?: number;
    instagram?: string;
    igName?: string | null;
    igAvatar?: string | null;
  } = {};

  // Validação do número do ingresso (count)
  if (count !== undefined && count !== null) {
    const parsedCount = parseInt(String(count), 10);

    if (isNaN(parsedCount) || parsedCount < 1) {
      return NextResponse.json(
        { message: "O número do ingresso deve ser um número inteiro positivo (mínimo 1)." },
        { status: 400 }
      );
    }

    // Verifica se outro ingresso já utiliza esse número
    const conflict = await database.ticket.findFirst({
      where: {
        count: parsedCount,
        id: { not: id },
      },
      select: {
        id: true,
        count: true,
        igName: true,
        instagram: true,
      },
    });

    if (conflict) {
      const occupantName = conflict.igName || conflict.instagram || "outro participante";
      return NextResponse.json(
        {
          message: `O número #${String(parsedCount).padStart(4, "0")} já está em uso pelo participante "${occupantName}".`,
        },
        { status: 409 }
      );
    }

    dataToUpdate.count = parsedCount;
  }

  // Validação e sanitização do Nome
  if (igName !== undefined) {
    if (typeof igName === "string") {
      const cleanName = igName
        .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, "")
        .trim()
        .replace(/\s+/g, " ")
        .slice(0, 70);
      dataToUpdate.igName = cleanName || null;
    } else {
      dataToUpdate.igName = null;
    }
  }

  // Validação e sanitização do Instagram
  if (instagram !== undefined) {
    if (typeof instagram === "string") {
      const cleanInstagram = instagram
        .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, "")
        .trim()
        .slice(0, 70);
      dataToUpdate.instagram = cleanInstagram || dataToUpdate.igName || "participante";
    }
  }

  // Processamento do Avatar / Foto
  if (igAvatar !== undefined) {
    if (!igAvatar) {
      dataToUpdate.igAvatar = null;
    } else if (typeof igAvatar === "string") {
      if (igAvatar.startsWith("data:image/")) {
        try {
          const publicUrl = await uploadAvatarDataUrlToSupabase(igAvatar);
          if (publicUrl) {
            dataToUpdate.igAvatar = publicUrl;
          } else if (
            igAvatar.startsWith("data:image/jpeg") &&
            igAvatar.length < 150 * 1024
          ) {
            dataToUpdate.igAvatar = igAvatar;
          }
        } catch (err) {
          console.error("Erro ao salvar foto no Supabase:", err);
        }
      } else {
        // Já é uma URL externa ou storage
        dataToUpdate.igAvatar = igAvatar;
      }
    }
  }

  try {
    const ticket = await database.ticket.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("Erro ao atualizar ingresso:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar ingresso no banco de dados." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await database.ticket.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Ingresso deletado com sucesso!" });
  } catch {
    return NextResponse.json(
      { message: "Erro ao deletar ingresso." },
      { status: 400 }
    );
  }
}
