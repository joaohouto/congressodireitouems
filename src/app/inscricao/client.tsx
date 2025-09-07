"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowUpRight,
  AtSign,
  CalendarCheck,
  FileCheck2,
  FileX2,
  HelpCircle,
  Info,
  Instagram,
  Loader,
  Loader2,
  Presentation,
  Send,
  Ticket,
  Upload,
  User,
  User2,
  UserCheck,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import axios from "axios";

import { toast } from "sonner";
import { appConfig, SUBSCRIPTION_CATEGORIES } from "../config";

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Informe o seu nome.",
    }),
    email: z.email("Informe um email válido."),
    category: z.string("Escolha uma opção."),

    custom_ticket: z.boolean().optional(),

    instagram: z.string({}).optional(),
    igName: z.string({}).optional(),
    igAvatar: z.string({}).optional(),
  })
  .refine(
    (data) => {
      if (data.custom_ticket) {
        return data.instagram !== undefined && data.instagram !== "";
      }
      return true;
    },
    {
      message: "Informe o seu usuário.",
      path: ["instagram"],
    }
  );

export function SignUpForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      email: "",
      custom_ticket: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const response = await axios.post("/api/subscription", {
        ...values,
      });

      toast.success("Inscrição realizada com sucesso! Por favor, aguarde.");

      router.push(`/ingresso/${response.data.id}`);
    } catch (err: any) {
      if (err.response.data.message === "Erro ao buscar dados do Instagram!") {
        form.setValue("instagram", "");
        form.setValue("custom_ticket", false);
      }

      toast.error(err.response.data.message || "Algo deu errado!");
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="w-full mx-auto my-auto rounded-lg">
        <CardHeader>
          <div className="h-12 w-12 rounded-full bg-primary grid place-items-center mb-2">
            <UserCheck className="h-6 w-6 text-background" />
          </div>

          <CardTitle className="text-3xl font-semibold tracking-tight mb-2 text-primary">
            Inscrições
          </CardTitle>
          <CardDescription className="text-base  text-balance">
            Preencha o formulário abaixo para se inscrever no {appConfig.title}.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Separator />

              <h2 className="text-xl select-none font-semibold text-primary flex items-center">
                <User className="h-4 w-4 min-w-4 mr-2" />
                Suas informações
              </h2>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="João da Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Iremos usar essa informação para gerar o seu certificado.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@exemplo.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione uma opção" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SUBSCRIPTION_CATEGORIES.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="custom_ticket"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        <Ticket className="text-primary size-6" />
                        Gerar ingresso personalizado
                      </FormLabel>
                      <FormDescription>
                        Use a sua foto e o seu nome públicos do Instagram
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.watch("custom_ticket") && (
                <Card className="p-4 bg-muted rounded-lg">
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Seu nome de usuário do Instagram</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <AtSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="direitoaquidauana"
                              autoCapitalize="off"
                              autoCorrect="off"
                              className="pl-8"
                              {...field}
                            />
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>
              )}

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    Enviando
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Enviar
                    <Send />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
