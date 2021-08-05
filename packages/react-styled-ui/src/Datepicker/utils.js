import {
  FEB_OF_LEAP_YEAR,
  MONTH_DAYS,
} from './Calendar/constants';

export const dateToAry = (rawDate) => {
  const newDate = new Date(rawDate);
  const [month, date, year] = newDate.toLocaleDateString('en-US').split('/');
  return [+year, +month, +date];
};

export const dateToObj = (rawDate) => {
  const [year, month, date] = dateToAry(rawDate);
  return { year, month, date };
};

export const dateToStr = (rawDate, full = false) => {
  const newDate = dateToAry(rawDate);
  return newDate
    .map((item) => (full && item < 10 ? `0${item}` : item))
    .join("-");
};

export const isValidDate = (dateStr) => !!new Date(dateStr).toJSON();

export const isLeapYear = (checkYear) =>
  new Date(checkYear, 1, FEB_OF_LEAP_YEAR).getDate() === FEB_OF_LEAP_YEAR;

export const getMonthDays = (year, month) =>
  isLeapYear(year) && month === 2
    ? FEB_OF_LEAP_YEAR
    : MONTH_DAYS[month - 1];

export const getPrevMonthLastDate = (curDate) => {
  curDate.setDate(0);
  return curDate;
};

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. '14px verdana').
 *
 * @see http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
 export const getTextWidth = (text, font) => {
  if (typeof document === 'undefined') return 0;
  // if given, use cached canvas for better performance
  // else, create new canvas
  var canvas = getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas')) || null;
  var context = canvas.getContext('2d');
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}
