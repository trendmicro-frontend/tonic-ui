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
  const styles = {
    width: 32,
    height: 32,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 8,
    right: 8,
    transition: 'all 0.2s ease 0s',
    flex: '0 0 auto',
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
      height: '22rem',
    },
    sm: {
      width: 512,
      height: '32rem',
    },
    md: {
      width: 672,
      height: '42rem',
    },
    lg: {
      width: 832,
      height: '52rem',
    },
    xl: {
      width: 992,
      height: '62rem',
    },
    full: {
      maxWidth: '100%'
    }
  }[size];
};

const useModalContentStyles = ({ variantSize }) => {
  const { colorMode } = useColorMode();
  const _baseStyle = {
    mx: 'auto',
    height: '100%',
    top: 0,
  };
  const _colorModeStyles = {
    light: {
      color: 'black:primary',
      bg: 'white',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'gray:20'
    },
    dark: {
      color: 'white:primary',
      bg: 'gray:90',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'gray:80',
    },
  }[colorMode];
  const _sizeProps = sizeProps(variantSize);

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
