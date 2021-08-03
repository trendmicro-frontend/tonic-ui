import {
  FEB_OF_LEAP_YEAR,
  MONTH_DAYS,
} from './constants';

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
