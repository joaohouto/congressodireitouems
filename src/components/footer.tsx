import { appConfig } from "@/app/config";
import { Button } from "./ui/button";
import { RiInstagramLine } from "react-icons/ri";

export function Footer() {
  return (
    <footer className="w-full p-4 mt-6 flex justify-center items-center">
      <span></span>

      <Button type="button" variant="outline" className="rounded-full" asChild>
        <a href={`https://instagram.com/${appConfig.instagram}`}>
          <RiInstagramLine className="size-4" />@{appConfig.instagram}
        </a>
      </Button>
    </footer>
  );
}
