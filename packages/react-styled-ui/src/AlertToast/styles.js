import { get } from '@styled-system/core';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const baseProps = {
  pl: '4x',
  pr: '4x',
  py: '4x',
};

const getDefaultStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'gray:10',
    light: 'gray:10',
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
    light: 'gray:10',
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
    light: 'gray:10',
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
    light: 'gray:10',
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
    light: 'gray:10',
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
    py: '.125rem',
    mr: '2x',
    lineHeight: 1, // exactly the same height as the icon's height
  };
};

const useAlertToastMessageStyle = () => {
  return {
    width: '100%',
  };
};

export {
  useAlertToastRootStyle,
  useAlertToastIconStyle,
  useAlertToastMessageStyle,
};
