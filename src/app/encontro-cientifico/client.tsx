"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRightIcon,
  CaretRightIcon,
  ClockIcon,
  MicroscopeIcon,
  XIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";

import { SCIENCE_MEETING } from "@/config/app";
import { ANNALS_BY_YEAR } from "@/config/annals";
import { ResourceLink } from "@/components/resource-link";
import { usePeriodCountdown } from "@/hooks/use-period-countdown";

import { useEffect, useState } from "react";
import { CalendarBlankIcon, VideoCameraIcon } from "@phosphor-icons/react";
import type { ScienceMeetingSession } from "@/config/app";
import { cn } from "@/lib/utils";

type SessionStatus = "upcoming" | "today" | "live" | "ended";

// Fuso de Mato Grosso do Sul (UTC-4, sem horário de verão)
function toDate(date: string, time: string) {
  return new Date(`${date.slice(0, 10)}T${time}:00-04:00`);
}

function getSessionStatus(session: ScienceMeetingSession): SessionStatus {
  const now = Date.now();
  const start = toDate(session.date, session.time).getTime();
  const end = toDate(session.date, session.endTime || session.time).getTime();

  if (now >= end) return "ended";
  if (now >= start) return "live";

  const sameDay =
    new Date(start).toDateString() === new Date(now).toDateString();
  return sameDay ? "today" : "upcoming";
}

const STATUS_UI: Record<SessionStatus, { label: string; className: string }> = {
  upcoming: { label: "Em breve", className: "bg-muted text-muted-foreground" },
  today: { label: "Hoje", className: "bg-primary/10 text-primary" },
  live: { label: "Ao vivo", className: "bg-red-500/10 text-red-600" },
  ended: { label: "Encerrada", className: "bg-muted text-muted-foreground" },
};

function PresentationSession({ session }: { session: ScienceMeetingSession }) {
  const [status, setStatus] = useState<SessionStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getSessionStatus(session));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [session]);

  const date = new Date(session.date);
  const day = formatDate(date, "dd", { locale: ptBR });
  const month = formatDate(date, "MMM", { locale: ptBR }).replace(".", "");
  const weekday = formatDate(date, "EEEE", { locale: ptBR });
  const timeRange = session.endTime
    ? `${session.time} às ${session.endTime}`
    : session.time;

  const isEnded = status === "ended";
  const isLive = status === "live";
  const ui = status ? STATUS_UI[status] : null;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center",
        isEnded && "opacity-60",
      )}
    >
      {/* Bloco de data */}
      <div
        className={cn(
          "flex size-16 shrink-0 flex-col items-center justify-center rounded-xl border",
          isLive
            ? "border-primary bg-primary text-primary-foreground"
            : "bg-muted/50",
        )}
      >
        <span className="text-2xl font-semibold leading-none tabular-nums">
          {day}
        </span>
        <span className="mt-1 text-[11px] font-medium uppercase tracking-wider">
          {month}
        </span>
      </div>

      {/* Informações */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold leading-tight">
            Sessão de Apresentação de Trabalhos
          </h3>
          {ui && (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
                ui.className,
              )}
            >
              {isLive && (
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
                </span>
              )}
              {ui.label}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 capitalize">
            <CalendarBlankIcon className="size-4 shrink-0" />
            {weekday}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="size-4 shrink-0" />
            {timeRange}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <VideoCameraIcon className="size-4 shrink-0" />
            {session.local || "Google Meet"}
          </span>
        </div>
      </div>

      {/* Ação */}
      {session.link && !isEnded && (
        <Button
          asChild
          variant={isLive ? "default" : "outline"}
          className="w-full rounded-full sm:w-fit"
        >
          <Link href={session.link} target="_blank" rel="noopener noreferrer">
            {isLive ? "Entrar agora" : "Acessar sala"}
            <ArrowUpRightIcon />
          </Link>
        </Button>
      )}
    </div>
  );
}

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
            <MicroscopeIcon className="size-6 text-background" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-primary">
              {SCIENCE_MEETING.edition + " "}
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
                <ArrowUpRightIcon />
              </Link>
            </Button>
          ) : (
            <Button
              disabled
              className="w-fit !py-6 !px-6 rounded-full text-sm font-medium flex items-center gap-2 border border-border/60 bg-muted text-muted-foreground opacity-95 cursor-default select-none"
            >
              {submissionStatus === "upcoming" ? (
                <>
                  <ClockIcon className="size-4 shrink-0 text-primary/70" />
                  <span>
                    Submissões em{" "}
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

      {!!SCIENCE_MEETING.sessions?.length && (
        <Card className="w-full gap-4">
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight text-primary">
              Sessões de Apresentação
            </CardTitle>
            <CardDescription>
              As apresentações acontecem online, pelo Google Meet. Entre pela
              sala virtual no horário indicado.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col divide-y">
            {SCIENCE_MEETING.sessions.map((session, index) => (
              <PresentationSession
                key={session.link || `${session.date}-${index}`}
                session={session}
              />
            ))}
          </CardContent>
        </Card>
      )}

      <Link href="/editais" className="w-full hover:text-primary">
        <Card className="w-full">
          <CardContent className="flex flex-col divide-y">
            <span className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <span className="text-sm font-medium">
                Editais e regras de submissão
              </span>
              <CaretRightIcon className="size-4 shrink-0" />
            </span>
          </CardContent>
        </Card>
      </Link>

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
