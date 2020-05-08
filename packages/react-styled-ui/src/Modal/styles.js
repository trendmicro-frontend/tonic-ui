import { setColorWithOpacity } from '../theme/colors';
import useColorMode from '../useColorMode';
import useTheme from '../useTheme';

////////////// Modal Close Button ////////////

const useModalCloseButtonStyle = () => {
  const { colorMode } = useColorMode();
  const { colors } = useTheme();
  const _color = colors[{
    light: 'black:primary',
    dark: 'white:primary',
  }[colorMode]];
  const focusColor = colors['blue:60'];
  const styles = {
    width: '8x',
    height: '8x',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 8,
    right: 8,
    transition: 'all 0.2s ease 0s',
    flex: '0 0 auto',
    _focus: {
      borderColor: focusColor,
      boxShadow: `inset 0 0 0 1px ${focusColor}`,
    },
  };
  const interactionProps = {
    light: {
      color: setColorWithOpacity(_color, 0.54),
      _hover: {
        color: setColorWithOpacity(_color, 1),
      },
      _active: {
        color: setColorWithOpacity(_color, 0.54),
      },
      _disabled: {
        color: setColorWithOpacity(_color, 0.28),
        cursor: 'not-allowed',
      },
    },
    dark: {
      color: setColorWithOpacity(_color, 0.47),
      _hover: {
        color: setColorWithOpacity(_color, 1),
      },
      _active: {
        color: setColorWithOpacity(_color, 0.47),
      },
      _disabled: {
        color: setColorWithOpacity(_color, 0.3),
        cursor: 'not-allowed',
      },
    },
  }[colorMode];
  return { ...styles, ...interactionProps };
};

/////////////// Modal Content ////////////
const sizeProps = (size) => {
  return {
    xs: {
      width: 352,
      minHeight: 240,
    },
    sm: {
      width: 512,
      minHeight: 320,
    },
    md: {
      width: 672,
      minHeight: 320,
    },
    lg: {
      width: 832,
      minHeight: 320,
    },
    xl: {
      width: 992,
      minHeight: 320,
    },
    full: {
      maxWidth: '100%'
    },
    auto: {
      width: 'auto',
      height: 'auto',
    },
  }[size];
};

const useModalContentStyles = ({ size }) => {
  const { colorMode } = useColorMode();
  const _baseStyle = {
    mx: 'auto',
    height: 'auto',
    maxHeight: '80vh',
    top: 0,
    display: 'flex',
    flexDirection: 'column',
  };
  const _colorModeStyles = {
    light: {
      color: 'black:primary',
      bg: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'gray:20',
      boxShadow: 'light.lg',
    },
    dark: {
      color: 'white:primary',
      bg: 'gray:90',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'gray:80',
      boxShadow: 'dark.lg',
    },
  }[colorMode];
  const _sizeProps = sizeProps(size);

  return {
    ..._baseStyle,
    ..._colorModeStyles,
    ..._sizeProps,
  };
};

export {
  useModalCloseButtonStyle,
  useModalContentStyles,
};
