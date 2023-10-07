import _get from 'lodash.get';
import { useColorMode } from '../color-mode';
import { useColorStyle } from '../color-style';
import { useIconButtonStyle } from '../shared/styles';
import { useTheme } from '../theme';

const defaultSize = 'auto';

const useModalContainerStyle = () => {
  return {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    overflow: 'auto',
    zIndex: 'modal',
  };
};

const useModalOverlayStyle = () => {
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

const useModalContentStyle = ({
  placement, // No default value if not specified
  scrollBehavior, // No default value if not specified
  size = defaultSize,
  tabIndex,
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const baseStyle = {
    display: 'flex',
    flexDirection: 'column',
    outline: (tabIndex < 0) ? 0 : undefined, // Remove the default outline for tabindex="-1"
    overflow: 'clip', // Set overflow to clip to prevent any scrolling in the modal content
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
    'center': {
      // https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container
      margin: 'auto', // Use the `margin: auto` technique to center the content
    },
  }[placement];
  const sizeStyle = {
    xs: {
      width: 352,
      minHeight: 240,
      maxHeight: scrollBehavior === 'inside' ? '80vh' : undefined,
    },
    sm: {
      width: 512,
      minHeight: 320,
      maxHeight: scrollBehavior === 'inside' ? '80vh' : undefined,
    },
    md: {
      width: 672,
      minHeight: 320,
      maxHeight: scrollBehavior === 'inside' ? '80vh' : undefined,
    },
    lg: {
      width: 832,
      minHeight: 320,
      maxHeight: scrollBehavior === 'inside' ? '80vh' : undefined,
    },
    xl: {
      width: 992,
      minHeight: 320,
      maxHeight: scrollBehavior === 'inside' ? '80vh' : undefined,
    },
    full: {
      maxWidth: scrollBehavior === 'inside' ? '100vw' : undefined,
      maxHeight: scrollBehavior === 'inside' ? '100vh' : undefined,

      /**
       * Autoprefixer will compile it to:
       *
       * ```css
       * min-height: -webkit-fill-available;
       * min-height: -moz-available;
       * min-height: fill-available;
       * min-height: stretch;
       * ```
       */
      minHeight: 'stretch',
      width: '100%',
    },
    auto: {
      width: 'auto',
      height: 'auto',
      maxWidth: scrollBehavior === 'inside' ? '100vw' : undefined,
      maxHeight: scrollBehavior === 'inside' ? '100vh' : undefined,
    },
  }[size];

  return {
    ...baseStyle,
    ...colorModeStyle,
    ...placementStyle,
    ...sizeStyle,
  };
};

const useModalCloseButtonStyle = () => {
  const [colorMode] = useColorMode();
  const { sizes } = useTheme();
  const color = {
    dark: 'white:tertiary',
    light: 'black:tertiary',
  }[colorMode];
  const size = '8x';
  const focusVisibleOutlineColor = 'blue:60';
  const hoverColor = {
    dark: 'white:emphasis',
    light: 'black:primary',
  }[colorMode];
  const iconButtonStyle = useIconButtonStyle({ color, size });
  const parentBorderWidth = sizes['1q'];
  const top = `calc(${sizes['2x']} - ${parentBorderWidth})`;
  const right = `calc(${sizes['2x']} - ${parentBorderWidth})`;

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
};

const useModalHeaderStyle = ({
  isClosable,
}) => {
  return {
    pt: '4x',
    pb: '6x',
    pl: '6x',
    pr: isClosable ? '12x' : '6x',
    position: 'relative',
    fontSize: 'xl',
    lineHeight: 'xl',
  };
};

const useModalBodyStyle = ({
  scrollBehavior, // No default value if not specified
}) => {
  const { sizes, lineHeights } = useTheme();

  return {
    px: '6x',
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

const useModalFooterStyle = () => {
  const [colorMode] = useColorMode();
  const { sizes, lineHeights } = useTheme();
  const borderColor = {
    dark: 'rgba(255, 255, 255, 0.12)',
    light: 'rgba(0, 0, 0, 0.12)',
  }[colorMode];

  return {
    display: 'flex',
    justifyContent: 'flex-end',
    px: '6x',
    py: '4x',
    borderTop: 1,
    borderTopColor: borderColor,
    _firstOfType: {
      // Sets the margin area on the top if it is the first child
      // 4x (padding-top) + xl (line-height) + 3x (padding-bottom)
      marginTop: `calc(${_get(sizes, '4x')} + ${_get(lineHeights, 'xl')} + ${_get(sizes, '3x')})`,
    },
  };
};

export {
  useModalBodyStyle,
  useModalCloseButtonStyle,
  useModalContainerStyle,
  useModalContentStyle,
  useModalFooterStyle,
  useModalHeaderStyle,
  useModalOverlayStyle,
};
