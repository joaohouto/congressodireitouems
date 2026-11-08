"use client";

import { useEffect, useRef, useState } from "react";
import {
  CornersOutIcon,
  FilmStripIcon,
  SpeakerHighIcon,
  XIcon,
} from "@phosphor-icons/react";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { appConfig } from "@/config/app";

interface VideoCardProps {
  videoUrl?: string;
  title?: string;
  description?: string;
}

export function VideoCard({
  videoUrl = appConfig.videoUrl,
  title = appConfig.videoTitle,
  description = appConfig.videoDescription,
}: VideoCardProps) {
  const [open, setOpen] = useState(false);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const previewVideo = previewVideoRef.current;
    if (!previewVideo) return;

    if (open) {
      previewVideo.pause();
    } else {
      previewVideo.play().catch(() => {
        // Ignora bloqueio de autoplay caso ocorra
      });
    }
  }, [open]);

  if (!videoUrl) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className="w-full overflow-hidden p-0 gap-0">
        <DialogTrigger asChild>
          <button
            type="button"
            className="relative block w-full h-[220px] sm:h-[260px] group text-left cursor-pointer focus:outline-hidden"
            aria-label={`${title} - Clique para assistir maximizado e com som`}
          >
            <video
              ref={previewVideoRef}
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

            <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-3">
              <div className="flex items-start gap-2 text-white min-w-0">
                <FilmStripIcon
                  weight="fill"
                  className="size-5 min-w-5 mt-0.5 text-white/90"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold leading-tight text-balance">
                    {title}
                  </span>
                  {!!description && (
                    <span className="text-xs text-white/80 leading-tight text-balance">
                      {description}
                    </span>
                  )}
                </div>
              </div>

              <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-white/90 bg-white/15 backdrop-blur-sm rounded-full py-1.5 px-3 group-hover:bg-white/25 transition-colors">
                <SpeakerHighIcon className="size-3.5" weight="fill" />
                Assistir
                <CornersOutIcon className="size-3.5" weight="bold" />
              </span>
            </div>
          </button>
        </DialogTrigger>
      </Card>

      <DialogContent
        showCloseButton={false}
        className="max-w-5xl sm:max-w-5xl w-[calc(100%-1.5rem)] p-0 overflow-hidden bg-black border-white/15 shadow-2xl gap-0"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">
          {description || title}
        </DialogDescription>

        <div className="relative w-full aspect-video bg-black flex items-center justify-center">
          <DialogClose
            className="absolute top-3 right-3 z-10 inline-flex items-center justify-center size-9 rounded-full bg-black/60 text-white/90 hover:bg-black/80 hover:text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer focus:outline-hidden"
            aria-label="Fechar vídeo"
          >
            <XIcon className="size-5" weight="bold" />
          </DialogClose>

          {open && (
            <video
              src={videoUrl}
              autoPlay
              controls
              playsInline
              className="w-full h-full max-h-[85vh] object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
