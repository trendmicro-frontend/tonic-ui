import { useColorMode } from '../color-mode';
import { useIconButtonStyle } from '../shared/styles';

const getAppearanceStyle = ({
  appearance,
  colorMode,
}) => {
  const backgroundColor = {
    dark: 'gray:10',
    light: 'white',
  }[colorMode];
  const color = 'black:primary';
  const appearanceStyle = {
    success: {
      borderLeftColor: 'green:50',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1x',
      pl: '3x',
    },
    info: {
      borderLeftColor: 'blue:60',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1x',
      pl: '3x',
    },
    warning: {
      borderLeftColor: 'yellow:50',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1x',
      pl: '3x',
    },
    error: {
      borderLeftColor: 'red:60',
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
  const [colorMode] = useColorMode();
  const appearanceStyle = getAppearanceStyle({ appearance, colorMode });

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
    'success': 'green:50',
    'info': 'blue:60',
    'warning': 'yellow:50',
    'error': 'red:60',
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
  const [colorMode] = useColorMode();
  const color = {
    dark: 'black:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const size = '8x';
  const focusVisibleOutlineColor = 'blue:60';
  const hoverColor = {
    dark: 'black:primary',
    light: 'black:primary',
  }[colorMode];
  const iconButtonStyle = useIconButtonStyle({ color, size });

  if (isClosable) {
    const top = '10q'; // (52px - 32px) / 2 = 10px
    const right = '2x';

    return {
      ...iconButtonStyle,
      _focusVisible: {
        outlineColor: focusVisibleOutlineColor,
        outlineOffset: '-1h',
        outlineStyle: 'solid',
        outlineWidth: '1h',
      },
      _hover: {
        color: hoverColor,
      },
      position: 'absolute',
      top,
      right,
    };
  }

  return {
    ...iconButtonStyle,
    _focusVisible: {
      outlineColor: focusVisibleOutlineColor,
      outlineOffset: '-1h',
      outlineStyle: 'solid',
      outlineWidth: '1h',
    },
    _hover: {
      color: hoverColor,
    },
  };
};

export {
  useToastStyle,
  useToastIconStyle,
  useToastMessageStyle,
  useToastCloseButtonStyle,
};
