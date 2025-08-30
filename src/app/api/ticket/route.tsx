import { NextResponse } from "next/server";
import { ImageResponse } from "next/og";
import { database } from "@/lib/prisma";

export async function GET(req: Request, res: Response) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Forneça um ID!" });
  }

  const subscription = await database.subscription.findUnique({
    where: {
      id,
    },
  });

  if (!subscription) {
    return NextResponse.json(
      { message: "Erro ao encontrar inscrição!" },
      { status: 404 }
    );
  }

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

        {!!subscription.igAvatar && (
          <img
            width="127"
            height="127"
            src={subscription.igAvatar}
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
          {subscription.igName ||
            subscription.name?.split(" ")?.[0] ||
            "Direito Aquidauana"}
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
          {subscription.count.toString().padStart(4, "0") || "------"}
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
