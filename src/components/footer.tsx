import { appConfig } from "@/app/config";
import { Button } from "./ui/button";
import { RiInstagramLine } from "react-icons/ri";

export function Footer() {
  return (
    <footer className="w-full py-8 px-4 mt-6 bg-background rounded-xl">
      <div className="flex items-center justify-center gap-4">
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

      <div className="mt-8 text-center text-xs text-muted-foreground border-t  pt-4">
        &copy; {new Date().getFullYear()} {appConfig.title}. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
