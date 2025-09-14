import { appConfig } from "@/app/config";
import { Button } from "./ui/button";
import { RiInstagramLine } from "react-icons/ri";
import { Separator } from "./ui/separator";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-8 px-4 mt-6 bg-background rounded-xl flex flex-col gap-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <span>Siga-nos</span>

        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          asChild
        >
          <a
            href={`https://instagram.com/${appConfig.instagram}`}
            target="_blank"
          >
            <RiInstagramLine />@{appConfig.instagram}
          </a>
        </Button>
      </div>

      <Separator />

      <ul className="flex items-center justify-center gap-4 text-sm text-primary">
        <li>
          <Link href="/">Início</Link>
        </li>
        <li>
          <Link href="/ingresso">Ingresso</Link>
        </li>
        <li>
          <Link href="/editais">Editais</Link>
        </li>
        <li>
          <Link href="/patrocinadores">Patrocinadores</Link>
        </li>
      </ul>

      <div className="text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {appConfig.title}. Organizado com
        muito carinho por alunos e professores.
      </div>
    </footer>
  );
}
