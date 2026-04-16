import { NextResponse } from "next/server";
import { database } from "@/lib/prisma";
import axios from "axios";
import { appConfig } from "@/config/app";

// Simple in-memory rate limiter: max 3 tickets per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: Request) {
  if (!appConfig.allowGenerateTicket) return NextResponse.json({ status: 503 });

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        message: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
      },
      { status: 429 },
    );
  }

  const body = await request.json();
  const { instagram } = body;

  if (!instagram) {
    return NextResponse.json(
      { message: "Informe o usuário do Instagram!" },
      { status: 400 },
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
        { status: 400 },
      );
    }

    igAvatar = igResponse.data.data?.user?.profile_pic_url_hd;
    igName = igResponse.data.data?.user?.full_name;
  } catch (error: any) {
    if (error?.response?.status === 429) {
      return NextResponse.json(
        {
          message:
            "O Instagram está temporariamente indisponível. Tente novamente em alguns minutos.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      { message: "Erro ao buscar dados do Instagram!" },
      { status: 400 },
    );
  }

  // save ticket
  try {
    const lastTicket = await database.ticket.findFirst({
      orderBy: {
        count: "desc",
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
  } catch {
    return NextResponse.json(
      { message: "Erro ao salvar ingresso!" },
      { status: 500 },
    );
  }
}
