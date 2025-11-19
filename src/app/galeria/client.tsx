"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GalleryHorizontal } from "lucide-react";
import { GALLERIES_BY_YEAR } from "@/config/galleries";

export function GaleriesList() {
  return (
    <div className="w-full mx-auto my-auto rounded-lg flex flex-col items-center gap-6">
      <Card className="p-6 w-full">
        <h1 className="text-3xl font-semibold tracking-tight text-primary flex items-center gap-4">
          <div className="size-12 rounded-full bg-primary grid place-items-center">
            <GalleryHorizontal className="size-6 text-background" />
          </div>
          Galeria de Fotos
        </h1>
      </Card>

      {Object.entries(GALLERIES_BY_YEAR)
        .reverse()
        .map(([ano, galeries]) => (
          <Card key={ano} className="w-full mx-auto my-auto rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold tracking-tight text-primary">
                {ano}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 list-disc pl-5 text-neutral-400">
                {galeries.map((gallery) => (
                  <li key={gallery.title}>
                    <a
                      href={gallery.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {gallery.title}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
