"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText } from "lucide-react";
import { ANNALS_BY_YEAR } from "@/config/annals";

export function AnaisList() {
  const entries = Object.entries(ANNALS_BY_YEAR).reverse();

  return (
    <div className="w-full mx-auto my-auto rounded-lg flex flex-col items-center gap-6">
      <Card className="p-6 w-full">
        <h1 className="text-3xl font-semibold tracking-tight text-primary flex items-center gap-4">
          <div className="size-12 rounded-full bg-primary grid place-items-center">
            <BookOpen className="size-6 text-background" />
          </div>
          Anais do Encontro Científico
        </h1>
      </Card>

      {entries.length === 0 && (
        <Card className="w-full">
          <CardContent className="py-10 text-center text-muted-foreground">
            Nenhum anais publicado ainda.
          </CardContent>
        </Card>
      )}

      {entries.map(([ano, annals]) => (
        <Card key={ano} className="w-full mx-auto rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight text-primary">
              {ano}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5 text-neutral-400">
              {annals.map((annal) => (
                <li key={annal.title}>
                  <a
                    href={annal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-2"
                  >
                    <FileText className="size-4 shrink-0" />
                    {annal.title}
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
