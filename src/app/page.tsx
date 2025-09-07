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
  Calendar,
  CalendarCheck,
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
import { useEffect, useState } from "react";
import axios from "axios";

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

const AnimatedLogoCloud = () => {
  const [logos, setLogos] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/sponsors");
        setLogos(response.data.files);
      } catch (error) {
        console.error("Erro ao buscar logos:", error);
      }
    })();
  }, []);

  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-4">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo: any, key: any) => (
                  <img
                    key={key}
                    src={logo}
                    className="h-10 w-auto px-2 dark:invert"
                    alt={`${logo}`}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
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

  return (
    <div className="min-h-screen bg-muted">
      <div className="max-w-[600px] mx-auto my-auto p-8 flex flex-col items-center">
        <header className="flex flex-col items-center gap-7 py-15 relative">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={5}
            className="absolute -top-[130px] -right-[200px]"
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
            className="grid grid-cols-2 gap-4"
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
          >
            <Button
              asChild
              className="h-12 w-[310px] uppercase rounded-full text-base font-semibold text-primary-foreground"
            >
              <Link href="/inscricao">
                <NotePencilIcon />
                Inscreva-se
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={5}
            className="absolute -bottom-[0px] -left-[200px]"
          >
            <Image
              width={140}
              height={100}
              layout="contain"
              src="/themis.png"
              alt="Themis"
            />
          </motion.div>
        </header>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={6}
          className="flex flex-col items-center gap-6"
        >
          <h2 className="uppercase tracking-widest text-muted-foreground my-6">
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

        <h2 className="uppercase tracking-widest text-muted-foreground mt-20">
          Patrocinadores
        </h2>

        <AnimatedLogoCloud />

        <Footer />
      </div>
    </div>
  );
}
