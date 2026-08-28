import { appConfig } from "@/config/app";
import { Button } from "./ui/button";
import { InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
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
            rel="noopener noreferrer"
          >
            <InstagramLogoIcon weight="bold" className="opacity-50" />@
            {appConfig.instagram}
          </a>
        </Button>
      </div>

      <Separator />

      <ul className="flex items-center justify-center gap-4 flex-wrap text-sm text-primary">
        <li>
          <Link href="/">Início</Link>
        </li>

        <li>
          <Link href="/editais">Editais</Link>
        </li>

        <li>
          <Link href="/encontro-cientifico">Encontro Científico</Link>
        </li>

        <li>
          <Link href="/galeria">Galeria</Link>
        </li>

        <li>
          <Link href="/ingresso">Ingresso</Link>
        </li>

        <li>
          <a
            href="https://github.com/joaohouto/congressodireitouems"
            target="_blank"
          >
            GitHub
          </a>
        </li>
      </ul>

      <div className="text-center text-xs text-muted-foreground text-balance">
        &copy; {new Date().getFullYear()} {appConfig.title}. Organizado com
        muito carinho por alunos e professores.
      </div>
    </footer>
  );
}
