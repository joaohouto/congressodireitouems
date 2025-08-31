"use client";

import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";

import { SiGooglecalendar } from "react-icons/si";

import {
  Calendar,
  CalendarCheck,
  CalendarCheck2,
  Clock,
  MapPin,
  PresentationIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LeftBranchIcon } from "@/components/icon/left-branch";
import { RightBranchIcon } from "@/components/icon/right-branch";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";

import { EVENT_SCHEDULE } from "./config";

const AddToCalendarButton = ({ event }: { event: any }) => {
  // Formata a data para YYYYMMDDTHHMMSS
  const formatDateTime = (date: string, time: string) => {
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    return `${year}${month}${day}T${hour}${minute}00`;
  };

  // Cria a URL do Google Calendar
  const createCalendarUrl = (event: any) => {
    const startDate = formatDateTime(event.date, event.time);
    const endDate = formatDateTime(event.date, event.time); // Para eventos de um dia, a data de início e fim são as mesmas.
    const details = `${
      event.person ? `Palestrante: ${event.person}\n\n` : ""
    }${event.bio.replace(/\*\*/g, "").replace(/<br\s*\/?>/g, "\n")}`;

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `${event.category}: ${event.title}`,
      dates: `${startDate}/${endDate}`,
      details: details,
      location: event.local,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const calendarUrl = createCalendarUrl(event);

  return (
    <Button asChild variant="outline" className="rounded-full">
      <Link href={calendarUrl} target="_blank" rel="noopener noreferrer">
        <CalendarCheck />
        Adicionar ao Google Calendar
      </Link>
    </Button>
  );
};

export default function Page() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-[600px] mx-auto my-auto p-8 flex flex-col items-center">
        <header className="flex flex-col items-center gap-6 py-10">
          <Image
            width={340}
            height={116}
            layout="contain"
            src="/logo.svg"
            alt="Congresso Jurídico"
          />

          <span className="flex items-center gap-2 font-semibold ">
            <LeftBranchIcon className="size-8 opacity-20" />
            <span className="text-sky-900">
              Direito Penal e Processual Penal
            </span>
            <RightBranchIcon className="size-8 opacity-20" />
          </span>

          <Button
            asChild
            className="h-12 w-[310px] uppercase rounded-full text-base font-semibold text-primary-foreground"
          >
            <Link href="/inscricao">Inscreva-se</Link>
          </Button>
        </header>

        <div className="flex flex-col items-center gap-6">
          <h2 className="uppercase tracking-widest text-muted-foreground">
            Programação
          </h2>

          {EVENT_SCHEDULE?.map((day) => (
            <Card key={day.date} className={`w-full`}>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold tracking-tight mb-2 text-primary flex items-center gap-2">
                  <Calendar className="size-6" />

                  {formatDate(day.date, "EEEE", {
                    locale: ptBR,
                  })}
                </CardTitle>
                <CardDescription>
                  {formatDate(day.date, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col gap-4 ">
                  {day.events?.map((event) => (
                    <Dialog key={event.title}>
                      <DialogTrigger>
                        <div className="flex items-start gap-4">
                          <span className="text-sm bg-primary text-background py-1 px-2 rounded-full w-[52px] text-center text-balance font-semibold">
                            {event.time}
                          </span>
                          <div className="flex flex-col items-start justify-start">
                            <strong className="text-base font-semibold text-balance text-left">
                              {event.title}
                            </strong>
                            {!!event.person && (
                              <p className="text-sm text-balance text-left">
                                {event.person}
                              </p>
                            )}
                          </div>
                        </div>
                      </DialogTrigger>

                      <DialogContent className="max-h-[calc(100%-2rem)] w-[800px] overflow-y-auto flex flex-col ">
                        {!!event.image && (
                          <Image
                            className="rounded-sm size-[200px] object-cover bg-muted"
                            src={event.image}
                            alt={event.person}
                            width={200}
                            height={200}
                          />
                        )}

                        <div className="">
                          <strong className="text-2xl font-semibold text-balance mb-4">
                            {event.title}
                          </strong>

                          {!!event.person && (
                            <p className="text-lg text-balance">
                              com <b>{event.person}</b>
                            </p>
                          )}

                          <ul className="flex flex-row flex-wrap gap-2 my-2 mb-6">
                            <li>
                              <Badge variant="secondary">
                                <PresentationIcon className="h-4 w-4" />
                                {event.category}
                              </Badge>
                            </li>

                            <li>
                              <Badge variant="secondary">
                                <Clock className="h-4 w-4" />
                                {event.time}
                              </Badge>
                            </li>

                            <li>
                              <Badge variant="secondary">
                                <MapPin className="h-4 w-4 min-w-4" />
                                {event.local}
                              </Badge>
                            </li>
                          </ul>

                          <div className="prose prose-neutral mb-6">
                            <ReactMarkdown>{event.bio}</ReactMarkdown>
                          </div>

                          <AddToCalendarButton
                            event={{ ...event, date: day.date }}
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}
