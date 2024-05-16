import { warnDeprecatedProps } from '@tonic-ui/utils';
import { attachProxyOnce } from '../utils/proxy';

const colorStyle = {
  dark: {
    background: {
      primary: 'gray:100',
      secondary: 'gray:90',
      tertiary: 'gray:80',
      inverted: 'gray:10',
      inverse: 'gray:10', // alias for inverted
      highlighted: 'rgba(255, 255, 255, 0.12)',
      selected: 'rgba(255, 255, 255, 0.08)',
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

    divider: 'rgba(255, 255, 255, 0.12)',

    text: {
      selection: 'blue:60',
      highlight: '#fce79e',
    },

    shadow: {
      // Tooltip, Popover
      thin: '0 2px 8px 0 rgba(0, 0, 0, 0.48), 0 1px 2px 0 rgba(0, 0, 0, 0.16)',

      // Menu
      medium: '0 4px 16px 0 rgba(0, 0, 0, 0.48), 0 2px 4px 0 rgba(0, 0, 0, 0.16)',

      // Drawer, Modal
      thick: '0 8px 32px 0 rgba(0, 0, 0, 0.48), 0 4px 8px 0 rgba(0, 0, 0, 0.16)',
    },

    // deprecated
    severity: attachProxyOnce({
      critical: 'magenta:60',
      high: 'red:50',
      medium: 'orange:50',
      low: 'yellow:50',
      safe: 'green:40',
      info: 'gray:50',
      unknown: 'gray:50',
    }, () => {
      const url = 'https://trendmicro-frontend.github.io/tonic-ui/react/latest/getting-started/migration-v1-to-v2#color-style';
      warnDeprecatedProps('colorStyle.severity', {
        willRemove: true,
        message: `Use your custom color style instead. For more details, see the migration guide at: ${url}`,
      });
    }),

    // deprecated
    chart: {
      classic: {
        colors: attachProxyOnce([
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
        ], () => {
          const url = 'https://trendmicro-frontend.github.io/tonic-ui/react/latest/getting-started/migration-v1-to-v2#color-style';
          warnDeprecatedProps('colorStyle.chart.classic.colors', {
            willRemove: true,
            message: `Use your custom color style instead. For more details, see the migration guide at: ${url}`,
          });
        }),
      },
    },
  },
  light: {
    background: {
      primary: 'white:emphasis',
      secondary: 'gray:10',
      tertiary: 'gray:20',
      inverted: 'gray:70',
      inverse: 'gray:70', // alias for inverted
      highlighted: 'rgba(0, 0, 0, 0.12)',
      selected: 'rgba(0, 0, 0, 0.08)',
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

    divider: 'rgba(0, 0, 0, 0.12)',

    text: {
      selection: 'blue:60',
      highlight: '#fce79e',
    },

    shadow: {
      // Tooltip, Popover
      thin: '0 2px 8px 0 rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.08)',

      // Menu
      medium: '0 4px 16px 0 rgba(0, 0, 0, 0.16), 0 2px 4px 0 rgba(0, 0, 0, 0.08)',

      // Drawer, Modal
      thick: '0 8px 32px 0 rgba(0, 0, 0, 0.16), 0 4px 8px 0 rgba(0, 0, 0, 0.08)',
    },

    // deprecated
    severity: attachProxyOnce({
      critical: 'magenta:60',
      high: 'red:60',
      medium: 'orange:50',
      low: 'yellow:50',
      safe: 'green:50',
      info: 'gray:50',
      unknown: 'gray:50',
    }, () => {
      const url = 'https://trendmicro-frontend.github.io/tonic-ui/react/latest/getting-started/migration-v1-to-v2#color-style';
      warnDeprecatedProps('colorStyle.severity', {
        willRemove: true,
        message: `Use your custom color style instead. For more details, see the migration guide at: ${url}`,
      });
    }),

    // deprecated
    chart: {
      classic: {
        colors: attachProxyOnce([
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
        ], () => {
          const url = 'https://trendmicro-frontend.github.io/tonic-ui/react/latest/getting-started/migration-v1-to-v2#color-style';
          warnDeprecatedProps('colorStyle.chart.classic.colors', {
            willRemove: true,
            message: `Use your custom color style instead. For more details, see the migration guide at: ${url}`,
          });
        }),
      },
    },
  },
};

export default colorStyle;
