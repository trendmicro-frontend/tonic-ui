const colorStyle = {
  dark: {
    background: {
      primary: 'gray:100',
      secondary: 'gray:90',
      tertiary: 'gray:80',
      inverse: 'gray:10',
      selected: 'blue:60', // TODO: will be replaced with text.selection in the v1 release
      marked: '#fce79e', // TODO: will be replaced with text.highlight in the v1 release
    },

    color: {
      emphasis: 'white:emphasis',
      primary: 'white:primary',
      secondary: 'white:secondary',
      tertiary: 'white:tertiary',
      disabled: 'white:disabled',
      success: 'green:40',
      info: 'blue:40',
      warning: 'orange:50',
      error: 'red:50',
    },

    text: {
      selection: 'blue:60',
      highlight: '#fce79e',

      // TODO: the following properties are deprecated and will be removed in the v1 release
      emphasis: 'white:emphasis',
      primary: 'white:primary',
      secondary: 'white:secondary',
      tertiary: 'white:tertiary',
      disabled: 'white:disabled',
      link: 'blue:40',
      warning: 'orange:50',
      error: 'red:50',
    },

    shadow: {
      // Tooltip, Popover
      thin: '0 2px 8px 0 rgba(0, 0, 0, 0.48), 0 1px 2px 0 rgba(0, 0, 0, 0.16)',

      // Menu
      medium: '0 4px 16px 0 rgba(0, 0, 0, 0.48), 0 2px 4px 0 rgba(0, 0, 0, 0.16)',

      // Drawer, Modal
      thick: '0 8px 32px 0 rgba(0, 0, 0, 0.48), 0 4px 8px 0 rgba(0, 0, 0, 0.16)',
    },

    severity: {
      critical: 'magenta:60',
      high: 'red:50',
      medium: 'orange:50',
      low: 'yellow:50',
      safe: 'green:40',
      info: 'gray:50',
      unknown: 'gray:50',
    },

    // https://docs.appian.com/suite/help/20.2/Chart_Color_Scheme.html
    chart: {
      classic: {
        colors: [
          'gray:50',
          'blue:50',
          'green:40',
          'orange:50',
          'cyan:40',
          'red:50',
          'purple:50',
          'teal:40',
          'magenta:40',
          'green:30',
          'yellow:50',
        ],
      },
    },
  },
  light: {
    background: {
      primary: 'white:emphasis',
      secondary: 'gray:10',
      tertiary: 'gray:20',
      inverse: 'gray:70',
      selected: 'blue:60', // TODO: will be replaced with text.selection in the v1 release
      marked: '#fce79e', // TODO: will be replaced with text.highlight in the v1 release
    },

    color: {
      emphasis: 'black:emphasis',
      primary: 'black:primary',
      secondary: 'black:secondary',
      tertiary: 'black:tertiary',
      disabled: 'black:disabled',
      success: 'green:50',
      info: 'blue:60',
      warning: 'orange:50',
      error: 'red:60',
    },

    text: {
      selection: 'blue:60',
      highlight: '#fce79e',

      // TODO: the following properties are deprecated and will be removed in the v1 release
      emphasis: 'black:emphasis',
      primary: 'black:primary',
      secondary: 'black:secondary',
      tertiary: 'black:tertiary',
      disabled: 'black:disabled',
      link: 'blue:60',
      warning: 'orange:50',
      error: 'red:60',
    },

    shadow: {
      // Tooltip, Popover
      thin: '0 2px 8px 0 rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.08)',

      // Menu
      medium: '0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',

      // Drawer, Modal
      thick: '0 8px 32px 0 rgba(0, 0, 0, 0.16), 0 4px 8px 0 rgba(0, 0, 0, 0.08)',
    },

    severity: {
      critical: 'magenta:60',
      high: 'red:60',
      medium: 'orange:50',
      low: 'yellow:50',
      safe: 'green:50',
      info: 'gray:50',
      unknown: 'gray:50',
    },

    // https://docs.appian.com/suite/help/20.2/Chart_Color_Scheme.html
    chart: {
      classic: {
        colors: [
          'gray:50',
          'blue:60',
          'green:50',
          'orange:50',
          'cyan:40',
          'red:60',
          'purple:60',
          'teal:40',
          'magenta:50',
          'green:30',
          'yellow:50',
        ],
      },
    },
  },
};

export default colorStyle;
