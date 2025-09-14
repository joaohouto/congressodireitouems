import { database } from "@/lib/prisma";
import { StoryPreview } from "./client";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { XCircleIcon } from "lucide-react";

function Error({ id }: { id: string }) {
  return (
    <div className="bg-muted">
      <main className="h-full min-h-screen max-w-[500px] mx-auto my-auto p-8 flex flex-col items-center justify-center">
        <Card className={`p-8 rounded-lg mb-8`}>
          <div className="size-12 rounded-full bg-primary grid place-items-center">
            <XCircleIcon className="size-6 text-background" />
          </div>

          <CardTitle className="text-3xl font-semibold tracking-tight text-primary text-balance">
            Ingresso não encontrado.
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            O ingresso de ID{" "}
            <code className="text-primary bg-muted rounded p-1 px-2">{id}</code>
            não foi encontrado. Isso pode significar uma falha de conexão com o
            banco de dados ou que seu ingresso não foi registrado.
          </CardDescription>
        </Card>
      </main>
    </div>
  );
}

export default async function Ticket({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  function isValidObjectId(id: string) {
    // Verifica se a string tem 24 caracteres e é hexadecimal
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

  if (!isValidObjectId(id)) return <Error id={id} />;

  const ticketExists = await database.ticket.findFirst({
    where: {
      id,
    },
  });

  if (!ticketExists) return <Error id={id} />;

  return (
    <div className="bg-muted">
      <main className="h-full max-w-[500px] mx-auto my-auto p-8 flex flex-col items-center">
        <StoryPreview id={id} />
      </main>
    </div>
  );
}
