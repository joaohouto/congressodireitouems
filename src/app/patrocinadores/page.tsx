"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
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
    <div className="h-screen flex flex-col justify-center items-center gap-8 p-8">
      <Image src="/logo.svg" width={200} height={200} alt="logo" />

      <h1 className="uppercase tracking-widest text-muted-foreground">
        Patrocinadores
      </h1>

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
              <div className="p-1">
                <Card>
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
                </Card>
              </div>
            </CarouselItem>
          ))}

          {loading && (
            <CarouselItem className="pl-1">
              <div className="p-1">
                <Card>
                  <div className="relative h-48 w-full flex items-center justify-center">
                    <Spinner />
                  </div>
                </Card>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
