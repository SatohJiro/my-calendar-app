import { format, toZonedTime } from "date-fns-tz";

export const formatEventTime = (start, end, timezone) => {
  const startZoned = toZonedTime(start, timezone);
  const endZoned = toZonedTime(end, timezone);

  const startTime = format(startZoned, "hh:mm a", { timeZone: timezone });
  const endTime = format(endZoned, "hh:mm a", { timeZone: timezone });

  const timezoneOffset = format(startZoned, "XXX", { timeZone: timezone });

  return `${startTime} - ${endTime} GMT${timezoneOffset}`;
};
