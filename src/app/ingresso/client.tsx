"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { TicketIcon } from "@/components/icon/ticket";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { appConfig } from "@/config/app";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { AtSign, Loader2, Send, TriangleAlert, XIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SponsorsBar } from "@/components/sponsors-bar";
import { Badge } from "@/components/ui/badge";

export function IngressoClient() {
  const [instagram, setInstagram] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/ticket/create", {
        instagram,
      });

      toast.success("Sucesso!", {
        description:
          "Seu ingresso foi gerado com sucesso. Já vamos te redirecionar para ele!",
      });

      router.push(`/ingresso/${response.data.ticket.id}`);
    } catch (error: any) {
      toast.error("Erro!", {
        description:
          error.response.data.message ||
          "Ocorreu um erro ao gerar seu ingresso.",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted">
      <div className="max-w-[600px] mx-auto my-auto p-4 flex flex-col items-center">
        <header className="flex items-center py-12">
          <Link href="/">
            <Image
              width={300}
              height={200}
              layout="contain"
              src="/logo.svg"
              alt={appConfig.title}
            />
          </Link>
        </header>

        <Card className="w-full flex flex-col gap-0 sm:flex-row p-2 items-center rounded-lg mb-6">
          <div className="h-full flex-grow w-full md:w-[130px] bg-muted p-2 rounded-lg flex items-center justify-center">
            <TicketIcon className="h-[128px] w-[128px] transition-all duration-300 ease-in-out hover:scale-110 -rotate-12 hover:rotate-12" />
          </div>

          <div className="p-4 flex">
            <div className="flex flex-col">
              {!appConfig.allowGenerateTicket && (
                <Badge className="mb-2">
                  <TriangleAlert className="size-3" />
                  ESGOTADOS
                </Badge>
              )}

              <span className="text-base font-semibold text-primary">
                Retire aqui o seu ingresso
              </span>
              <span className="text-balance text-sm">
                Use a sua foto e o seu nome públicos da sua conta do Instagram
              </span>
            </div>
          </div>
        </Card>

        <Card className="w-full mx-auto my-auto rounded-lg">
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label>Seu nome de usuário do Instagram</Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-2.75 size-3.5 text-muted-foreground" />
                  <Input
                    placeholder="congressodireitouems"
                    autoCapitalize="off"
                    autoCorrect="off"
                    className="pl-8"
                    id="instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    disabled={!appConfig.allowGenerateTicket}
                    required
                  />
                </div>
              </div>

              <Button
                className="w-full"
                type="submit"
                disabled={loading || !appConfig.allowGenerateTicket}
              >
                {loading ? (
                  <>
                    Gerando
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Gerar ingresso
                    <Send />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Footer />
      </div>
    </div>
  );
}
