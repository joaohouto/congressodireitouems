"use client";

import * as React from "react";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { toast } from "sonner";
import { Spinner } from "@/components/luxe/spinner";

export default function SponsorsPage() {
  const [loading, setLoading] = React.useState(true);
  const [sponsors, setSponsors] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetchSponsors();
  }, []);

  async function fetchSponsors() {
    setLoading(true);

    try {
      const response = await fetch("/api/sponsors");
      const data = await response.json();

      setSponsors(data.files);
    } catch (error) {
      toast.error("Erro ao buscar patrocinadores");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-20 p-8">
      <Carousel
        className="w-full "
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="-ml-1">
          {sponsors.map((sponsor, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="px-6">
                <div className="relative h-48 w-full">
                  <Image
                    src={sponsor}
                    alt="Descrição da imagem"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "contain" }}
                    className="absolute"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}

          {loading && (
            <CarouselItem className="w-full flex justify-center items-center">
              <Spinner />
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>

      <Image
        src="/logo.svg"
        width={160}
        height={160}
        alt="logo"
        className="absolute bottom-8 grayscale opacity-50"
      />
    </div>
  );
}
