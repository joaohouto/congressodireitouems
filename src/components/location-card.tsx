"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AirplaneTakeoffIcon,
  ArrowUpRightIcon,
  InfoIcon,
  LinkIcon,
  MapPinAreaIcon,
  MapPinIcon,
  MapTrifoldIcon,
} from "@phosphor-icons/react";
import "leaflet/dist/leaflet.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { appConfig } from "@/config/app";
import { Spinner } from "./luxe/spinner";
import Image from "next/image";

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
  placeUrl = appConfig.placeUrl,
  placeImage = appConfig.placeImage,
  address = appConfig.placeAddress,
  coordinates = appConfig.placeCoordinates,
  googleMapsUrl,
}: LocationCardProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const finalGoogleMapsUrl =
    googleMapsUrl ||
    (coordinates
      ? `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${place}, ${address}`,
        )}`);

  useEffect(() => {
    let isCancelled = false;

    async function initMap() {
      if (!mapContainerRef.current || !coordinates) return;
      if (mapInstanceRef.current) return;

      const L = await import("leaflet");
      if (isCancelled || !mapContainerRef.current) return;

      const { lat, lng } = coordinates;

      // Criar instância do mapa Leaflet
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 16,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      // Camada de tiles gratuita OpenStreetMap (sem necessidade de API key)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Ícone clássico do Marcador (restaurado)
      const customIcon = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px;">
            <div style="position: relative; width: 34px; height: 34px; background-color: #0d542b; color: #ffffff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 2px solid #ffffff;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,120a32,32,0,1,1,32-32A32,32,0,0,1,128,136Z"></path>
              </svg>
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      marker.on("click", () => {
        window.open(finalGoogleMapsUrl, "_blank", "noopener,noreferrer");
      });

      // Ajustar tamanho após renderização
      setTimeout(() => {
        if (!isCancelled && mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
          setIsMapReady(true);
        }
      }, 250);
    }

    initMap();

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates, place, address, finalGoogleMapsUrl]);

  return (
    <Card className="w-full overflow-hidden p-0">
      <CardContent className="flex flex-col gap-4 p-4">
        {/* Container do Mapa Leaflet */}
        <div className="relative w-full h-[280px] sm:h-[300px] rounded-md overflow-hidden border border-border/60 bg-muted/40 z-0">
          <div
            ref={mapContainerRef}
            className="w-full h-full z-0"
            style={{ minHeight: "280px" }}
          />

          {!isMapReady && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/70 backdrop-blur-xs gap-2 z-10">
              <Spinner />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <Button
            asChild
            variant="outline"
            className="rounded-xl h-14 !px-5 font-medium flex items-center justify-start gap-2"
          >
            <Link
              href={placeUrl || finalGoogleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InfoIcon className="size-4 opacity-50" weight="bold" />
              <div className="flex flex-col items-start text-left">
                <span className="text-xs text-muted-foreground">
                  Local do evento
                </span>
                <span>{place}</span>
              </div>
            </Link>
          </Button>

          <Button
            asChild
            className="rounded-full font-medium flex items-center justify-center gap-2"
          >
            <Link
              href={finalGoogleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Google Maps</span>
              <LinkIcon className="size-4" weight="bold" />
            </Link>
          </Button>
        </div>

        {placeImage && (
          <Image
            alt="Local"
            src={placeImage || "/images/local.jpg"}
            width={800}
            height={400}
            className="w-full h-auto rounded-md object-cover"
          />
        )}
      </CardContent>
    </Card>
  );
}
