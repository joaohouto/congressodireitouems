"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { formatDate } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  CalendarBlankIcon,
  MapPinIcon,
  NotePencilIcon,
} from "@phosphor-icons/react";

import {
  ArrowUpRight,
  Calendar,
  CalendarCheck,
  ChevronRight,
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

import { appConfig, EVENT_SCHEDULE } from "./config";
import { SponsorsBar } from "@/components/sponsors-bar";

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
  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(6px)" },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0)",
      transition: {
        duration: 0.6,
        delay: index * 0.2,
      },
    }),
  };

  const macawAnimation = {
    hidden: { x: -30, opacity: 0, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0)",
      transition: {
        duration: 1,
        delay: 5 * 0.2,
      },
    },
  };

  const themisAnimation = {
    hidden: { x: 0, opacity: 0, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0)",
      transition: {
        duration: 0.6,
        delay: 5 * 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-[600px] mx-auto my-auto py-8 px-4 flex flex-col items-center">
        <header className="flex flex-col items-center gap-7 py-15 relative">
          <motion.div
            variants={macawAnimation}
            initial="hidden"
            animate="visible"
            className="absolute -top-[120px] -right-[100px] md:-top-[130px] md:-right-[200px]"
          >
            <Image
              width={300}
              height={100}
              layout="contain"
              src="/araras.png"
              alt="Araras"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Image
              width={340}
              height={116}
              layout="contain"
              src="/logo.svg"
              alt="Congresso Jurídico"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex justify-center items-end font-semibold"
          >
            <LeftBranchIcon className="size-9 opacity-20" />
            <span className="text-secondary text-center max-w-[240px] text-sm leading-3.5">
              {appConfig.theme}
            </span>
            <RightBranchIcon className="size-9 opacity-20" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            className="grid grid-cols-2 gap-2"
          >
            <div className="flex gap-2 leading-3.5 font-semibold text-secondary text-sm max-w-[160px]">
              <CalendarBlankIcon
                weight="fill"
                className="size-6 min-w-6 text-primary"
              />
              {appConfig.fullDate}
            </div>

            <div className="flex gap-2 leading-3.5 font-semibold text-secondary text-sm max-w-[160px]">
              <MapPinIcon
                weight="fill"
                className="size-6 min-w-6 text-primary"
              />
              {appConfig.place}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-col gap-4 items-center justify-center"
          >
            <Button
              asChild
              className="h-12 w-[310px] uppercase rounded-full text-base font-semibold text-primary-foreground"
            >
              <Link href={appConfig.subscriptionForm}>
                <NotePencilIcon />
                Inscreva-se
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full w-fit !pl-4 "
            >
              <Link href="/editais">
                Editais
                <ChevronRight />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={themisAnimation}
            initial="hidden"
            animate="visible"
            className="absolute bottom-[100px] left-[100px] scale-150 md:scale-100 md:-bottom-[0px] md:-left-[200px]"
          >
            <Image
              width={140}
              height={100}
              layout="contain"
              src="/themis.png"
              alt="Themis"
            />
          </motion.div>

          <div className="md:h-0 h-[400px]" />
        </header>

        {appConfig.showSchedule && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={6}
            className="flex flex-col items-center gap-6"
          >
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
                            <span className="text-sm bg-primary text-primary-foreground py-1 px-2 rounded-full w-15 min-w-15 text-center text-balance font-semibold">
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
                              className="rounded-sm h-[200px] w-full object-cover bg-muted"
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
          </motion.div>
        )}

        <Link href="/editais">
          <div></div>
        </Link>

        <SponsorsBar />

        <Footer />
      </div>
    </div>
  );
}
