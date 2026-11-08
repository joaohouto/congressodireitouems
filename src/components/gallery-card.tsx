"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, ImagesIcon } from "@phosphor-icons/react";

import { Card } from "@/components/ui/card";
import { appConfig } from "@/config/app";

interface GalleryCardProps {
  title?: string;
  description?: string;
  images?: string[];
  href?: string;
}

export function GalleryCard({
  title = appConfig.galleryTitle,
  description = appConfig.galleryDescription,
  images = appConfig.galleryPreviewImages,
  href = "/galeria",
}: GalleryCardProps) {
  if (!images || images.length === 0) return null;

  const previewSlice = images.slice(0, 4);

  return (
    <Card className="w-full overflow-hidden p-0 gap-0">
      <Link
        href={href}
        className="relative block w-full h-[220px] sm:h-[260px] group"
      >
        <div className="grid grid-cols-4 w-full h-full gap-0.5 bg-black/20 transition-transform duration-500 group-hover:scale-[1.03]">
          {previewSlice.map((src, index) => (
            <div key={src} className="relative w-full h-full overflow-hidden">
              <Image
                alt={`${title} ${index + 1}`}
                src={src}
                fill
                sizes="(max-width: 640px) 25vw, 150px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />

        <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-3">
          <div className="flex items-start gap-2 text-white min-w-0">
            <ImagesIcon
              weight="fill"
              className="size-5 min-w-5 mt-0.5 text-white/90"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold leading-tight text-balance">
                {title}
              </span>
              {!!description && (
                <span className="text-xs text-white/80 leading-tight text-balance">
                  {description}
                </span>
              )}
            </div>
          </div>

          <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-white/90 bg-white/15 backdrop-blur-sm rounded-full py-1.5 px-3 group-hover:bg-white/25 transition-colors">
            Ver fotos
            <ArrowRightIcon className="size-3.5" weight="bold" />
          </span>
        </div>
      </Link>
    </Card>
  );
}
