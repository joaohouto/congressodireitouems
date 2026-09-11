"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon, MapPinIcon } from "@phosphor-icons/react";

import { Card } from "@/components/ui/card";
import { appConfig } from "@/config/app";

interface LocationCardProps {
  place?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  googleMapsUrl?: string;
  placeUrl?: string;
  placeImage?: string;
}

export function LocationCard({
  place = appConfig.place,
  placeImage = appConfig.placeImage,
  address = appConfig.placeAddress,
  coordinates = appConfig.placeCoordinates,
  googleMapsUrl,
}: LocationCardProps) {
  const finalGoogleMapsUrl =
    googleMapsUrl ||
    (coordinates
      ? `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${place}, ${address}`,
        )}`);

  if (!placeImage) return null;

  return (
    <Card className="w-full overflow-hidden p-0 gap-0">
      <Link
        href={finalGoogleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full h-[220px] sm:h-[260px] group"
      >
        <Image
          alt={place}
          src={placeImage}
          fill
          sizes="(max-width: 640px) 100vw, 600px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-3">
          <div className="flex items-start gap-2 text-white min-w-0">
            <MapPinIcon
              weight="fill"
              className="size-5 min-w-5 mt-0.5 text-white/90"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold leading-tight text-balance">
                {place}
              </span>
              {!!address && (
                <span className="text-sm text-white/80 leading-tight text-balance">
                  {address}
                </span>
              )}
            </div>
          </div>

          <span className="shrink-0 inline-flex items-center gap-1 text-xs font-medium text-white/90 bg-white/15 backdrop-blur-sm rounded-full py-1.5 px-3 group-hover:bg-white/25 transition-colors">
            Google Maps
            <ArrowUpRightIcon className="size-3.5" weight="bold" />
          </span>
        </div>
      </Link>
    </Card>
  );
}
