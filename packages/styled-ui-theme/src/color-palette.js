import _get from 'lodash.get';
import colors from './foundations/colors';

export const light = {
  background: {
    1: colors['white:emphasis'],
    2: colors['gray:10'],
    3: colors['gray:20'],
    inverse: colors['gray:70'],
    selected: colors['blue:60'],
    marked: '#fce79e',
  },
  text: {
    emphasis: colors['black:emphasis'],
    primary: colors['black:primary'],
    secondary: colors['black:secondary'],
    tertiary: colors['black:tertiary'],
    disabled: colors['black:disabled'],
    link: colors['blue:60'],
    error: colors['red:60'],
    warning: colors['orange:50']
  },
  risk: {
    critical: colors['magenta:60'],
    high: colors['red:60'],
    medium: colors['orange:50'],
    low: colors['yellow:50'],
    safe: colors['green:50'],
    information: colors['blue:60'],
    unknown: colors['gray:50'],
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
    other: colors['gray:50'],
  }
};

export const dark = {
  background: {
    1: colors['gray:100'],
    2: colors['gray:90'],
    3: colors['gray:80'],
    inverse: colors['gray:10'],
    selected: colors['blue:60'],
    marked: '#fce79e',
  },
  text: {
    emphasis: colors['white:emphasis'],
    primary: colors['white:primary'],
    secondary: colors['white:secondary'],
    tertiary: colors['white:tertiary'],
    disabled: colors['white:disabled'],
    link: colors['blue:40'],
    error: colors['red:50'],
    warning: colors['orange:50']
  },
  risk: {
    critical: colors['magenta:60'],
    high: colors['red:50'],
    medium: colors['orange:50'],
    low: colors['yellow:50'],
    safe: colors['green:40'],
    information: colors['blue:50'],
    unknown: colors['gray:50'],
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
    other: colors['gray:50'],
  }
};
export const blindnessColor = {
  blindness: {
    risk: {
      high: colors['magenta:60'],
      medium: colors['orange:50'],
      low: colors['yellow:50'],
      safe: colors['green:30'],
      information: colors['blue:30'],
      unknown: colors['gray:50'],
    },
    chart: {
      1: colors['blue:30'],
      2: colors['green:30'],
      3: colors['orange:50'],
      4: colors['cyan:30'],
      5: colors['magenta:60'],
      6: colors['purple:50'],
      7: colors['teal:40'],
      8: colors['purple:30'],
      9: colors['cyan:70'],
      10: colors['yellow:50'],
      other: colors['gray:50'],
    },
    gradient: {
      high: `linear-gradient(45deg, ${colors['purple:60']}, ${colors['magenta:60']})`,
      medium: `linear-gradient(45deg, ${colors['magenta:60']}, ${colors['orange:50']})`,
      low: `linear-gradient(45deg, ${colors['orange:50']}, ${colors['yellow:50']})`,
      safe: `linear-gradient(45deg, ${colors['teal:50']}, ${colors['green:30']})`,
    },
  }
};

export const gradientColor = {
  gradient: {
    high: `linear-gradient(45deg, ${colors['purple:60']}, ${colors['red:50']})`,
    medium: `linear-gradient(45deg, ${colors['red:50']}, ${colors['orange:50']})`,
    low: `linear-gradient(45deg, ${colors['orange:50']}, ${colors['yellow:50']})`,
    safe: `linear-gradient(45deg, ${colors['teal:50']}, ${colors['green:40']})`,
    1: `linear-gradient(45deg, ${colors['purple:50']}, ${colors['magenta:40']})`,
    2: `linear-gradient(45deg, ${colors['purple:60']}, ${colors['blue:50']})`,
    3: `linear-gradient(45deg, ${colors['blue:50']}, ${colors['teal:40']})`,
    4: `linear-gradient(45deg, ${colors['cyan:40']}, ${colors['teal:30']})`,
    5: `linear-gradient(45deg, ${colors['blue:60']}, ${colors['teal:40']})`,
    6: `linear-gradient(45deg, ${colors['green:40']}, ${colors['cyan:30']})`,
    7: `linear-gradient(45deg, ${colors['magenta:60']}, ${colors['red:40']})`,
    8: `linear-gradient(45deg, ${colors['magenta:50']}, ${colors['blue:60']})`,
  }
};

export default function getColorPalette(colorMode) {
  const palettes = { dark, light }[colorMode ?? 'dark'];
  const palettesStyle = {
    ...palettes,
    ...gradientColor,
    ...blindnessColor,
  };
  Object.defineProperty(palettesStyle, 'get', {
    value: function get(key, defaultValue) {
      return _get(palettesStyle, key, defaultValue);
    },
    writable: false,
    enumerable: false,
    configurable: false,
  });
  return palettesStyle;
}
