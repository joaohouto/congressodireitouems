import { NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import { database } from "@/lib/prisma";
import { appConfig } from "@/config/app";
import fs from "fs";
import path from "path";

// Cache font and background image at module level
let fontDataCache: ArrayBuffer | null = null;
let bgImageCache: string | null = null;

function getFontData(): ArrayBuffer {
  if (fontDataCache) return fontDataCache;
  const buf = fs.readFileSync(
    path.join(process.cwd(), "public/fonts/Lato-Bold.ttf"),
  );
  fontDataCache = buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength,
  ) as ArrayBuffer;
  return fontDataCache;
}

function getBackgroundImage(): string {
  if (bgImageCache) return bgImageCache;
  try {
    const buf = fs.readFileSync(
      path.join(process.cwd(), "public/ingresso.jpg"),
    );
    bgImageCache = `data:image/jpeg;base64,${buf.toString("base64")}`;
    return bgImageCache;
  } catch (error) {
    console.error("Erro ao ler public/ingresso.jpg:", error);
    return `${process.env.NEXT_PUBLIC_HOSTNAME || ""}/ingresso.jpg`;
  }
}

function isSafeAvatarUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== "string") return false;

  // Safe data URLs: JPEG or PNG under 500KB (reject WebP to avoid Satori crashes)
  if (
    (url.startsWith("data:image/jpeg;base64,") ||
      url.startsWith("data:image/png;base64,")) &&
    url.length <= 500 * 1024
  ) {
    return true;
  }

  // Must be HTTPS for external URLs
  if (!url.startsWith("https://")) {
    return false;
  }

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();

    // Prevent SSRF: block internal, private, and cloud metadata addresses
    if (
      hostname === "localhost" ||
      hostname.endsWith(".localhost") ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "169.254.169.254" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.endsWith(".internal") ||
      hostname.endsWith(".local")
    ) {
      return false;
    }

    // Permitted storage and CDN hosts
    const isSupabase =
      hostname.endsWith(".supabase.co") || hostname.endsWith(".supabase.in");
    const isInstagramCdn =
      hostname.endsWith(".cdninstagram.com") ||
      hostname.endsWith(".fbcdn.net");

    return isSupabase || isInstagramCdn;
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
    return NextResponse.json(
      { message: "Forneça um ID de ingresso válido!" },
      { status: 400 },
    );
  }

  let ticket;
  try {
    ticket = await database.ticket.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Erro ao buscar ingresso no banco de dados:", error);
    return NextResponse.json(
      { message: "Erro ao consultar o ingresso." },
      { status: 500 },
    );
  }

  if (!ticket) {
    return NextResponse.json(
      { message: "Ingresso não encontrado!" },
      { status: 404 },
    );
  }

  const fontData = getFontData();
  const bgImage = getBackgroundImage();

  const displayName = ticket.igName || ticket.instagram;
  const initialLetter = (displayName[0] || "U").toUpperCase();

  const avatarSrc = isSafeAvatarUrl(ticket.igAvatar) ? ticket.igAvatar! : "";

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        background: "#fff",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img width="1080" height="1920" src={bgImage} />

      <p
        style={{
          fontSize: 36,
          lineHeight: "110%",
          fontWeight: "bold",
          position: "absolute",
          left: 172,
          top: 790,
          maxWidth: 740,
          color: "#222",
          textWrap: "balance",
        }}
      >
        {appConfig.theme}
      </p>

      <p
        style={{
          fontSize: 36,
          lineHeight: "110%",
          fontWeight: "bold",
          position: "absolute",
          left: 172,
          top: 974,
          maxWidth: 340,
          color: "#222",
        }}
      >
        {appConfig.fullDate}
      </p>

      <p
        style={{
          fontSize: 36,
          lineHeight: "110%",
          fontWeight: "bold",
          position: "absolute",
          left: 528,
          top: 974,
          maxWidth: 376,
          color: "#222",
        }}
      >
        {appConfig.place}
      </p>

      {avatarSrc ? (
        <img
          width="127"
          height="127"
          src={avatarSrc}
          style={{
            borderRadius: 100,
            objectFit: "cover",
            position: "absolute",
            left: 173,
            top: 1375,
          }}
        />
      ) : (
        <div
          style={{
            width: 127,
            height: 127,
            borderRadius: 100,
            backgroundColor: "#2e5a36",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 54,
            fontWeight: "bold",
            position: "absolute",
            left: 173,
            top: 1375,
          }}
        >
          {initialLetter}
        </div>
      )}

      <p
        style={{
          fontSize: 36,
          lineHeight: "100%",
          fontWeight: "bold",
          position: "absolute",
          left: 332,
          top: 1404,
          maxWidth: 400,
          color: "#222",
        }}
      >
        {displayName}
      </p>

      <p
        style={{
          fontSize: 36,
          lineHeight: "100%",
          fontWeight: "bold",
          position: "absolute",
          left: 738,
          top: 1404,
          maxWidth: 160,
          color: "#222",
        }}
      >
        {ticket.count && ticket.count > 0
          ? ticket.count.toString().padStart(4, "0")
          : "------"}
      </p>
    </div>,
    {
      width: 1080,
      height: 1920,
      fonts: [
        {
          name: "Lato",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );
}
