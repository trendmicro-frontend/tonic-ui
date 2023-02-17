import _get from 'lodash.get';
import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';
import { useIconButtonStyle } from '../shared/styles';
import { useTheme } from '../theme';

const defaultPlacement = 'right';
const defaultSize = 'auto';

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
    },
    right: {
      top: 0,
      right: 0,
      bottom: 0,
      left: backdrop ? 0 : undefined,
    },
    bottom: {
      top: backdrop ? 0 : undefined,
      right: 0,
      bottom: 0,
      left: 0,
    },
    left: {
      top: 0,
      right: backdrop ? 0 : undefined,
      bottom: 0,
      left: 0,
    },
  }[placement];

  return {
    position: 'fixed',
    display: 'flex',
    zIndex: 'drawer',
    ...placementStyle,
  };
};

const useDrawerOverlayStyle = () => {
  const [colorMode] = useColorMode();
  const backgroundColor = {
    dark: 'rgba(0, 0, 0, .7)',
    light: 'rgba(0, 0, 0, .7)',
  }[colorMode];

  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor,
  };
};

const useDrawerContentStyle = ({
  placement = defaultPlacement,
  size = defaultSize,
  tabIndex,
}) => {
  const isLeftOrRight = (placement === 'left' || placement === 'right');
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    outline: (tabIndex < 0) ? 0 : undefined, // Remove the default outline for tabindex="-1"
    overflow: 'clip', // Set overflow to clip to forbid all scrolling for drawer content
    position: 'relative',
  };
  const colorModeStyle = {
    light: {
      color: 'black:primary',
      bg: 'white',
      borderWidth: '1q',
      borderStyle: 'solid',
      borderColor: 'gray:30',
      boxShadow: colorStyle?.shadow?.thick,
    },
    dark: {
      color: 'white:primary',
      bg: 'gray:90',
      borderWidth: '1q',
      borderStyle: 'solid',
      borderColor: 'gray:80',
      boxShadow: colorStyle?.shadow?.thick,
    },
  }[colorMode];
  const placementStyle = {
    // https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container
    top: {
      margin: 'auto',
      marginTop: 0,
    },
    right: {
      margin: 'auto',
      marginRight: 0,
    },
    bottom: {
      margin: 'auto',
      marginBottom: 0,
    },
    left: {
      margin: 'auto',
      marginLeft: 0,
    },
  }[placement];
  const sizeStyle = {
    sm: {
      width: isLeftOrRight ? 336 : '100%',
      height: isLeftOrRight ? '100%' : undefined,
      minHeight: isLeftOrRight ? undefined : 320,
      maxHeight: isLeftOrRight ? undefined : '80vh',
    },
    md: {
      width: isLeftOrRight ? 504 : '100%',
      height: isLeftOrRight ? '100%' : undefined,
      minHeight: isLeftOrRight ? undefined : 320,
      maxHeight: isLeftOrRight ? undefined : '80vh',
    },
    lg: {
      width: isLeftOrRight ? 672 : '100%',
      height: isLeftOrRight ? '100%' : undefined,
      minHeight: isLeftOrRight ? undefined : 320,
      maxHeight: isLeftOrRight ? undefined : '80vh',
    },
    full: {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
    },
    auto: {
      width: isLeftOrRight ? 'auto' : '100%',
      height: isLeftOrRight ? '100%' : 'auto',
      maxWidth: '100vw',
      maxHeight: '100vh',
    },
  }[size];

  return {
    ...baseStyle,
    ...colorModeStyle,
    ...placementStyle,
    ...sizeStyle,
  };
};

const useDrawerCloseButtonStyle = () => {
  const [colorMode] = useColorMode();
  const { sizes } = useTheme();
  const color = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const size = '8x';
  const _focusBorderColor = 'blue:60';
  const _focusBoxShadowBorderColor = 'blue:60';
  const _hoverColor = {
    dark: 'white:emphasis',
    light: 'black:primary',
  }[colorMode];
  const baseStyle = useIconButtonStyle({ color, size, _focusBorderColor, _focusBoxShadowBorderColor, _hoverColor });
  const parentBorderWidth = sizes['1q'];
  const top = `calc(${sizes['2x']} - ${parentBorderWidth})`;
  const right = `calc(${sizes['2x']} - ${parentBorderWidth})`;

  return {
    ...baseStyle,
    position: 'absolute',
    top,
    right,
  };
};

const useDrawerHeaderStyle = ({
  isClosable,
}) => {
  return {
    pt: '4x',
    pb: '6x',
    pl: '4x',
    pr: isClosable ? '12x' : '4x',
    position: 'relative',
    fontSize: 'xl',
    lineHeight: 'xl',
  };
};

const useDrawerBodyStyle = ({
  scrollBehavior, // No default value if not specified
}) => {
  const { sizes, lineHeights } = useTheme();

  return {
    px: '4x',
    pb: '6x',
    flex: 1,
    height: 'auto',
    overflowY: scrollBehavior === 'inside' ? 'auto' : undefined,
    _firstOfType: {
      // Sets the margin area on the top if it is the first child
      // 4x (padding-top) + xl (line-height) + 3x (padding-bottom)
      marginTop: `calc(${_get(sizes, '4x')} + ${_get(lineHeights, 'xl')} + ${_get(sizes, '3x')})`,
    },
  };
};

const useDrawerFooterStyle = ({
  placement = defaultPlacement,
}) => {
  const { sizes, lineHeights } = useTheme();

  return {
    display: 'flex',
    justifyContent: {
      'right': 'flex-start',
      'left': 'flex-end',
    }[placement],
    px: '4x',
    py: '4x',
    _firstOfType: {
      // Sets the margin area on the top if it is the first child
      // 4x (padding-top) + xl (line-height) + 3x (padding-bottom)
      marginTop: `calc(${_get(sizes, '4x')} + ${_get(lineHeights, 'xl')} + ${_get(sizes, '3x')})`,
    },
  };
};

export {
  useDrawerBodyStyle,
  useDrawerCloseButtonStyle,
  useDrawerContainerStyle,
  useDrawerContentStyle,
  useDrawerFooterStyle,
  useDrawerHeaderStyle,
  useDrawerOverlayStyle,
};
