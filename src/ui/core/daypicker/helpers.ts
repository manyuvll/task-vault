import { addDays, format } from "date-fns";

export const formatMonth = (
  date: Date,
  scrollPosition: number,
  pixelWidth: number,
) => format(addDays(date, scrollPosition / pixelWidth), "MMMM");
