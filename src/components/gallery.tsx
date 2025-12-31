"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react";

const COLUMN_COUNT = 4;
const SKELETON_ROWS = 3;

export function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/gallery");
        setImages(response.data.files);
      } catch (error) {
        console.error("Erro ao buscar as imagens:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleLoaded = useCallback((src: string) => {
    setLoaded((prev) => ({ ...prev, [src]: true }));
  }, []);

  const distributeIntoColumns = (items: string[]) => {
    const cols: string[][] = Array.from({ length: COLUMN_COUNT }, () => []);
    items.forEach((item, index) => {
      cols[index % COLUMN_COUNT].push(item);
    });
    return cols;
  };

  const columns = distributeIntoColumns(images);

  const renderSkeletonColumn = (colIndex: number) => (
    <div
      key={`skeleton-col-${colIndex}`}
      className={`w-full flex flex-col gap-4 ${
        colIndex % 2 === 0 ? "md:mt-[80px]" : ""
      }`}
    >
      {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
        <div
          key={`skeleton-${colIndex}-${i}`}
          className="w-full aspect-video bg-gray-200 animate-pulse rounded sm:rounded-lg"
        />
      ))}
    </div>
  );

  const renderImageColumn = (column: string[], colIndex: number) => (
    <div
      key={`col-${colIndex}`}
      className={`w-full flex flex-col gap-4 ${
        colIndex % 2 === 0 ? "md:mt-[80px]" : ""
      }`}
    >
      {column.map((image) => (
        <div key={image} className="relative w-full">
          {!loaded[image] && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full aspect-video bg-gray-200 animate-pulse rounded sm:rounded-lg"
            />
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: loaded[image] ? 1 : 0,
              y: loaded[image] ? 0 : 10,
            }}
            transition={{ duration: 0.35 }}
            className={loaded[image] ? "block" : "absolute inset-0"}
          >
            <Image
              className="h-auto w-full rounded sm:rounded-lg"
              src={image}
              alt=""
              width={500}
              height={500}
              onLoadingComplete={() => handleLoaded(image)}
              unoptimized={false}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
      {isLoading
        ? Array.from({ length: COLUMN_COUNT }).map((_, colIndex) =>
            renderSkeletonColumn(colIndex)
          )
        : columns.map((column, colIndex) =>
            renderImageColumn(column, colIndex)
          )}
    </div>
  );
}
