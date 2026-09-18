import { NextResponse } from "next/server";
import { database } from "@/lib/prisma";
import { appConfig } from "@/config/app";
import { uploadAvatarDataUrlToSupabase } from "@/lib/supabase";

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
  if (!appConfig.allowGenerateTicket) {
    return NextResponse.json({ status: 503 });
  }

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

  // Accepts name (preferred) or instagram for backwards compatibility
  const rawName = body?.name || body?.instagram;

  if (!rawName || typeof rawName !== "string") {
    return NextResponse.json(
      { message: "Informe o seu nome!" },
      { status: 400 },
    );
  }

  // Sanitize name: remove invisible control characters, trim, and collapse whitespace
  let cleanName = rawName
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 70);

  // Prevent CSV/Excel formula injection (=, +, -, @) when exported to spreadsheets
  if (/^[=+\-@\t\r]/.test(cleanName)) {
    cleanName = cleanName.replace(/^[=+\-@\t\r]+/, "").trim();
  }

  if (!cleanName || cleanName.length < 2) {
    return NextResponse.json(
      { message: "Informe um nome válido com pelo menos 2 caracteres!" },
      { status: 400 },
    );
  }

  const rawAvatar = body?.avatar;
  let igAvatar = "";

  if (rawAvatar) {
    if (
      typeof rawAvatar !== "string" ||
      !rawAvatar.startsWith("data:image/") ||
      rawAvatar.length > 750 * 1024
    ) {
      return NextResponse.json(
        {
          message:
            "Formato de imagem inválido ou arquivo muito grande (máximo 500KB).",
        },
        { status: 400 },
      );
    }

    try {
      const publicUrl = await uploadAvatarDataUrlToSupabase(rawAvatar);
      if (publicUrl) {
        igAvatar = publicUrl;
      } else {
        // Fallback: se Supabase não estiver configurado no ambiente, armazena data URL
        // apenas se for JPEG válido e leve (< 150KB) para não inchar o MongoDB nem quebrar o Satori
        if (
          rawAvatar.startsWith("data:image/jpeg") &&
          rawAvatar.length < 150 * 1024
        ) {
          igAvatar = rawAvatar;
        }
      }
    } catch (err) {
      console.error("Erro ao salvar foto de avatar no Supabase:", err);
    }
  }

  try {
    const existingTickets = await database.ticket.findMany({
      where: {
        count: {
          gt: 0,
        },
      },
      select: {
        count: true,
      },
    });

    const usedCounts = new Set<number>(existingTickets.map((t) => t.count));
    let nextCount = 1;
    while (usedCounts.has(nextCount)) {
      nextCount++;
    }

    const ticket = await database.ticket.create({
      data: {
        count: nextCount,
        instagram: cleanName,
        igAvatar,
        igName: cleanName,
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
