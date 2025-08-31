"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function AuthBanner() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground p-2 text-center text-sm">
      <div className="container mx-auto flex justify-between items-center">
        <p>Você está autenticado.</p>
        <Button variant="secondary" size="sm" asChild>
          <Link href="/gerencia">Acessar Gerência</Link>
        </Button>
      </div>
    </div>
  );
}
