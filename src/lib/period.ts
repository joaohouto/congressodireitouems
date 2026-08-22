export type PeriodStatus = "upcoming" | "open" | "closed";

// Dates are optional so a period without a start/end just stays "open",
// matching the previous behavior before periods existed.
export function getPeriodStatus(start?: string, end?: string): PeriodStatus {
  const now = new Date();

  if (start && now < new Date(start)) return "upcoming";
  if (end && now > new Date(end)) return "closed";

  return "open";
}
