import { useIconButtonStyle } from '../shared/styles';
import { useTheme } from '../theme';

const getSolidSuccessStyle = () => {
  return {
    backgroundColor: 'success._overlay',
    color: 'success._onOverlay.text',
  };
};

const getSolidInfoStyle = () => {
  return {
    backgroundColor: 'info._overlay',
    color: 'info._onOverlay.text'
  };
};

const getSolidWarningStyle = () => {
  return {
    backgroundColor: 'minorWarning._overlay',
    color: 'minorWarning._onOverlay.text',
  };
};

const getSolidErrorStyle = () => {
  return {
    backgroundColor: 'error._overlay',
    color: 'error._onOverlay.text',
  };
};

const getOutlineSuccessStyle = () => {
  return {
    borderColor: 'success.icon',
    color: 'text.primary',
  };
};

const getOutlineInfoStyle = () => {
  return {
    borderColor: 'info.icon',
    color: 'text.primary',
  };
};

const getOutlineWarningStyle = () => {
  return {
    borderColor: 'minorWarning.icon',
    color: 'text.primary',
  };
};

const getOutlineErrorStyle = () => {
  return {
    borderColor: 'error.icon',
    color: 'text.primary',
  };
};

const getSolidSuccessIconStyle = () => {
  return {
    color: 'success.icon',
  };
};

const getSolidInfoIconStyle = () => {
  return {
    color: 'info.icon',
  };
};

const getSolidWarningIconStyle = () => {
  return {
    color: 'minorWarning.icon',
  };
};

const getSolidErrorIconStyle = () => {
  return {
    color: 'error.icon',
  };
};

const getOutlineSuccessIconStyle = () => {
  return {
    color: 'success.icon',
  };
};

const getOutlineInfoIconStyle = () => {
  return {
    color: 'info.icon',
  };
};

const getOutlineWarningIconStyle = () => {
  return {
    color: 'minorWarning.icon',
  };
};

const getOutlineErrorIconStyle = () => {
  return {
    color: 'error.icon',
  };
};

const getSolidStyle = ({
  severity
}) => {
  if (severity === 'success') {
    return getSolidSuccessStyle();
  }

  if (severity === 'info') {
    return getSolidInfoStyle();
  }

  if (severity === 'warning') {
    return getSolidWarningStyle();
  }

  if (severity === 'error') {
    return getSolidErrorStyle();
  }

  return {};
};

const getOutlineStyle = ({
  severity
}) => {
  if (severity === 'success') {
    return getOutlineSuccessStyle();
  }

  if (severity === 'info') {
    return getOutlineInfoStyle();
  }

  if (severity === 'warning') {
    return getOutlineWarningStyle();
  }

  if (severity === 'error') {
    return getOutlineErrorStyle();
  }

  return {};
};

const useAlertStyle = ({
  variant,
  severity,
}) => {
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
    const severityStyle = getSolidStyle({ severity });
    return {
      ...baseStyle,
      ...severityStyle,
    };
  }

  if (variant === 'outline') {
    const borderWidth = '1q';
    const severityStyle = getOutlineStyle({ severity });
    return {
      ...baseStyle,
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth,
      borderRadius: 'sm',
      px: `calc(${sizes[px]} - ${sizes[borderWidth]})`,
      py: `calc(${sizes[py]} - ${sizes[borderWidth]})`, // (40px - 20px) / 2 = 10px
      ...severityStyle,
    };
  }

  return {
    ...baseStyle,
  };
};

const getSolidIconStyle = ({
  severity
}) => {
  if (severity === 'success') {
    return getSolidSuccessIconStyle();
  }

  if (severity === 'info') {
    return getSolidInfoIconStyle();
  }

  if (severity === 'warning') {
    return getSolidWarningIconStyle();
  }

  if (severity === 'error') {
    return getSolidErrorIconStyle();
  }

  return {};
};

const getOutlineIconStyle = ({
  severity
}) => {
  if (severity === 'success') {
    return getOutlineSuccessIconStyle();
  }

  if (severity === 'info') {
    return getOutlineInfoIconStyle();
  }

  if (severity === 'warning') {
    return getOutlineWarningIconStyle();
  }

  if (severity === 'error') {
    return getOutlineErrorIconStyle();
  }

  return {};
};

const useAlertIconStyle = ({
  variant,
  severity,
}) => {
  const iconStyle = {
    display: 'inline-flex',
    mr: '2x',
    mt: '1h',
    backgroundColor: 'transparent',
  };

  if (variant === 'solid') {
    return {
      ...iconStyle,
      ...getSolidIconStyle({ severity }),
    };
  }

  if (variant === 'outline') {
    return {
      ...iconStyle,
      ...getOutlineIconStyle({ severity }),
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
  const { sizes } = useTheme();
  const color = 'text.secondary';
  const size = '8x';
  const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';
  const hoverColor = 'text.accent';
  const iconButtonStyle = useIconButtonStyle({ color, size });

  const baseStyle = {
    ...iconButtonStyle,
    // Set the background color to transparent to prevent the parent opacity from being applied twice
    backgroundColor: 'transparent',
    _focusVisible: {
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: '-1h',
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
    _hover: {
      // The alert close button has no hover background since it varies by `severity`
      color: hoverColor,
    },
  };

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
