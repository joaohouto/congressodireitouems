import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import { join } from "path";

export async function GET() {
  const postsDirectory = join(process.cwd(), "public", "instagram", "posts");

  try {
    const files = readdirSync(postsDirectory);

    const imageFiles = files.filter((file) => {
      const extension = file.toLowerCase().split(".").pop();
      return ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(
        extension || ""
      );
    });

    for (let i = imageFiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imageFiles[i], imageFiles[j]] = [imageFiles[j], imageFiles[i]];
    }

    const fullPathFiles = imageFiles.map((file) => {
      return `/instagram/posts/${file}`;
    });

    return NextResponse.json({ files: fullPathFiles });
  } catch (error) {
    console.error("Erro ao ler o diretório:", error);

    return NextResponse.json(
      { message: "Erro ao buscar as imagens." },
      { status: 500 }
    );
  }
}
