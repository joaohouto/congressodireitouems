import { NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import { database } from "@/lib/prisma";
import { appConfig } from "@/app/config";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Forneça um ID!" });
  }

  const ticket = await database.ticket.findUnique({
    where: {
      id,
    },
  });

  console.log(ticket);

  if (!ticket) {
    return NextResponse.json(
      { message: "Erro ao encontrar ticket!" },
      { status: 404 }
    );
  }

  // TODO: se o get da url de subscription.igAvatar der pau, tentar fazer o
  // scrap do perfil do Instagram novamente e salvar no banco

  const fontData = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_HOSTNAME}/fonts/Lato-Bold.ttf`)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
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
        <img
          width="1080"
          height="1920"
          src={`${process.env.NEXT_PUBLIC_HOSTNAME}/ingresso.jpg`}
        />

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

        {!!ticket.igAvatar && (
          <img
            width="127"
            height="127"
            src={ticket.igAvatar}
            style={{
              borderRadius: 100,
              objectFit: "cover",
              position: "absolute",
              left: 173,
              top: 1375,
            }}
          />
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
          {ticket.igName || ticket.instagram}
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
          {ticket.count.toString().padStart(4, "0") || "------"}
        </p>
      </div>
    ),
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
    }
  );
}
