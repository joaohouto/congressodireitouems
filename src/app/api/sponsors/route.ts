import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import { join } from "path";

export async function GET() {
  const sponsorsDirectory = join(process.cwd(), "public", "patrocinadores");

  try {
    const files = readdirSync(sponsorsDirectory);

    // Filter for image files
    const imageFiles = files.filter((file) => {
      const extension = file.toLowerCase().split(".").pop();
      return ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(
        extension || ""
      );
    });

    // Map files to their full public path
    const fullPathFiles = imageFiles.map((file) => {
      return `/patrocinadores/${file}`;
    });

    return NextResponse.json({ files: fullPathFiles });
  } catch (error) {
    console.error("Erro ao ler o diretório:", error);

    return NextResponse.json(
      { message: "Erro ao buscar os patrocinadores." },
      { status: 500 }
    );
  }
}
