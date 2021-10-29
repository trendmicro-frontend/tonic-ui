import { get } from '@styled-system/core';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

const baseProps = {
  px: '4x',
  py: '2x',
};

const getSolidSuccessStyle = ({
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

const getSolidInfoStyle = ({
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

const getSolidWarningStyle = ({
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

const getSolidErrorStyle = ({
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

const getSolidVariantProps = props => {
  const { severity, colorMode } = props;

  if (severity === 'success') {
    return getSolidSuccessStyle({ colorMode });
  }

  if (severity === 'info') {
    return getSolidInfoStyle({ colorMode });
  }

  if (severity === 'warning') {
    return getSolidWarningStyle({ colorMode });
  }

  if (severity === 'error') {
    return getSolidErrorStyle({ colorMode });
  }

  return {};
};

// FIXME
const getOutlineSuccessStyle = ({
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

// FIXME
const getOutlineInfoStyle = ({
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

// FIXME
const getOutlineWarningStyle = ({
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

// FIXME
const getOutlineErrorStyle = ({
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

const getOutlineVariantProps = props => {
  const { severity, colorMode } = props;

  if (severity === 'success') {
    return getOutlineSuccessStyle({ colorMode });
  }

  if (severity === 'info') {
    return getOutlineInfoStyle({ colorMode });
  }

  if (severity === 'warning') {
    return getOutlineWarningStyle({ colorMode });
  }

  if (severity === 'error') {
    return getOutlineErrorStyle({ colorMode });
  }

  return {};
};

const getVariantProps = props => {
  const { variant } = props;

  switch (variant) {
  case 'solid':
    return getSolidVariantProps(props);
  case 'outline':
    return getOutlineVariantProps(props);
  default:
    return {};
  }
};

const useAlertRootStyle = ({
  variant,
  severity,
}) => {
  const [colorMode] = useColorMode();
  const _props = {
    variant,
    severity,
    colorMode,
  };

  return {
    ...baseProps,
    ...getVariantProps(_props),
  };
};

const useAlertIconStyle = () => {
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

const getSolidCloseButtonStyle = ({
  colorMode,
  colors,
}) => {
  const color = {
    dark: 'black:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const hoverColor = {
    dark: 'black:primary',
    light: 'black:primary',
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

// FIXME
const getOutlineCloseButtonStyle = ({
  colorMode,
  colors,
}) => {
  const color = {
    dark: 'black:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const hoverColor = {
    dark: 'black:primary',
    light: 'black:primary',
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

const useAlertCloseButtonStyle = ({
  variant,
}) => {
  const [colorMode] = useColorMode();
  const { colors } = useTheme();

  if (variant === 'solid') {
    return getSolidCloseButtonStyle({ colorMode, colors });
  }

  if (variant === 'outline') {
    return getOutlineCloseButtonStyle({ colorMode, colors });
  }

  return {};
};

export {
  useAlertRootStyle,
  useAlertIconStyle,
  useAlertMessageStyle,
  useAlertCloseButtonStyle,
};
