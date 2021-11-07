import {
  FEB_OF_LEAP_YEAR,
  MONTH_DAYS,
} from './Calendar/constants';
import { SEPARATOR } from './constants';

export const convertToDateObj = (data) => {
  if (typeof data === 'string') {
    // We didn't use date strings to create a Date object due to browser differences and inconsistencies
    return new Date(...data.split(SEPARATOR).map((val, index) => (index === 1 ? +val - 1 : +val)));
  }
  if (typeof data === 'number') {
    return new Date(data);
  }
  return data;
};

export const dateToAry = (rawDate) => {
  let newDate = convertToDateObj(rawDate);
  if (!(newDate instanceof Date)) {
    return [];
  }
  const [month, date, year] = newDate.toLocaleDateString('en-US').split('/');
  return [+year, +month, +date];
};

export const dateToStrAry = (rawDate) => {
  return dateToAry(rawDate).map((item) => (item < 10 ? `0${item}` : `${item}`));
};

export const dateToObj = (rawDate) => {
  const [year, month, date] = dateToAry(rawDate);
  return { year, month, date };
};

export const dateToStr = (rawDate) => {
  return dateToStrAry(rawDate).join('-');
};

export const isValidDate = (dateStr) => !!new Date(dateStr).toJSON();

export const getTimestamp = (date) => {
  const dateObj = convertToDateObj(date);
  return dateObj.getTime();
};

export const isLeapYear = (checkYear) => new Date(checkYear, 1, FEB_OF_LEAP_YEAR).getDate() === FEB_OF_LEAP_YEAR;

export const getMonthDays = (year, month) => (isLeapYear(year) && month === 2
  ? FEB_OF_LEAP_YEAR
  : MONTH_DAYS[month - 1]);

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
  if (typeof document === 'undefined') {
    return 0;
  }
  // if given, use cached canvas for better performance
  // else, create new canvas
  let canvas = getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas')) || null;
  let context = canvas.getContext('2d');
  context.font = font;
  let metrics = context.measureText(text);
  return metrics.width;
};
