import _get from 'lodash.get';
import useColorMode from '../useColorMode';
import useColorStyle from '../useColorStyle';
import useTheme from '../useTheme';

const defaultPlacement = 'right';
const defaultSize = 'auto';

const getPlacementProps = (placement) => {
  placement = placement ?? defaultPlacement;

  return {
    right: {
      right: 0,
      top: 0,
      height: '100vh',
    },
    left: {
      left: 0,
      top: 0,
      height: '100vh',
    },
  }[placement];
};

const getSizeProps = (size) => {
  size = size ?? defaultSize;

  return {
    sm: {
      width: 336,
    },
    md: {
      width: 504,
    },
    lg: {
      width: 672,
    },
    full: {
      width: '100%',
    },
    auto: {
      width: 'auto',
    },
  }[size];
};

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

const useDrawerContentStyle = ({
  placement,
  size,
}) => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const baseStyle = {
    mx: 'auto',
    height: 'auto',
    maxHeight: '100vh',
    top: 0,
    display: 'flex',
    flexDirection: 'column',
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
  const placementProps = getPlacementProps(placement);
  const sizeProps = getSizeProps(size);

  return {
    ...baseStyle,
    ...colorModeStyle,
    ...placementProps,
    ...sizeProps,
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
  useDrawerContentStyle,
  useDrawerHeaderStyle,
  useDrawerBodyStyle,
  useDrawerFooterStyle,
};
