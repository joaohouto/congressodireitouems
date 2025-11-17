"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, FileText } from "lucide-react";
import { appConfig } from "@/config/app";
import { EDICTS_BY_YEAR } from "@/config/edicts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Edital {
  title: string;
  url?: string;
  badge?: string;
  children?: Edital[];
}

function EditalItem({ edital }: { edital: Edital }) {
  return (
    <li>
      {edital.url ? (
        <a
          href={edital.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {edital.title} {edital.badge && <Badge>{edital.badge}</Badge>}
        </a>
      ) : (
        <span>
          {edital.title} {edital.badge && <Badge>{edital.badge}</Badge>}
        </span>
      )}
      {edital.children && (
        <ul className="pl-4 mt-2 space-y-2">
          {edital.children.map((child) => (
            <EditalItem key={child.title} edital={child} /> // recursion is cool
          ))}
        </ul>
      )}
    </li>
  );
}

export function EditaisList() {
  return (
    <div className="w-full mx-auto my-auto rounded-lg flex flex-col items-center gap-6">
      <Card className="p-6 w-full">
        <h1 className="text-3xl font-semibold tracking-tight text-primary flex items-center gap-4">
          <div className="size-12 rounded-full bg-primary grid place-items-center">
            <FileText className="size-6 text-background" />
          </div>
          Editais
        </h1>
      </Card>

      {appConfig.scienceMeetingForm && (
        <Button
          asChild
          className="w-fit !py-8 !px-8 whitespace-normal break-words uppercase rounded-full text-sm font-semibold text-primary-foreground"
        >
          <Link href={appConfig.scienceMeetingForm}>
            Submissão de resumos e banners (II Encontro Científico)
            <ArrowUpRight />
          </Link>
        </Button>
      )}

      {Object.entries(EDICTS_BY_YEAR)
        .reverse()
        .map(([ano, editais]) => (
          <Card key={ano} className="w-full mx-auto my-auto rounded-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold tracking-tight text-primary">
                {ano}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {editais.map((edital) => (
                  <EditalItem key={edital.title} edital={edital} />
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
