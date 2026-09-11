"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { formatDate, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  ArrowSquareOutIcon,
  CalendarBlankIcon,
  CaretRightIcon,
  ClockIcon,
  InstagramLogoIcon,
  MapPinIcon,
  NotePencilIcon,
  PresentationIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LeftBranchIcon } from "@/components/icon/left-branch";
import { RightBranchIcon } from "@/components/icon/right-branch";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";

import { appConfig, EVENT_SCHEDULE } from "../config/app";
import { LocationCard } from "@/components/location-card";
import { SponsorsBar } from "@/components/sponsors-bar";
import { usePeriodCountdown } from "@/hooks/use-period-countdown";

export default function Page() {
  const {
    status: subscriptionStatus,
    formattedCountdown,
    isMounted,
  } = usePeriodCountdown(
    appConfig.subscriptionStart,
    appConfig.subscriptionEnd,
  );

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
    hidden: { opacity: 0, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      filter: "blur(0)",
      transition: {
        duration: 0.6,
        delay: 5 * 0.2,
      },
    },
  };

  return (
    <main className="relative min-h-screen bg-muted overflow-x-hidden">
      {/* Imagem do Palácio no topo da página: largura total, colada no topo, apenas com fade embaixo */}
      <div className="absolute inset-x-0 top-0 h-[480px] sm:h-[540px] md:h-[620px] pointer-events-none overflow-hidden select-none z-0">
        <motion.div
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1 }}
          className="relative w-full h-full"
        >
          <Image
            src="/palacio.webp"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-15 dark:opacity-20"
          />
          {/* Fade suave apenas na parte inferior */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-muted" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-muted to-transparent" />
        </motion.div>
      </div>

      <div className="relative max-w-[600px] mx-auto py-8 px-4 flex flex-col items-center">
        <header className="w-full flex flex-col items-center gap-7 pt-40 pb-15 relative">
          <motion.div
            variants={macawAnimation}
            initial="hidden"
            animate="visible"
            className="absolute -top-8 -right-30 md:-right-20"
          >
            <Image width={300} height={100} src="/araras.png" alt="Araras" />
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
              src="/logo.svg"
              alt="Congresso Jurídico"
            />
          </motion.div>

          {appConfig.showTheme && (
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
          )}

          {appConfig.showDateAndPlace && (
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
          )}

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-col gap-4 items-center justify-center"
          >
            {!!appConfig.subscriptionForm &&
              (subscriptionStatus === "open" ? (
                <Button
                  asChild
                  className="h-12 w-[310px] uppercase rounded-full text-base font-semibold text-primary-foreground"
                >
                  <Link href={appConfig.subscriptionForm}>
                    <NotePencilIcon />
                    Inscreva-se
                  </Link>
                </Button>
              ) : (
                <Button
                  disabled
                  className="h-12 w-[310px] rounded-full text-sm font-medium flex items-center justify-center gap-2 border border-border/60 bg-background/50 text-muted-foreground opacity-95 cursor-default select-none backdrop-blur-xs"
                >
                  {subscriptionStatus === "upcoming" ? (
                    <>
                      <ClockIcon className="size-4 shrink-0 text-primary/70" />
                      <span>
                        Inscrições em{" "}
                        <span
                          suppressHydrationWarning
                          className="font-mono font-semibold tabular-nums text-foreground/90"
                        >
                          {isMounted
                            ? formattedCountdown
                            : appConfig.subscriptionStart
                              ? formatDate(
                                  appConfig.subscriptionStart,
                                  "dd/MM",
                                  { locale: ptBR },
                                )
                              : ""}
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="flex items-center gap-2 uppercase">
                      <XIcon /> Inscrições encerradas
                    </span>
                  )}
                </Button>
              ))}

            <div className="flex gap-2 flex-wrap justify-center">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full w-fit !pl-4"
              >
                <Link href="/encontro-cientifico">
                  Encontro Científico
                  <CaretRightIcon />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full w-fit !pl-4"
              >
                <Link href="/galeria">
                  Galeria
                  <CaretRightIcon />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={themisAnimation}
            initial="hidden"
            animate="visible"
            className="absolute bottom-[100px] left-1/2 -translate-x-1/2 scale-150 md:scale-120 md:translate-x-0 md:-bottom-0 md:-left-[140px]"
          >
            <Image width={140} height={100} src="/themis.png" alt="Themis" />
          </motion.div>

          <div className="md:h-0 h-[400px]" />
        </header>

        {appConfig.showSchedule && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={6}
            className="w-full flex flex-col items-center gap-6"
          >
            <h2 className="uppercase tracking-widest text-muted-foreground">
              Programação
            </h2>

            {EVENT_SCHEDULE?.map((day) => (
              <Card
                key={day.date}
                className={`w-full ${
                  isToday(day.date) && "relative border-primary border-2"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold tracking-tight mb-2 text-primary flex items-center gap-2">
                    <CalendarBlankIcon className="size-6" />

                    {formatDate(day.date, "EEEE", {
                      locale: ptBR,
                    })}
                  </CardTitle>
                  <CardDescription>
                    {formatDate(day.date, "dd 'de' MMMM 'de' yyyy", {
                      locale: ptBR,
                    })}
                  </CardDescription>

                  {isToday(day.date) && (
                    <span className="absolute top-0 right-0 py-2 px-6 bg-primary text-primary-foreground rounded-tr-lg rounded-bl-xl">
                      É HOJE!
                    </span>
                  )}
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col gap-4 ">
                    {day.events?.map((event) => (
                      <Dialog key={event.title}>
                        <DialogTrigger asChild>
                          <button className="flex items-start gap-4 text-left w-full">
                            <span className="text-sm bg-primary text-primary-foreground py-1 px-2 rounded-full w-15 min-w-15 text-center text-balance font-semibold">
                              {event.time}
                            </span>
                            <div className="flex flex-col items-start justify-start">
                              <strong className="text-base font-semibold text-balance text-left">
                                {event.title}
                              </strong>
                              {!!event.person && (
                                <p className="text-sm text-balance text-left">
                                  com {event.person}
                                </p>
                              )}
                            </div>
                          </button>
                        </DialogTrigger>

                        <DialogContent className="max-h-[calc(100%-2rem)] w-[560px] overflow-y-auto flex flex-col">
                          {event.image ? (
                            <Image
                              className="rounded-sm h-[200px] w-full object-contain bg-muted"
                              src={event.image}
                              alt={event.person}
                              width={200}
                              height={200}
                            />
                          ) : (
                            <div className="h-[160px] w-full rounded-sm bg-muted grid place-items-center">
                              <PresentationIcon className="size-10 text-muted-foreground" />
                            </div>
                          )}

                          <DialogHeader>
                            <DialogTitle className="text-2xl font-semibold text-balance">
                              {event.title}
                            </DialogTitle>

                            {!!event.person && (
                              <DialogDescription className="text-base text-balance">
                                com{" "}
                                <span className="font-semibold text-foreground">
                                  {event.person}
                                </span>
                              </DialogDescription>
                            )}
                          </DialogHeader>

                          <ul className="flex flex-row flex-wrap gap-2">
                            {!!event.category && (
                              <li>
                                <Badge variant="secondary">
                                  <PresentationIcon className="h-4 w-4" />
                                  {event.category}
                                </Badge>
                              </li>
                            )}

                            <li>
                              <Badge variant="secondary">
                                <ClockIcon className="h-4 w-4" />
                                {event.time}
                                {!!event.endTime && ` – ${event.endTime}`}
                              </Badge>
                            </li>

                            <li>
                              <Badge variant="secondary">
                                <MapPinIcon className="h-4 w-4 min-w-4" />
                                {event.local}
                              </Badge>
                            </li>
                          </ul>

                          {!!event.bio?.trim() && (
                            <div className="prose prose-neutral">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {event.bio}
                              </ReactMarkdown>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2">
                            {!!event.ig && (
                              <Button
                                asChild
                                variant="outline"
                                className="rounded-full"
                              >
                                <Link
                                  href={event.ig}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <InstagramLogoIcon />
                                  Ver no Instagram
                                </Link>
                              </Button>
                            )}

                            {!!event.link && (
                              <Button
                                asChild
                                variant="outline"
                                className="rounded-full"
                              >
                                <Link
                                  href={event.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ArrowSquareOutIcon />
                                  Acessar sala
                                </Link>
                              </Button>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <a
              href="/api/schedule.ics"
              download="programacao-congresso-uems.ics"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground/80 hover:text-primary transition-colors py-1 hover:underline"
            >
              Salvar programação na agenda
            </a>
          </motion.div>
        )}

        {appConfig.showLocation && (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            custom={7}
            className="w-full flex flex-col items-center gap-6 mt-8"
          >
            <LocationCard />
          </motion.div>
        )}

        {appConfig.showSponsors && <SponsorsBar />}

        <Footer />
      </div>
    </main>
  );
}
