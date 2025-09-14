"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import { appConfig, EDICTS_BY_YEAR } from "../config";

interface Edital {
  title: string;
  url?: string;
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
          {edital.title}
        </a>
      ) : (
        <span>{edital.title}</span>
      )}
      {edital.children && (
        <ul className="pl-4 mt-2 space-y-2">
          {edital.children.map((child) => (
            <EditalItem key={child.title} edital={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function EditaisList() {
  return (
    <div className="w-full mx-auto my-auto rounded-lg flex flex-col gap-6">
      <Card className="p-6">
        <h1 className="text-3xl font-semibold tracking-tight text-primary flex items-center gap-4">
          <div className="size-12 rounded-full bg-primary grid place-items-center">
            <FileText className="size-6 text-background" />
          </div>
          Editais
        </h1>
      </Card>

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
