"use client";

import { EVENT_SCHEDULE } from "@/config/app";
import { useEffect, useState } from "react";

export function LiveEvent() {
  const [currentEvent, setCurrentEvent] = useState<any | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let eventFound = false;

      for (const day of EVENT_SCHEDULE) {
        for (const event of day.events) {
          const eventDate = new Date(day.date);
          const [hours, minutes] = event.time.split(":").map(Number);
          eventDate.setHours(hours, minutes, 0, 0);

          const endTime = event.endTime ? new Date(eventDate.getTime()) : null;
          if (endTime && event.endTime) {
            const [endHours, endMinutes] = event.endTime.split(":").map(Number);
            endTime.setHours(endHours, endMinutes, 0, 0);
          }

          if (endTime && now >= eventDate && now <= endTime) {
            setCurrentEvent(event);
            eventFound = true;
            break;
          }
        }
        if (eventFound) break;
      }

      if (!eventFound) {
        setCurrentEvent(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!currentEvent) {
    return null;
  }

  return (
    <div>
      <div className="flex items-start gap-4">
        <span className="text-sm bg-primary text-primary-foreground py-1 px-2 rounded-full w-15 min-w-15 text-center text-balance font-semibold">
          {currentEvent.time}
        </span>

        <div className="flex flex-col items-start justify-start">
          <strong className="text-base font-semibold text-balance text-left">
            {currentEvent.title}
          </strong>
          {!!currentEvent.person && (
            <p className="text-sm text-balance text-left">
              com {currentEvent.person}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
