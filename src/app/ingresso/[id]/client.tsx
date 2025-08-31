"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Download, InfoIcon, Loader2, TicketIcon } from "lucide-react";

import { useReward } from "react-rewards";
import { useState } from "react";
import { RiInstagramLine } from "react-icons/ri";
import { appConfig } from "@/app/config";
import { toast } from "sonner";

export const StoryPreview = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);

  const { reward } = useReward("rewardId", "confetti", {
    spread: 100,
    elementCount: 250,
    lifetime: 400,
    zIndex: 999,
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const blob = await fetch(`/api/ticket?id=${id}`).then((r) => r.blob());

        const data = {
          files: [
            new File([blob], "ingresso.png", {
              type: blob.type,
            }),
          ],
        };

        await navigator.share(data);
      } catch (error) {
        toast.error("Erro ao compartilhar o ingresso!");
      }
    } else {
      toast.error("Compartilhamento não suportado neste navegador!");
    }
  };

  return (
    <>
      {loading ? (
        <Card className={`p-8 rounded-lg mb-8`}>
          <div className="h-12 w-12 rounded-full bg-primary grid place-items-center">
            <Loader2 className="size-6 text-background animate-spin" />
          </div>

          <CardTitle className="text-3xl font-semibold tracking-tight mb-2 text-primary text-balance">
            Estamos processando o seu ingresso.
          </CardTitle>
        </Card>
      ) : (
        <Card className={`p-8 rounded-lg mb-8`}>
          <div className="size-12 rounded-full bg-primary grid place-items-center">
            <TicketIcon className="size-6 text-background" />
          </div>

          <CardTitle className="text-3xl font-semibold tracking-tight text-primary text-balance">
            Aqui está o seu ingresso!
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Você já está inscrito no evento,{" "}
            <b>enviamos um email com a confirmação</b>. Fique a vontade para
            compartilhar a sua inscrição e marcar:{" "}
            <a
              className="text-primary font-semibold"
              href={`https://www.instagram.com/${appConfig.instagram}`}
            >
              @{appConfig.instagram}
            </a>
            .
          </CardDescription>
        </Card>
      )}

      <span
        id="rewardId"
        style={{
          pointerEvents: "none",
        }}
      />

      <Card className="rounded-lg w-full p-0">
        <CardContent className="p-0 relative">
          <div className="relative aspect-[9/16] w-full">
            <Image
              src={`/api/ticket?id=${id}`}
              alt="Instagram story"
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAASAAoDAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAABQcICf/EACQQAAIBBAICAQUAAAAAAAAAAAECAwQFBhEAIQcSgQgTMUGR/8QAGAEBAAMBAAAAAAAAAAAAAAAABQECBgP/xAAgEQACAgAHAQEAAAAAAAAAAAABAgADBRETIUFRcSMz/9oADAMBAAIRAxEAPwB8YL9G2D5ThmN5CK+/PUXe10tbVBLjToInljVmCxmItoe3Wz88Nrw6l0DMTmYUmHo6ht9x3JuzK0UuL5ffMZp5p5IrRcqqhR5SPdlilZAW0Nb0veuF2UBXKjgw6ygK5UcGX54ey3DqXxVhNDecgio69LBbTLEn3SdinjPTAdbBHzzRUj5r5NFT+a+TP/yzPXzeVMylWGkcPkFxYMHcgg1MnY2N/wB4PaG1G9MGtB1G9MQL5FkEDtBBfbjHHGSqIlU4VQPwAAeuQGPcnMw/A7ywxyyuzu6hmZjssSOyT+zyk5z/2Q=="
              className="rounded-lg object-cover"
              onError={() => toast.error("Erro ao carregar imagem!")}
              onLoad={() => {
                setLoading(false);
                reward();
              }}
            />
          </div>

          {!loading && (
            <div className="absolute top-0 w-full p-4 flex flex-row justify-between items-center gap-2">
              <Button asChild variant="outline">
                <a href={`/api/ticket?id=${id}`} download>
                  <Download /> Salvar imagem
                </a>
              </Button>

              <Button variant="outline" onClick={handleShare}>
                <RiInstagramLine /> Compartilhar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
