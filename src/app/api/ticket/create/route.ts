import { NextResponse } from "next/server";
import { database } from "@/lib/prisma";
import { appConfig } from "@/config/app";
import { fetchInstagramProfile, sanitizeInstagramUsername } from "@/lib/instagram";

// Simple in-memory rate limiter: max 5 tickets per IP per 10 minutes
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Prune expired entries periodically to prevent memory leaks
  if (rateLimitMap.size > 200) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now > val.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

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
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        message: "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
      },
      { status: 429 },
    );
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Requisição inválida. JSON esperado." },
      { status: 400 },
    );
  }

  const rawInstagram = body?.instagram;

  if (!rawInstagram || typeof rawInstagram !== "string") {
    return NextResponse.json(
      { message: "Informe o usuário do Instagram!" },
      { status: 400 },
    );
  }

  const cleanInstagram = sanitizeInstagramUsername(rawInstagram);

  if (!cleanInstagram) {
    return NextResponse.json(
      { message: "Usuário do Instagram inválido!" },
      { status: 400 },
    );
  }

  let lastTicket = null;
  let igResult;

  try {
    [lastTicket, igResult] = await Promise.all([
      database.ticket.findFirst({
        orderBy: {
          count: "desc",
        },
        select: {
          count: true,
        },
      }),
      fetchInstagramProfile(cleanInstagram),
    ]);
  } catch (error) {
    console.error("Erro ao buscar dados iniciais do ingresso:", error);
    igResult = await fetchInstagramProfile(cleanInstagram);
  }

  if (igResult.outcome === "not_found") {
    return NextResponse.json(
      { message: igResult.message || "Usuário não encontrado no Instagram!" },
      { status: 404 },
    );
  }

  if (igResult.outcome === "rate_limited") {
    return NextResponse.json(
      { message: igResult.message || "O Instagram está temporariamente indisponível." },
      { status: 503 },
    );
  }

  if (igResult.outcome !== "ok") {
    return NextResponse.json(
      { message: igResult.message || "Não foi possível obter dados do Instagram." },
      { status: 400 },
    );
  }

  const igAvatar = igResult.igAvatar || "";
  const igName = igResult.igName || cleanInstagram;

  // save ticket
  try {
    let lastCount = 0;

    if (lastTicket && typeof lastTicket.count === "number") {
      lastCount = lastTicket.count;
    }

    const ticket = await database.ticket.create({
      data: {
        count: lastCount + 1,
        instagram: cleanInstagram,
        igAvatar,
        igName,
      },
    });

    return NextResponse.json({
      message: "Ingresso gerado com sucesso!",
      ticket,
    });
  } catch (error) {
    console.error("Erro ao salvar ingresso no banco de dados:", error);
    return NextResponse.json(
      { message: "Erro ao salvar ingresso no banco de dados!" },
      { status: 500 },
    );
  }
}
