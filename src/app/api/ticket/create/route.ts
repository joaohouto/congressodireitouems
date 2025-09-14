import { NextResponse } from "next/server";
import { database } from "@/lib/prisma";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();
  const { instagram } = body;

  if (!instagram) {
    return NextResponse.json(
      { message: "Informe o usuário do Instagram!" },
      { status: 400 }
    );
  }

  // get Instagram data
  const apiUrl = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${instagram}`;
  const userAgent =
    "Instagram 337.0.0.0.77 Android (28/9; 420dpi; 1080x1920; samsung; SM-G611F; on7xreflte; samsungexynos7870; en_US; 493419337)";

  let igAvatar;
  let igName;

  try {
    const igResponse = await axios.get(apiUrl, {
      headers: {
        "User-Agent": userAgent,
      },
    });

    if (!igResponse.data.data?.user) {
      // user not found
      return NextResponse.json(
        { message: "Erro ao buscar dados do Instagram!" },
        { status: 400 }
      );
    }

    igAvatar = igResponse.data.data?.user?.profile_pic_url_hd;
    igName = igResponse.data.data?.user?.full_name;
  } catch (err) {
    return NextResponse.json(
      { message: "Erro ao buscar dados do Instagram!" },
      { status: 400 }
    );
  }

  // save ticket
  try {
    const lastTicket = await database.ticket.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    let lastCount = 0;

    if (lastTicket) {
      lastCount = lastTicket.count;
    }

    const ticket = await database.ticket.create({
      data: {
        count: lastCount + 1,
        instagram,
        igAvatar,
        igName,
      },
    });

    return NextResponse.json({
      message: "Ingresso gerado com sucesso!",
      ticket,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Erro ao salvar ingresso!" },
      { status: 400 }
    );
  }
}
