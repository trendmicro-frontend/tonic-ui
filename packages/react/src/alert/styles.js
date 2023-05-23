import { useColorMode } from '../color-mode';
import { useIconButtonStyle } from '../shared/styles';
import { useTheme } from '../theme';

const getSolidSuccessStyle = ({
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'green:40',
    light: 'green:30',
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
    light: 'blue:30',
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
    light: 'red:30',
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
    dark: 'green:40',
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
    light: 'blue:50',
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
    light: 'green:60',
  }[colorMode];

  return {
    color,
  };
};

const getOutlineInfoIconStyle = ({
  colorMode,
}) => {
  const color = {
    dark: 'blue:50',
    light: 'blue:60',
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
    dark: 'red:50',
    light: 'red:60',
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
  const px = '4x';
  const py = '10q';
  const baseStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    position: 'relative',
    px,
    py,
  };

  if (variant === 'solid') {
    const severityStyle = getSolidStyle({ colorMode, severity });
    return {
      ...baseStyle,
      ...severityStyle,
    };
  }

  if (variant === 'outline') {
    const borderWidth = '1q';
    const severityStyle = getOutlineStyle({ colorMode, severity });
    return {
      ...baseStyle,
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth,
      px: `calc(${sizes[px]} - ${sizes[borderWidth]})`,
      py: `calc(${sizes[py]} - ${sizes[borderWidth]})`, // (40px - 20px) / 2 = 10px
      ...severityStyle,
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
  const iconStyle = {
    display: 'inline-flex',
    mr: '2x',
    mt: '1h',
  };

  if (variant === 'solid') {
    return {
      ...iconStyle,
      ...getSolidIconStyle({ colorMode, severity }),
    };
  }

  if (variant === 'outline') {
    return {
      ...iconStyle,
      ...getOutlineIconStyle({ colorMode, severity }),
    };
  }

  return {
    ...iconStyle,
  };
};

const useAlertMessageStyle = ({
  isClosable,
}) => {
  return {
    pr: isClosable ? '10x' : 0,
    width: '100%',
  };
};

/**
 * Returns a style object for the close button in an alert component.
 *
 * If `isClosable` is true, the button will be positioned absolutely in the top-right corner of the alert.
 *
 * You can also control the position of the close button declaratively by using the `AlertCloseButton` component within an `Alert` component:
 *
 * ```jsx
 * <Alert variant="solid" severity="success">
 *   <Text pr="10x">This is a success alert.</Text>
 *   <AlertCloseButton top={3} right={7} position="absolute" />
 * </Alert>
 * ```
 *
 * In this case, the `isClosable` prop is not needed and can be omitted.
 */
const useAlertCloseButtonStyle = ({
  isClosable,
  variant,
}) => {
  const [colorMode] = useColorMode();
  const { sizes } = useTheme();
  const color = {
    dark: {
      solid: 'black:tertiary',
      outline: 'white:tertiary',
    }[variant],
    light: {
      solid: 'black:tertiary',
      outline: 'black:tertiary',
    }[variant],
  }[colorMode];
  const size = '8x';
  const _focusBorderColor = 'blue:60';
  const _focusBoxShadowBorderColor = 'blue:60';
  const _hoverColor = {
    dark: {
      solid: 'black:primary',
      outline: 'white:emphasis',
    }[variant],
    light: {
      solid: 'black:primary',
      outline: 'black:primary',
    }[variant],
  }[colorMode];
  const baseStyle = useIconButtonStyle({ color, size, _focusBorderColor, _focusBoxShadowBorderColor, _hoverColor });

  if (isClosable) {
    const parentBorderWidth = sizes['1q'];
    const top = `calc(${sizes['1x']} - ${parentBorderWidth})`;
    const right = `calc(${sizes['2x']} - ${parentBorderWidth})`;

    return {
      ...baseStyle,
      position: 'absolute',
      top,
      right,
    };
  }

  return baseStyle;
};

export {
  useAlertStyle,
  useAlertIconStyle,
  useAlertMessageStyle,
  useAlertCloseButtonStyle,
};
