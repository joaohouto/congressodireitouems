"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Ticket } from "@/components/icon/ticket";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { appConfig } from "@/config/app";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarUploadField } from "@/components/avatar-upload-field";
import { UserIcon, TicketIcon, WarningIcon } from "@phosphor-icons/react";
import { Spinner } from "@/components/luxe/spinner";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export function IngressoClient() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      toast.error("Informe o seu nome!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/ticket/create", {
        name: cleanName,
        avatar: avatar || undefined,
      });

      toast.success("Sucesso!", {
        description: response.data.message,
      });

      router.push(`/ingresso/${response.data.ticket.id}`);
    } catch (error: any) {
      toast.error("Erro!", {
        description:
          error?.response?.data?.message ||
          "Ocorreu um erro ao gerar seu ingresso.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-muted min-h-screen">
      <div className="max-w-[600px] mx-auto my-auto p-4 flex flex-col items-center">
        <header className="flex items-center py-12">
          <Link href="/">
            <Image
              width={300}
              height={200}
              src="/logo.svg"
              alt={appConfig.title}
            />
          </Link>
        </header>

        <Card className="w-full flex flex-col gap-0 sm:flex-row p-2 items-center rounded-lg mb-6">
          <div className="h-full flex-grow w-full md:w-[130px] bg-primary p-2 rounded-lg flex items-center justify-center">
            <Ticket className="h-[128px] w-[128px] transition-all duration-300 ease-in-out hover:scale-120 -rotate-12 hover:rotate-12" />
          </div>

          <div className="p-4 flex">
            <div className="flex flex-col">
              {!appConfig.allowGenerateTicket && (
                <Badge className="mb-2">
                  <WarningIcon className="size-3" />
                  ESGOTADOS
                </Badge>
              )}

              <span className="text-base font-semibold text-primary">
                Retire aqui o seu ingresso
              </span>
              <span className="text-balance text-sm">
                Personalize o seu ingresso oficial para o congresso com seu nome
                e foto
              </span>
            </div>
          </div>
        </Card>

        <Card className="w-full mx-auto my-auto rounded-lg">
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 pt-2">
              <AvatarUploadField
                value={avatar}
                onChange={setAvatar}
                disabled={loading || !appConfig.allowGenerateTicket}
              />

              <div className="flex flex-col gap-2 border-t border-muted-foreground/20 pt-4">
                <Label htmlFor="name">Seu nome</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.75 size-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Ex.: Ruy Barbosa"
                    autoCapitalize="words"
                    autoCorrect="off"
                    className="pl-8"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    <Spinner size="size-4" />
                    Gerando
                  </>
                ) : (
                  <>
                    <TicketIcon weight="bold" />
                    Retirar ingresso
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
