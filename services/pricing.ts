import { differenceInCalendarDays, eachDayOfInterval, isWeekend } from "date-fns";

const FESTIVAL_DATES = ["2026-04-02", "2026-08-29", "2026-11-03"];

export function calculateRoomPrice({
  baseRate,
  checkin,
  checkout
}: {
  baseRate: number;
  checkin: string;
  checkout: string;
}) {
  const nights = Math.max(differenceInCalendarDays(new Date(checkout), new Date(checkin)), 1);
  const days = eachDayOfInterval({
    start: new Date(checkin),
    end: new Date(new Date(checkout).getTime() - 24 * 60 * 60 * 1000)
  });

  const total = days.reduce((sum, day) => {
    const iso = day.toISOString().slice(0, 10);
    if (FESTIVAL_DATES.includes(iso)) return sum + baseRate * 1.35;
    if (isWeekend(day)) return sum + baseRate * 1.15;
    return sum + baseRate;
  }, 0);

  return {
    nights,
    total
  };
}

export function calculateEventPrice({
  baseRate,
  bookingType
}: {
  baseRate: number;
  bookingType: "hourly_event" | "full_day_event" | "wedding_package";
}) {
  if (bookingType === "hourly_event") return Math.round(baseRate / 4);
  if (bookingType === "wedding_package") return Math.round(baseRate * 2.8);
  return baseRate;
}
