import { get } from '@styled-system/core';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const baseProps = {
  px: '4x',
  py: '2x',
};

const getSuccessStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'green:50',
    light: 'green:50',
  }[colorMode];
  const color = 'black:primary';

  return {
    backgroundColor,
    color,
  };
};

const getInfoStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'blue:40',
    light: 'blue:40',
  }[colorMode];
  const color = 'black:primary';

  return {
    backgroundColor,
    color,
  };
};

const getWarningStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'yellow:50',
    light: 'yellow:50',
  }[colorMode];
  const color = 'black:primary';

  return {
    backgroundColor,
    color,
  };
};

const getErrorStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'red:40',
    light: 'red:40',
  }[colorMode];
  const color = 'black:primary';

  return {
    backgroundColor,
    color,
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

  return {};
};

const useAlertRootStyle = ({
  severity,
}) => {
  const { colorMode } = useColorMode();
  const _props = {
    colorMode,
    severity,
  };
  const severityProps = getSeverityProps(_props);

  return {
    ...baseProps,
    ...severityProps,
  };
};

const useAlertIconStyle = ({
  severity,
}) => {
  return {
    py: '1x',
    lineHeight: 1, // exactly the same height as the icon's height
  };
};

const useAlertMessageStyle = () => {
  return {
    py: 2,
    mt: -1,
    width: '100%',
  };
};

const useAlertCloseButtonStyle = () => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const color = {
    dark: 'black:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const hoverColor = {
    dark: 'black:emphasis',
    light: 'black:emphasis',
  }[colorMode];
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
    height: '8x',
    width: '8x',
    minWidth: '8x', // ensure a minimum width for the close button
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
  useAlertRootStyle,
  useAlertIconStyle,
  useAlertMessageStyle,
  useAlertCloseButtonStyle,
};
