"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export function Gallery() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/gallery");
        setImages(response.data.files);
      } catch (error) {
        console.error("Erro ao buscar as imagens:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid items-center justify-center grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {images.map((image) => (
        <div key={image}>
          <Image
            className="h-auto max-w-full rounded-lg"
            src={image}
            alt=""
            width={500}
            height={500}
          />
        </div>
      ))}
    </div>
  );
}
