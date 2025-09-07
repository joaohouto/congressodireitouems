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
    <div className="w-full mx-auto my-auto rounded-lg space-y-4">
      <Card>
        <CardHeader>
          <div className="h-12 w-12 rounded-full bg-primary grid place-items-center mb-2">
            <FileText className="h-6 w-6 text-background" />
          </div>
          <CardTitle className="text-3xl font-semibold tracking-tight mb-2 text-primary">
            Editais
          </CardTitle>
          <CardDescription className="text-base text-balance">
            Confira os editais do {appConfig.title}.
          </CardDescription>
        </CardHeader>
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
