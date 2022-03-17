import _get from 'lodash.get';
import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';
import { useTheme } from '../theme';

const defaultPlacement = 'left';
const defaultSize = 'auto';

const useDrawerCloseButtonStyle = () => {
  const [colorMode] = useColorMode();
  const { colors } = useTheme();
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
  const focusBorderColor = _get(colors, 'blue:60');

  return {
    position: 'absolute',
    top: '2x',
    right: '2x',
    border: 1,
    borderColor: 'transparent',
    color: color,
    transition: 'all .2s',
    lineHeight: 1,
    height: '8x',
    width: '8x',
    minWidth: '8x', // ensure a minimum width for the close button
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

const useDrawerContainerStyle = ({
  backdrop,
  placement = defaultPlacement,
}) => {
  const placementStyle = {
    top: {
      top: 0,
      right: 0,
      bottom: backdrop ? 0 : undefined,
      left: 0,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    right: {
      top: 0,
      right: 0,
      bottom: 0,
      left: backdrop ? 0 : undefined,
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    bottom: {
      top: backdrop ? 0 : undefined,
      right: 0,
      bottom: 0,
      left: 0,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    left: {
      top: 0,
      right: backdrop ? 0 : undefined,
      bottom: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  }[placement];

  return {
    position: 'fixed',
    display: 'flex',
    overflow: 'auto',
    zIndex: 'drawer',
    ...placementStyle,
  };
};

const useDrawerContentStyle = ({
  backdrop,
  placement = defaultPlacement,
  size = defaultSize,
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'clip', // Set overflow to clip to forbid all scrolling for drawer content
    position: 'relative',
    zIndex: 'drawer',
  };
  const colorModeStyle = {
    light: {
      color: 'black:primary',
      bg: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'gray:30',
      boxShadow: colorStyle?.shadow?.thick,
    },
    dark: {
      color: 'white:primary',
      bg: 'gray:90',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'gray:80',
      boxShadow: colorStyle?.shadow?.thick,
    },
  }[colorMode];
  const sizeStyle = {
    sm: {
      width: (placement === 'left' || placement === 'right') ? 336 : '100%',
      height: (placement === 'top' || placement === 'bottom') ? undefined : '100%',
      minHeight: (placement === 'top' || placement === 'bottom') ? 320 : undefined,
      maxHeight: (placement === 'top' || placement === 'bottom') ? '80vh' : undefined,
    },
    md: {
      width: (placement === 'left' || placement === 'right') ? 504 : '100%',
      height: (placement === 'top' || placement === 'bottom') ? undefined : '100%',
      minHeight: (placement === 'top' || placement === 'bottom') ? 320 : undefined,
      maxHeight: (placement === 'top' || placement === 'bottom') ? '80vh' : undefined,
    },
    lg: {
      width: (placement === 'left' || placement === 'right') ? 672 : '100%',
      height: (placement === 'top' || placement === 'bottom') ? undefined : '100%',
      minHeight: (placement === 'top' || placement === 'bottom') ? 320 : undefined,
      maxHeight: (placement === 'top' || placement === 'bottom') ? '80vh' : undefined,
    },
    full: {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
    },
    auto: {
      width: (placement === 'left' || placement === 'right') ? 'auto' : '100%',
      height: (placement === 'top' || placement === 'bottom') ? 'auto' : '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
    },
  }[size];

  return {
    ...baseStyle,
    ...colorModeStyle,
    ...sizeStyle,
  };
};

const useDrawerHeaderStyle = () => {
  return {
    pt: '4x',
    pb: '6x',
    pl: '4x',
    pr: '12x',
    position: 'relative',
    fontSize: 'xl',
    lineHeight: 'xl',
  };
};

const useDrawerBodyStyle = () => {
  const { sizes, lineHeights } = useTheme();

  return {
    px: '4x',
    pb: '6x',
    flex: 1,
    height: 'auto',
    overflowY: 'auto',
    _firstOfType: {
      // Sets the margin area on the top if it is the first child
      // 4x (padding-top) + xl (line-height) + 3x (padding-bottom)
      marginTop: `calc(${_get(sizes, '4x')} + ${_get(lineHeights, 'xl')} + ${_get(sizes, '3x')})`,
    },
  };
};

const useDrawerFooterStyle = ({
  placement,
}) => {
  const { sizes, lineHeights } = useTheme();

  return {
    display: 'flex',
    justifyContent: {
      'right': 'flex-start',
      'left': 'flex-end',
    }[placement],
    px: '4x',
    pb: '4x',
    _firstOfType: {
      // Sets the margin area on the top if it is the first child
      // 4x (padding-top) + xl (line-height) + 3x (padding-bottom)
      marginTop: `calc(${_get(sizes, '4x')} + ${_get(lineHeights, 'xl')} + ${_get(sizes, '3x')})`,
    },
  };
};

export {
  useDrawerCloseButtonStyle,
  useDrawerContainerStyle,
  useDrawerContentStyle,
  useDrawerHeaderStyle,
  useDrawerBodyStyle,
  useDrawerFooterStyle,
};
