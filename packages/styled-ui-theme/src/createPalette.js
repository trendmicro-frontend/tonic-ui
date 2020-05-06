import { colors } from './base';

export const light = {
  text: {
    emphasis: colors['black:emphasis'],
    primary: colors['black:primary'],
    secondary: colors['black:secondary'],
    tertiary: colors['black:tertiary'],
    disabled: colors['black:disabled'],
    link: colors['blue:60'],
    Error: colors['red:60'],
    warning: colors['orange:50']
  },
  functional: {
    risk: {
      high: colors['red:60'],
      medium: colors['orange:50'],
      low: colors['yellow:50'],
      safe: colors['green:50'],
      information: colors['blue:60'],
      unknown: colors['gray:40'],
    }
  },
  chart: {
    1: colors['blue:60'],
    2: colors['green:50'],
    3: colors['orange:50'],
    4: colors['cyan:40'],
    5: colors['red:60'],
    6: colors['purple:60'],
    7: colors['teal:40'],
    8: colors['magenta:50'],
    9: colors['green:30'],
    10: colors['yellow:50'],
    11: colors['gray:40'],
  }
};

export const dark = {
  text: {
    emphasis: colors['white:emphasis'],
    primary: colors['white:primary'],
    secondary: colors['white:secondary'],
    tertiary: colors['white:tertiary'],
    disabled: colors['white:disabled'],
    link: colors['blue:40'],
    Error: colors['red:50'],
    warning: colors['orange:50']
  },
  functional: {
    risk: {
      high: colors['red:50'],
      medium: colors['orange:50'],
      low: colors['yellow:50'],
      safe: colors['green:40'],
      information: colors['blue:50'],
      unknown: colors['gray:50'],
    }
  },
  chart: {
    1: colors['blue:50'],
    2: colors['green:40'],
    3: colors['orange:50'],
    4: colors['cyan:40'],
    5: colors['red:50'],
    6: colors['purple:50'],
    7: colors['teal:40'],
    8: colors['magenta:40'],
    9: colors['green:30'],
    10: colors['yellow:50'],
    11: colors['gray:50'],
  }
};
