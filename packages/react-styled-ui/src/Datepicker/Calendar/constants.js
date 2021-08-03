export const MONTH = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'Angust',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

export const DAY = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const FEB_OF_LEAP_YEAR = 29;

export const DEFAULT_WEEK_ROW = 5;

export const THEME_MODE = {
  DARK: 'dark',
  LIGHT: 'light',
}

export const DAY_BACKGROUND_COLOR = {
  [THEME_MODE.DARK]: {
    DEFAULT: 'gray:90',
    HOVERED: 'gray:80',
    SELECTED: 'blue:60',
  },
  [THEME_MODE.LIGHT]: {
    DEFAULT: 'none',
    HOVERED: 'gray:20',
    SELECTED: 'blue:60',
  },
};

export const DAY_FONT_COLOR = {
  [THEME_MODE.DARK]: {
    [false]: 'white:primary',
    [true]: 'white:primary',
  },
  [THEME_MODE.LIGHT]: {
    [false]: 'black:tertiary',
    [true]: 'white:primary',
  }
};

export const WEEK_CONFIG = {
  templateColumns: 'repeat(7, 40px)',
  templateRows: 'auto',
};