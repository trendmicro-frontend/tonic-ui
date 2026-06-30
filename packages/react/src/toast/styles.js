import { useIconButtonStyle } from '../shared/styles';

const getAppearanceStyle = ({
  appearance,
}) => {
  const backgroundColor = 'background.highest';
  const color = 'text.primary';
  const appearanceStyle = {
    success: {
      borderLeftColor: 'success.icon',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1x',
      pl: '3x',
    },
    info: {
      borderLeftColor: 'info.icon',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1x',
      pl: '3x',
    },
    warning: {
      borderLeftColor: 'minorWarning.icon',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1x',
      pl: '3x',
    },
    error: {
      borderLeftColor: 'error.icon',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1x',
      pl: '3x',
    },
  }[appearance];

  return {
    backgroundColor,
    color,
    ...appearanceStyle,
  };
};

const useToastStyle = ({
  appearance,
}) => {
  const appearanceStyle = getAppearanceStyle({ appearance });

  return {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    position: 'relative',
    px: '4x',
    py: '4x',
    ...appearanceStyle,
  };
};

const useToastIconStyle = ({
  appearance,
}) => {
  const color = {
    'success': 'success.icon',
    'info': 'info.icon',
    'warning': 'minorWarning.icon',
    'error': 'error.icon',
  }[appearance];

  return {
    color,
    display: 'inline-flex',
    mr: '2x',
    mt: '1h',
  };
};

const useToastMessageStyle = ({
  isClosable,
}) => {
  return {
    pr: isClosable ? '10x' : 0,
    width: '100%',
  };
};

/**
 * Returns a style object for the close button in a toast component.
 *
 * If `isClosable` is true, the button will be positioned absolutely in the top-right corner of the toast.
 *
 * You can also control the position of the close button declaratively by using the `ToastCloseButton` component within an `Toast` component:
 *
 * ```jsx
 * <Toast appearance="success">
 *   <Text pr="10x">This is a success toast.</Text>
 *   <ToastCloseButton top={9} right={7} position="absolute" />
 * </Toast>
 * ```
 *
 * In this case, the `isClosable` prop is not needed and can be omitted.
 */
const useToastCloseButtonStyle = ({
  isClosable,
  variant,
}) => {
  const color = 'text.tertiary';
  const size = '8x';
  const focusVisibleOutlineColor = '_component.keyboardFocused.outerFocusRing';
  const hoverColor = 'text.primary';
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
      // The toast close button has no hover background since it varies by `appearance`
      color: hoverColor,
    },
  };

  if (isClosable) {
    const top = '10q'; // (52px - 32px) / 2 = 10px
    const right = '2x';

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
  useToastStyle,
  useToastIconStyle,
  useToastMessageStyle,
  useToastCloseButtonStyle,
};
