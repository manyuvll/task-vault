import { addDays, format, subDays } from "date-fns";

const DAY_PICKER_RANGE = 30;

export const formatMonth = (
  date: Date,
  scrollPosition: number,
  pixelWidth: number,
) => format(addDays(date, scrollPosition / pixelWidth), "MMMM");

export const getFirstDayInRange = (range: number = DAY_PICKER_RANGE) =>
  subDays(new Date(), range / 2);

export const generateDayPickerRange = (range: number = DAY_PICKER_RANGE) => {
  let current = getFirstDayInRange(range);
  const _dates = [];
  // we add days until we reach the end date we set
  // improvement is to dynamically load next and previous
  // page by page for dynamic and better performances
  for (let i = 1; i <= range; i++) {
    _dates.push(current);
    current = addDays(current, 1);
  }
  return _dates;
};
