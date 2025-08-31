"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function GerenciaHeader() {
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Inscrições</h1>
      <Button variant="outline" onClick={() => signOut()}>
        Sair
      </Button>
    </header>
  );
}
