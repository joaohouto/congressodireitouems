import { NextResponse } from "next/server";
import { appConfig, EVENT_SCHEDULE } from "@/config/app";

function escapeICS(text: string): string {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function toICSDateTime(dateStr: string, timeStr: string): string {
  try {
    const [year, month, day] = dateStr.split("T")[0].split("-");
    const [hour, minute] = timeStr.split(":");
    return `${year}${month}${day}T${hour || "00"}${minute || "00"}00`;
  } catch {
    return "";
  }
}

export async function GET() {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//UEMS//${escapeICS(appConfig.shortTitle)}//PT`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeICS(appConfig.title)}`,
    "X-WR-TIMEZONE:America/Campo_Grande",
  ];

  const nowStamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  for (const day of EVENT_SCHEDULE) {
    for (const event of day.events) {
      const dtStart = toICSDateTime(day.date, event.time);
      const dtEnd = event.endTime
        ? toICSDateTime(day.date, event.endTime)
        : dtStart;

      if (!dtStart) continue;

      const uid = `event-${day.date.split("T")[0]}-${event.time.replace(":", "")}-${Math.abs(
        event.title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      )}@congressojuridico.uems.br`;

      const description = [
        event.person ? `Com: ${event.person}` : "",
        event.category ? `Categoria: ${event.category}` : "",
        event.bio ? `\n${event.bio.replace(/\*\*/g, "").replace(/<br\s*\/?>/g, "\n")}` : "",
        event.link ? `\nLink da sala: ${event.link}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      lines.push("BEGIN:VEVENT");
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${nowStamp}`);
      lines.push(`DTSTART:${dtStart}`);
      if (dtEnd) {
        lines.push(`DTEND:${dtEnd}`);
      }
      lines.push(`SUMMARY:${escapeICS(event.title)}`);
      if (description) {
        lines.push(`DESCRIPTION:${escapeICS(description)}`);
      }
      if (event.local) {
        lines.push(`LOCATION:${escapeICS(event.local)}`);
      }
      lines.push("STATUS:CONFIRMED");
      lines.push("END:VEVENT");
    }
  }

  lines.push("END:VCALENDAR");

  const icsContent = lines.join("\r\n");

  return new NextResponse(icsContent, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="programacao-congresso-uems.ics"',
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
