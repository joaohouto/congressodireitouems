import { NextResponse } from "next/server";
import { database } from "@/lib/prisma";
import axios from "axios";

import { sendSubscriptionConfirmation } from "@/email/sendSubscriptionConfirmation";

export async function POST(request: Request, response: Response) {
  const body = await request.json();
  let { name, email, category, instagram, igAvatar, igName } = body;

  if (instagram) {
    // get Instagram data
    const apiUrl = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${instagram}`;
    const userAgent =
      "Instagram 337.0.0.0.77 Android (28/9; 420dpi; 1080x1920; samsung; SM-G611F; on7xreflte; samsungexynos7870; en_US; 493419337)";

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
  }

  // verify duplicated subscritpion

  const isSubscriptionDuplicated = await database.subscription.findFirst({
    where: {
      name: {
        equals: name.trim().toLowerCase(),
        mode: "insensitive",
      },
    },
  });

  if (isSubscriptionDuplicated) {
    return NextResponse.json(
      { message: `Já existe uma inscrição para ${name}` },
      { status: 409 }
    );
  }

  // last subscription
  const lastSubscription = await database.subscription.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  const lastCount = lastSubscription ? lastSubscription.count : 0;

  // save subscription
  try {
    const subscription = await database.subscription.create({
      data: {
        name,
        email,
        category,
        instagram,
        igAvatar,
        igName,
        count: lastCount + 1,
      },
    });

    await sendSubscriptionConfirmation({
      id: subscription.id,
      name,
      email,
      category,
    });

    return NextResponse.json({
      message: "Inscrição realizada com sucesso!",
      id: subscription.id,
    });
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { message: "Erro ao salvar inscrição!" },
      { status: 400 }
    );
  }
}
