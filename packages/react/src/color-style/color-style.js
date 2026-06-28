const colorStyle = {
  dark: {
    background: {
      primary: 'background.low',
      secondary: 'background.high',
      tertiary: 'background.highest',
      inverted: 'background._fixed.light.low',
      inverse: 'background._fixed.light.low', // alias for inverted
      highlighted: 'actions.hovered',
      selected: 'actions.selected',
    },

    color: {
      emphasis: 'text.accent',
      primary: 'text.primary',
      secondary: 'text.secondary',
      tertiary: 'text.tertiary',
      disabled: 'text.disabled',
      success: 'success.icon',
      info: 'info.icon',
      warning: 'warning.icon',
      error: 'error.icon',
    },

    divider: 'border.tertiary',

    text: {
      selection: '_foreground.primary.enabled',
      highlight: '_highlight',
    },

    shadow: {
      thin: 'high',
      medium: 'medium',
      thick: 'low',
    },
  },
  light: {
    background: {
      primary: 'background.low',
      secondary: 'background.high',
      tertiary: 'background.highest',
      inverted: 'background._fixed.dark.low',
      inverse: 'background._fixed.light.low', // alias for inverted
      highlighted: 'actions.hovered',
      selected: 'actions.selected',
    },

    color: {
      emphasis: 'text.accent',
      primary: 'text.primary',
      secondary: 'text.secondary',
      tertiary: 'text.tertiary',
      disabled: 'text.disabled',
      success: 'success.icon',
      info: 'info.icon',
      warning: 'warning.icon',
      error: 'error.icon',
    },

    divider: 'border.tertiary',

    text: {
      selection: '_foreground.primary.enabled',
      highlight: '_highlight',
    },

    shadow: {
      thin: 'high',
      medium: 'medium',
      thick: 'low',
    },
  },
};

export default colorStyle;
