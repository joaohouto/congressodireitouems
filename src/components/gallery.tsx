"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[][]>([[], [], [], []]);

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

  useEffect(() => {
    const newColumns: string[][] = [[], [], [], []];
    images.forEach((image, index) => {
      newColumns[index % 4].push(image);
    });
    setColumns(newColumns);
  }, [images]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {columns.map((column, colIndex) => (
        <div
          key={colIndex}
          className={`w-full flex flex-col gap-4 ${
            colIndex % 2 !== 0 ? "" : "md:mt-[80px] mt-0"
          }`}
        >
          {column.map((image) => (
            <div key={image}>
              <Image
                className="h-auto w-full sm:rounded-lg rounded"
                src={image}
                alt=""
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
