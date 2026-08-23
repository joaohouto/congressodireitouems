"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImagesIcon } from "@phosphor-icons/react";
import { GALLERIES_BY_YEAR } from "@/config/galleries";
import { ResourceLink } from "@/components/resource-link";

export function GaleriesList() {
  const entries = Object.entries(GALLERIES_BY_YEAR).reverse();

  return (
    <div className="w-full mx-auto my-auto rounded-lg flex flex-col items-center gap-6">
      <Card className="w-full p-6">
        <div className="flex items-center gap-4">
          <div className="size-12 shrink-0 rounded-full bg-primary grid place-items-center">
            <ImagesIcon className="size-6 text-background" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-primary">
              Galeria
            </h1>
            <CardDescription className="text-balance">
              Fotos do congresso e álbuns completos de cada dia.
            </CardDescription>
          </div>
        </div>
      </Card>

      {entries.length === 0 && (
        <Card className="w-full">
          <CardContent className="py-10 text-center text-muted-foreground">
            Nenhuma galeria publicada ainda.
          </CardContent>
        </Card>
      )}

      {entries.map(([ano, galleries]) => (
        <Card key={ano} className="w-full mx-auto rounded-lg gap-4">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold tracking-tight text-primary">
              {ano}
            </CardTitle>
            <Badge variant="secondary">
              {galleries.length} {galleries.length === 1 ? "álbum" : "álbuns"}
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col divide-y">
            {galleries.map((gallery) => (
              <ResourceLink
                key={gallery.title}
                title={gallery.title}
                url={gallery.url}
              />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
