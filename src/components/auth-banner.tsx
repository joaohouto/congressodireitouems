"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

import { signOut } from "next-auth/react";
import { LogOut, Info } from "lucide-react";

export default function AuthBanner() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="bg-primary text-primary-foreground p-2 text-center text-sm">
      <div className="container mx-auto flex justify-between items-center">
        <p className="flex gap-2 items-center">
          <Info className="size-4" />
          Você está autenticado.
        </p>

        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/gerencia">Gerência</Link>
          </Button>

          <Button variant="outline" size="icon" onClick={() => signOut()}>
            <LogOut />
          </Button>
        </div>
      </div>
    </div>
  );
}
