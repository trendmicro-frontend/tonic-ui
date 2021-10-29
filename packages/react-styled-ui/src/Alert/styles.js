import { get } from '@styled-system/core';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

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

const getOutlineSuccessStyle = ({
  colorMode,
}) => {
  const borderColor = {
    dark: 'green:50',
    light: 'green:50',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    borderColor,
    color,
  };
};

const getOutlineInfoStyle = ({
  colorMode,
}) => {
  const borderColor = {
    dark: 'blue:40',
    light: 'blue:40',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    borderColor,
    color,
  };
};

const getOutlineWarningStyle = ({
  colorMode,
}) => {
  const borderColor = {
    dark: 'yellow:50',
    light: 'yellow:50',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    borderColor,
    color,
  };
};

const getOutlineErrorStyle = ({
  colorMode,
}) => {
  const borderColor = {
    dark: 'red:40',
    light: 'red:40',
  }[colorMode];
  const color = {
    dark: 'white:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    borderColor,
    color,
  };
};

const getSolidSuccessIconStyle = ({
  colorMode,
}) => {
  const color = {
    dark: 'black:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    color,
  };
};

const getSolidInfoIconStyle = ({
  colorMode,
}) => {
  const color = {
    dark: 'black:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    color,
  };
};

const getSolidWarningIconStyle = ({
  colorMode,
}) => {
  const color = {
    dark: 'black:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    color,
  };
};

const getSolidErrorIconStyle = ({
  colorMode,
}) => {
  const color = {
    dark: 'black:primary',
    light: 'black:primary',
  }[colorMode];

  return {
    color,
  };
};

const getOutlineSuccessIconStyle = ({
  colorMode,
}) => {
  const color = {
    dark: 'green:50',
    light: 'green:50',
  }[colorMode];

  return {
    color,
  };
};

const getOutlineInfoIconStyle = ({
  colorMode,
}) => {
  const color = {
    dark: 'blue:40',
    light: 'blue:40',
  }[colorMode];

  return {
    color,
  };
};

const getOutlineWarningIconStyle = ({
  colorMode,
}) => {
  const color = {
    dark: 'yellow:50',
    light: 'yellow:50',
  }[colorMode];

  return {
    color,
  };
};

const getOutlineErrorIconStyle = ({
  colorMode,
}) => {
  const color = {
    dark: 'red:40',
    light: 'red:40',
  }[colorMode];

  return {
    color,
  };
};

const getSolidStyle = props => {
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

const getOutlineStyle = props => {
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

const useAlertStyle = ({
  variant,
  severity,
}) => {
  const [colorMode] = useColorMode();
  const { sizes } = useTheme();
  const _props = {
    severity,
    colorMode,
  };
  const borderWidth = sizes['1q'];
  const px = sizes['4x'];
  const py = `calc(${sizes['2x']} - ${borderWidth})`;
  const baseStyle = {
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth,
    px,
    py,
  };

  if (variant === 'solid') {
    return {
      ...baseStyle,
      ...getSolidStyle(_props),
    };
  }

  if (variant === 'outline') {
    return {
      ...baseStyle,
      ...getOutlineStyle(_props),
    };
  }

  return {
    ...baseStyle,
  };
};

const getSolidIconStyle = props => {
  const { severity, colorMode } = props;

  if (severity === 'success') {
    return getSolidSuccessIconStyle({ colorMode });
  }

  if (severity === 'info') {
    return getSolidInfoIconStyle({ colorMode });
  }

  if (severity === 'warning') {
    return getSolidWarningIconStyle({ colorMode });
  }

  if (severity === 'error') {
    return getSolidErrorIconStyle({ colorMode });
  }

  return {};
};

const getOutlineIconStyle = props => {
  const { severity, colorMode } = props;

  if (severity === 'success') {
    return getOutlineSuccessIconStyle({ colorMode });
  }

  if (severity === 'info') {
    return getOutlineInfoIconStyle({ colorMode });
  }

  if (severity === 'warning') {
    return getOutlineWarningIconStyle({ colorMode });
  }

  if (severity === 'error') {
    return getOutlineErrorIconStyle({ colorMode });
  }

  return {};
};

const useAlertIconStyle = ({
  variant,
  severity,
}) => {
  const [colorMode] = useColorMode();
  const _props = {
    severity,
    colorMode,
  };
  const iconStyle = {
    py: '1x',
    lineHeight: 1, // exactly the same height as the icon's height
  };

  if (variant === 'solid') {
    return {
      ...iconStyle,
      ...getSolidIconStyle(_props),
    };
  }

  if (variant === 'outline') {
    return {
      ...iconStyle,
      ...getOutlineIconStyle(_props),
    };
  }

  return {
    ...iconStyle,
  };
};

const useAlertMessageStyle = () => {
  const theme = useTheme();

  return {
    py: theme?.sizes['1h'],
    mt: theme?.sizes['-1q'],
    width: '100%',
  };
};

const getSolidCloseButtonStyle = ({
  colorMode,
  theme,
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
  const focusBorderColor = get(theme?.colors, 'blue:60');

  return {
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: theme?.sizes['1q'],
    color,
    transition: 'all .2s',
    lineHeight: 1,
    height: '8x',
    width: '8x',
    minWidth: '8x', // ensure a minimum width for the close button
    mt: '-1x',
    mb: '-1x',
    mr: '-2x',
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

const getOutlineCloseButtonStyle = ({
  colorMode,
  theme,
}) => {
  const color = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const hoverColor = {
    dark: 'white:emphasis',
    light: 'black:primary',
  }[colorMode];
  const activeColor = color;
  const focusColor = color;
  const focusHoverColor = hoverColor;
  const focusActiveColor = activeColor;
  const focusBorderColor = get(theme?.colors, 'blue:60');

  return {
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: theme?.sizes['1q'],
    color,
    transition: 'all .2s',
    lineHeight: 1,
    height: '8x',
    width: '8x',
    minWidth: '8x', // ensure a minimum width for the close button
    mt: '-1x',
    mb: '-1x',
    mr: '-2x',
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
  const theme = useTheme();

  if (variant === 'solid') {
    return getSolidCloseButtonStyle({ colorMode, theme });
  }

  if (variant === 'outline') {
    return getOutlineCloseButtonStyle({ colorMode, theme });
  }

  return {};
};

export {
  useAlertStyle,
  useAlertIconStyle,
  useAlertMessageStyle,
  useAlertCloseButtonStyle,
};
