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
