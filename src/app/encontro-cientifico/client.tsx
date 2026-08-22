"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Microscope, Clock, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";

import { SCIENCE_MEETING } from "@/config/app";
import { ANNALS_BY_YEAR } from "@/config/annals";
import { ResourceLink } from "@/components/resource-link";
import { usePeriodCountdown } from "@/hooks/use-period-countdown";
import { XIcon } from "@phosphor-icons/react";

export function EncontroCientificoContent() {
  const {
    status: submissionStatus,
    formattedCountdown,
    isMounted,
  } = usePeriodCountdown(
    SCIENCE_MEETING.submissionStart,
    SCIENCE_MEETING.submissionEnd,
  );

  const annals = Object.entries(ANNALS_BY_YEAR)
    .sort(([a], [b]) => Number(b) - Number(a))
    .flatMap(([ano, items]) => items.map((item) => ({ ...item, ano })));

  return (
    <div className="w-full mx-auto my-auto rounded-lg flex flex-col items-center gap-6">
      <Card className="w-full p-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="size-12 shrink-0 rounded-full bg-primary grid place-items-center">
            <Microscope className="size-6 text-background" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-primary">
              Encontro Científico
            </h1>
            <CardDescription className="text-balance">
              O espaço do congresso dedicado à apresentação de trabalhos
              acadêmicos de alunos e pesquisadores do curso de Direito.
            </CardDescription>
          </div>
        </div>

        {!!SCIENCE_MEETING.submissionForm &&
          (submissionStatus === "open" ? (
            <Button
              asChild
              className="w-fit !py-6 !px-6 rounded-full text-sm font-semibold text-primary-foreground"
            >
              <Link
                href={SCIENCE_MEETING.submissionForm}
                target="_blank"
                rel="noopener noreferrer"
              >
                Submeta seu trabalho
                <ArrowUpRight />
              </Link>
            </Button>
          ) : (
            <Button
              disabled
              className="w-fit !py-6 !px-6 rounded-full text-sm font-medium flex items-center gap-2 border border-border/60 bg-muted text-muted-foreground opacity-95 cursor-default select-none"
            >
              {submissionStatus === "upcoming" ? (
                <>
                  <Clock className="size-4 shrink-0 text-primary/70" />
                  <span>
                    Submissões abrem em{" "}
                    <span
                      suppressHydrationWarning
                      className="font-mono font-semibold tabular-nums text-foreground/90"
                    >
                      {isMounted
                        ? formattedCountdown
                        : SCIENCE_MEETING.submissionStart
                          ? formatDate(
                              SCIENCE_MEETING.submissionStart,
                              "dd/MM",
                              { locale: ptBR },
                            )
                          : ""}
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <XIcon /> Submissões encerradas
                </>
              )}
            </Button>
          ))}
      </Card>

      <Card className="w-full">
        <CardContent className="flex flex-col divide-y">
          <Link
            href="/editais"
            className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0 hover:text-primary"
          >
            <span className="text-sm font-medium">
              Editais e regras de submissão
            </span>
            <ChevronRight className="size-4 shrink-0" />
          </Link>
        </CardContent>
      </Card>

      <Card className="w-full gap-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight text-primary">
            Anais
          </CardTitle>
          <CardDescription>
            Publicações com os trabalhos apresentados em cada edição do Encontro
            Científico.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col divide-y">
          {annals.length === 0 && (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Nenhum anais publicado ainda.
            </p>
          )}

          {annals.map((annal) => (
            <ResourceLink
              key={annal.title}
              title={annal.title}
              url={annal.url}
              badge={annal.ano}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
