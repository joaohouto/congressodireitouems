"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileTextIcon } from "@phosphor-icons/react";
import { EDICTS_BY_YEAR } from "@/config/edicts";
import { Badge } from "@/components/ui/badge";
import { ResourceLink } from "@/components/resource-link";

interface Edital {
  title: string;
  url?: string;
  badge?: string;
  children?: Edital[];
}

function EditalItem({
  edital,
  depth = 0,
  isFirst = true,
  isLast = true,
}: {
  edital: Edital;
  depth?: number;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  // Only the top-level list has divider lines (divide-y) to line the
  // rounded corners up with; nested anexos just sit in a plain gapped
  // list, so they can always be fully rounded.
  const roundedEdge =
    depth > 0
      ? "both"
      : isFirst && isLast
        ? "both"
        : isFirst
          ? "top"
          : isLast
            ? "bottom"
            : "none";

  return (
    <li>
      <ResourceLink
        title={edital.title}
        url={edital.url}
        badge={edital.badge}
        compact={depth > 0}
        roundedEdge={roundedEdge}
      />
      {edital.children && (
        <ul className="ml-6 mt-1 mb-1 flex flex-col gap-0.5 border-l pl-3">
          {edital.children.map((child) => (
            <EditalItem key={child.title} edital={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function EditaisList() {
  const entries = Object.entries(EDICTS_BY_YEAR).reverse();

  return (
    <div className="w-full mx-auto my-auto rounded-lg flex flex-col items-center gap-6">
      <Card className="w-full p-6">
        <div className="flex items-center gap-4">
          <div className="size-12 shrink-0 rounded-full bg-primary grid place-items-center">
            <FileTextIcon className="size-6 text-background" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-primary">
              Editais
            </h1>
            <CardDescription className="text-balance">
              Editais, retificações e resultados oficiais do congresso, por ano.
            </CardDescription>
          </div>
        </div>
      </Card>

      {entries.length === 0 && (
        <Card className="w-full">
          <CardContent className="py-10 text-center text-muted-foreground">
            Nenhum edital publicado ainda.
          </CardContent>
        </Card>
      )}

      {entries.map(([ano, editais]) => (
        <Card key={ano} className="w-full mx-auto rounded-lg gap-4">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold tracking-tight text-primary">
              {ano}
            </CardTitle>
            <Badge variant="secondary">
              {editais.length} {editais.length === 1 ? "edital" : "editais"}
            </Badge>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col divide-y">
              {editais.map((edital, index) => (
                <EditalItem
                  key={edital.title}
                  edital={edital}
                  isFirst={index === 0}
                  isLast={index === editais.length - 1}
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
