const pad2 = (n: number) => String(n).padStart(2, "0");

/** Backend week strings use `dd.MM.yy` (`DateRangeParserService`). */
export function formatDdMmYy(date: Date): string {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear() % 100;
  return `${pad2(d)}.${pad2(m)}.${pad2(y)}`;
}

/** Monday–Sunday (matches Java `DayOfWeek.MONDAY` / `SUNDAY`). */
export function startOfIsoWeekMonday(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diffFromMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffFromMonday);
  return d;
}

export function endOfIsoWeekSunday(monday: Date): Date {
  const d = new Date(monday);
  d.setDate(d.getDate() + 6);
  return d;
}

/** `dd.MM.yy - dd.MM.yy` for `WorkoutsPeriod.startOfPeriod` when `timePeriod` is `WEEK`. */
export function formatWeekPeriodRange(anchorInWeek: Date): string {
  const monday = startOfIsoWeekMonday(anchorInWeek);
  const sunday = endOfIsoWeekSunday(monday);
  return `${formatDdMmYy(monday)} - ${formatDdMmYy(sunday)}`;
}

export function dateFromDdMmY(match: string): Date {
  const parts = match.split(".");
  if (parts.length === 3) {
    const [day, month, year] = parts.map(Number);
    return new Date(2000 + year, month - 1, day);
  }
  if (parts.length === 2) {
    const [day, month] = parts.map(Number);
    const year = new Date().getFullYear();
    return new Date(year, month - 1, day);
  }
  return new Date();
}

export function parseWeekAnchor(startParam: string | null): Date {
  if (!startParam) return new Date();
  const trimmed = startParam.trim();
  const m = trimmed.match(/^\d{1,2}\.\d{1,2}(\.\d{2})?/);
  if (m) {
    return dateFromDdMmY(m[0]);
  }
  return new Date(trimmed);
}
