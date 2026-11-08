"use client";

import { useId } from "react";
import { HandsClappingIcon } from "@phosphor-icons/react";
import { useReward } from "react-rewards";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/config/app";

interface ThankYouCardProps {
  title?: string;
  description?: string;
}

const CLAP_EMOJIS = ["👏", "👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿"];

export function ThankYouCard({
  title = appConfig.thankYouTitle,
  description = appConfig.thankYouDescription,
}: ThankYouCardProps) {
  const reactId = useId();
  const rewardId = `thank-you-reward-${reactId.replace(/:/g, "")}`;

  const { reward } = useReward(rewardId, "emoji", {
    emoji: CLAP_EMOJIS,
    elementCount: 28,
    elementSize: 26,
    spread: 95,
    startVelocity: 32,
    lifetime: 180,
    position: "absolute",
    zIndex: 50,
  });

  return (
    <Card className="w-full relative overflow-visible text-center items-center py-6 px-6 gap-4">
      <CardHeader className="w-full flex flex-col items-center gap-3 p-0">
        <div className="size-12 rounded-full bg-primary/10 text-primary grid place-items-center">
          <HandsClappingIcon weight="fill" className="size-6" />
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight text-primary text-balance">
          {title}
        </CardTitle>
        {!!description && (
          <CardDescription className="text-sm text-muted-foreground max-w-[480px] text-balance leading-relaxed">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="p-0 pt-1 flex flex-col items-center">
        <Button
          type="button"
          onClick={reward}
          className="relative rounded-full px-6 h-11 font-semibold gap-2 cursor-pointer select-none active:scale-95 transition-transform"
        >
          <HandsClappingIcon weight="fill" className="size-5" />
          Obrigado!
          <span
            id={rewardId}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </Button>
      </CardContent>
    </Card>
  );
}
