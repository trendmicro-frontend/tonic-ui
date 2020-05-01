import { get } from '@styled-system/core';
import { setColorWithOpacity } from '../theme/colors';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const baseProps = {
  px: '4x',
  py: '2x',
};

const getDefaultStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'gray:10',
    light: 'white',
  }[colorMode];
  const color = 'black:primary';

  return {
    backgroundColor,
    color,
  };
};

const getSuccessStyle = ({
  theme,
  colorMode,
}) => {
  const { sizes } = theme;
  const backgroundColor = {
    dark: 'gray:10',
    light: 'white',
  }[colorMode];
  const color = 'black:primary';
  const borderStyle = {
    borderLeftColor: 'green:50',
    borderLeftStyle: 'solid',
    borderLeftWidth: get(sizes, '1x'),
    pl: '3x',
  };

  return {
    backgroundColor,
    color,
    ...borderStyle,
  };
};

const getInfoStyle = ({
  theme,
  colorMode,
}) => {
  const { sizes } = theme;
  const backgroundColor = {
    dark: 'gray:10',
    light: 'white',
  }[colorMode];
  const color = 'black:primary';
  const borderStyle = {
    borderLeftColor: 'blue:50',
    borderLeftStyle: 'solid',
    borderLeftWidth: get(sizes, '1x'),
    pl: '3x',
  };

  return {
    backgroundColor,
    color,
    ...borderStyle,
  };
};

const getWarningStyle = ({
  theme,
  colorMode,
}) => {
  const { sizes } = theme;
  const backgroundColor = {
    dark: 'gray:10',
    light: 'white',
  }[colorMode];
  const color = 'black:primary';
  const borderStyle = {
    borderLeftColor: 'yellow:50',
    borderLeftStyle: 'solid',
    borderLeftWidth: get(sizes, '1x'),
    pl: '3x',
  };

  return {
    backgroundColor,
    color,
    ...borderStyle,
  };
};

const getErrorStyle = ({
  theme,
  colorMode,
}) => {
  const { sizes } = theme;
  const backgroundColor = {
    dark: 'gray:10',
    light: 'white',
  }[colorMode];
  const color = 'black:primary';
  const borderStyle = {
    borderLeftColor: 'red:60',
    borderLeftStyle: 'solid',
    borderLeftWidth: get(sizes, '1x'),
    pl: '3x',
  };

  return {
    backgroundColor,
    color,
    ...borderStyle,
  };
};

const getSeverityProps = ({ severity, ...props }) => {
  if (severity === 'success') {
    return getSuccessStyle(props);
  }

  if (severity === 'info') {
    return getInfoStyle(props);
  }

  if (severity === 'warning') {
    return getWarningStyle(props);
  }

  if (severity === 'error') {
    return getErrorStyle(props);
  }

  return getDefaultStyle(props);
};

const useAlertToastRootStyle = ({
  severity,
}) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const _props = {
    theme,
    colorMode,
    severity,
  };
  const severityProps = getSeverityProps(_props);

  return {
    ...baseProps,
    ...severityProps,
  };
};

const useAlertToastIconStyle = ({
  severity,
}) => {
  const color = {
    'success': 'green:50',
    'info': 'blue:50',
    'warning': 'yellow:50',
    'error': 'red:60',
  }[severity];

  return {
    color,
    py: '1x',
    lineHeight: 1, // exactly the same height as the icon's height
  };
};

const useAlertToastMessageStyle = () => {
  return {
    py: 2,
    mt: -1,
    width: '100%',
  };
};

const useAlertToastCloseButtonStyle = () => {
  const { colors } = useTheme();
  const color = setColorWithOpacity('black', 0.54);
  const hoverColor = 'black';
  const activeColor = color;
  const focusColor = color;
  const focusHoverColor = hoverColor;
  const focusActiveColor = activeColor;
  const focusBorderColor = get(colors, 'blue:60');

  return {
    border: 1,
    borderColor: 'transparent',
    color: color,
    transition: 'all .2s',
    lineHeight: 1,
    width: '8x',
    height: '8x',
    mt: -4,
    mb: -4,
    mr: -8,
    px: 0,
    py: 0,
    _hover: {
      color: hoverColor,
    },
    _active: {
      color: activeColor,
    },
    _focus: {
      borderColor: focusBorderColor,
      boxShadow: `inset 0 0 0 1px ${focusBorderColor}`,
      color: focusColor,
    },
    _focusHover: {
      color: focusHoverColor,
    },
    _focusActive: {
      borderColor: focusBorderColor,
      boxShadow: `inset 0 0 0 1px ${focusBorderColor}`,
      color: focusActiveColor,
    },
  };
};

export {
  useAlertToastRootStyle,
  useAlertToastIconStyle,
  useAlertToastMessageStyle,
  useAlertToastCloseButtonStyle,
};
