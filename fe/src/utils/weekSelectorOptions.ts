import { parseWeekAnchor, startOfIsoWeekMonday } from "@/utils/weekPeriodFormat";

function formatDate(date: Date, includeYear = false) {
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  if (includeYear) {
    const y = date.getFullYear().toString().slice(-2);
    return `${d}.${m}.${y}`;
  }
  return `${d}.${m}`;
}

export type WeekOption = { value: string; label: string; monday: number };

export function getWeekRangesFrom(startDate: string): WeekOption[] {
  const result: WeekOption[] = [];
  const currentYear = new Date().getFullYear();
  const today = new Date();
  let start = new Date(startDate);
  let day = start.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diffToMonday);
  start.setHours(0, 0, 0, 0);
  while (start <= today) {
    const end = new Date(start);
    end.setDate(end.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();
    const includeYear = startYear !== currentYear || endYear !== currentYear;
    const formattedStart = formatDate(start, includeYear);
    const formattedEnd = formatDate(end, includeYear);
    const week = `${formattedStart} - ${formattedEnd}`;
    result.push({
      value: formattedStart,
      label: week,
      monday: new Date(start).getTime(),
    });
    start.setDate(start.getDate() + 7);
  }
  return result;
}

export function buildWeekSelectOptions(startDate: string) {
  const weekOptions = getWeekRangesFrom(startDate).reverse();
  const selectOptions = weekOptions.map(({ value, label }) => ({ value, label }));
  return { weekOptions, selectOptions };
}

export function resolveSelectedWeekValue(
  weekOptions: WeekOption[],
  searchStart: string | null,
): string {
  const fallback = weekOptions[0]?.value ?? "";
  if (!searchStart?.trim()) return fallback;
  const targetMonday = startOfIsoWeekMonday(parseWeekAnchor(searchStart)).getTime();
  const found = weekOptions.find((w) => w.monday === targetMonday);
  return found?.value ?? fallback;
}
