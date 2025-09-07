import { database } from "@/lib/prisma";
import { StoryPreview } from "./client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { XCircleIcon, XIcon } from "lucide-react";

export default async function Ticket({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const subscriptionExists = await database.subscription.findFirst({
    where: {
      id,
    },
  });

  if (!subscriptionExists) {
    return (
      <div className="bg-muted">
        <main className="h-full min-h-screen max-w-[500px] mx-auto my-auto p-8 flex flex-col items-center justify-center">
          <Card className={`p-8 rounded-lg mb-8`}>
            <div className="size-12 rounded-full bg-primary grid place-items-center">
              <XCircleIcon className="size-6 text-background" />
            </div>

            <CardTitle className="text-3xl font-semibold tracking-tight text-primary text-balance">
              Inscrição não encontrada.
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              A inscrição de ID{" "}
              <code className="text-primary bg-muted rounded p-1 px-2">
                {id}
              </code>
              não foi encontrada. Isso pode significar uma falha de conexão com
              o banco de dados ou que sua inscrição não foi regristrada.
            </CardDescription>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-muted">
      <main className="h-full max-w-[500px] mx-auto my-auto p-8 flex flex-col items-center">
        <StoryPreview id={id} />
      </main>
    </div>
  );
}
