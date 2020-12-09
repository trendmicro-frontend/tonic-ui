const gradientPalette = {
  high: 'linear-gradient(45deg, purple:60, red:50)',
  medium: 'linear-gradient(45deg, red:50, orange:50)',
  low: 'linear-gradient(45deg, orange:50, yellow:50)',
  safe: 'linear-gradient(45deg, teal:50, green:40)',
  1: 'linear-gradient(45deg, purple:50, magenta:40)',
  2: 'linear-gradient(45deg, purple:60, blue:50)',
  3: 'linear-gradient(45deg, blue:50, teal:40)',
  4: 'linear-gradient(45deg, cyan:40, teal:30)',
  5: 'linear-gradient(45deg, blue:60, teal:40)',
  6: 'linear-gradient(45deg, green:40, cyan:30)',
  7: 'linear-gradient(45deg, magenta:60, red:40)',
  8: 'linear-gradient(45deg, magenta:50, blue:60)',
};
const colorPalette = {
  dark: {
    // Text color
    text: {
      emphasis: 'white:primary',
      primary: 'white:primary',
      secondary: 'white:secondary',
      tertiary: 'white:tertiary',
      disabled: 'white:disabled',
      link: 'blue:40',
      success: 'green:40',
      info: 'blue:50',
      warning: 'orange:50',
      error: 'red:50',
    },

    // background color
    background: {
      1: 'gray:100',
      2: 'gray:90',
      3: 'gray:80',
      inverse: 'gray:10',
      selected: 'blue:60',
      marked: '#fce79e',
    },

    // Shadow color
    // Note: The shadow style props will be removed from 'styled-ui-theme'.
    shadow: {
      sm: '0 2px 8px 0 rgba(0, 0, 0, 0.48), 0 1px 2px 0 rgba(0, 0, 0, 0.16)',
      md: '0 4px 16px 0 rgba(0, 0, 0, 0.48), 0 2px 4px 0 rgba(0, 0, 0, 0.16)',
      lg: '0 8px 32px 0 rgba(0, 0, 0, 0.48), 0 4px 8px 0 rgba(0, 0, 0, 0.16)',
    },

    // Severity color: critical, high, medium, low, none
    severity: {
      critical: 'red:60',
      high: 'red:50',
      medium: 'orange:50',
      low: 'yellow:50',
      save: 'green:40',
      none: 'gray:50',
    },

    // Chart color scheme
    // https://docs.appian.com/suite/help/20.2/Chart_Color_Scheme.html
    chart: {
      classic: {
        0: 'gray:50',
        1: 'blue:50',
        2: 'green:40',
        3: 'orange:50',
        4: 'cyan:40',
        5: 'red:50',
        6: 'purple:50',
        7: 'teal:40',
        8: 'magenta:40',
        9: 'green:30',
        10: 'yellow:50',
      },
    },
    gradient: { ...gradientPalette },
  },
  light: {
    // Text color
    text: {
      emphasis: 'black:emphasis',
      primary: 'black:primary',
      secondary: 'black:secondary',
      tertiary: 'black:tertiary',
      disabled: 'black:disabled',
      link: 'blue:60',
      success: 'green:50',
      info: 'blue:60',
      warning: 'orange:50',
      error: 'red:60',
    },

    background: {
      1: 'white:emphasis',
      2: 'gray:10',
      3: 'gray:20',
      inverse: 'gray:70',
      selected: 'blue:60',
      marked: '#fce79e',
    },

    // Shadow color
    // Note: The shadow style props will be removed from 'styled-ui-theme'.
    shadow: {
      sm: '0 2px 8px 0 rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.08)',
      md: '0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',
      lg: '0 8px 32px 0 rgba(0, 0, 0, 0.16), 0 4px 8px 0 rgba(0, 0, 0, 0.08)',
    },

    // Severity color: critical, high, medium, low, none
    severity: {
      critical: 'red:60',
      high: 'red:60',
      medium: 'orange:50',
      low: 'yellow:50',
      safe: 'green:50',
      none: 'gray:50',
    },

    // Chart color scheme
    // https://docs.appian.com/suite/help/20.2/Chart_Color_Scheme.html
    chart: {
      classic: {
        0: 'gray:50',
        1: 'blue:60',
        2: 'green:50',
        3: 'orange:50',
        4: 'cyan:40',
        5: 'red:60',
        6: 'purple:60',
        7: 'teal:40',
        8: 'magenta:50',
        9: 'green:30',
        10: 'yellow:50',
      },
    },
    gradient: { ...gradientPalette },
  },
  blindness: {
    // Severity color: critical, high, medium, low, none
    severity: {
      high: 'magenta:60',
      medium: 'orange:50',
      low: 'yellow:50',
      safe: 'green:30',
      none: 'gray:50',
    },
    // Chart color scheme
    // https://docs.appian.com/suite/help/20.2/Chart_Color_Scheme.html
    chart: {
      classic: {
        0: 'gray:50',
        1: 'blue:30',
        2: 'green:30',
        3: 'orange:50',
        4: 'cyan:30',
        5: 'magenta:60',
        6: 'purple:50',
        7: 'teal:40',
        8: 'purple:30',
        9: 'cyan:70',
        10: 'yellow:50',
      },
    },
    gradient: {
      high: 'linear-gradient(45deg, purple:60, magenta:60)',
      medium: 'linear-gradient(45deg, magenta:60, orange:50)',
      low: 'linear-gradient(45deg, orange:50, yellow:50)',
      safe: 'linear-gradient(45deg, teal:50, green:30)',
    },
  }
};

export default colorPalette;
