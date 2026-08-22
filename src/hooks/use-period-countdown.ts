import { useState, useEffect } from "react";
import { getPeriodStatus, PeriodStatus } from "@/lib/period";

export interface PeriodCountdown {
  status: PeriodStatus;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formattedCountdown: string;
  isMounted: boolean;
}

function calculateCountdown(startDate?: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  formatted: string;
} {
  if (!startDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, formatted: "" };
  }

  const target = new Date(startDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  let formatted = "";
  if (days > 0) {
    formatted = `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  } else if (hours > 0) {
    formatted = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  } else {
    formatted = `${pad(minutes)}m ${pad(seconds)}s`;
  }

  return { days, hours, minutes, seconds, totalSeconds, formatted };
}

export function usePeriodCountdown(
  start?: string,
  end?: string
): PeriodCountdown {
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState<PeriodStatus>(() => getPeriodStatus(start, end));
  const [countdown, setCountdown] = useState(() => calculateCountdown(start));

  useEffect(() => {
    setIsMounted(true);

    const update = () => {
      const currentStatus = getPeriodStatus(start, end);
      setStatus(currentStatus);

      if (currentStatus === "upcoming") {
        const cd = calculateCountdown(start);
        setCountdown(cd);
        if (cd.totalSeconds <= 0) {
          setStatus(getPeriodStatus(start, end));
        }
      }
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [start, end]);

  return {
    status,
    days: countdown.days,
    hours: countdown.hours,
    minutes: countdown.minutes,
    seconds: countdown.seconds,
    formattedCountdown: countdown.formatted,
    isMounted,
  };
}
