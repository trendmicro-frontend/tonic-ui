import { get } from '@styled-system/core';
import useColorMode from '../useColorMode';
import useColorStyle from '../useColorStyle';
import useTheme from '../useTheme';

const defaultPlacement = 'left';
const defaultSize = 'auto';

const getPlacementProps = (placement) => {
  placement = placement ?? defaultPlacement;

  return {
    left: {
      left: 0,
      right: 'auto',
      top: 0,
      height: '100%',
    },
    right: {
      left: 'auto',
      right: 0,
      top: 0,
      height: '100%',
    },
    top: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 'auto',
      height: 'auto',
      maxHeight: '100%',
    },
    bottom: {
      top: 'auto',
      left: 0,
      right: 0,
      bottom: 0,
      height: 'auto',
      maxHeight: '100%',
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
      width: '100vw'
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
  const focusBorderColor = get(colors, 'blue:60');

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
      borderColor: 'gray:20',
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
    pb: '3x',
    pl: '6x',
    pr: '12x',
    position: 'relative',
    fontSize: 'xl',
    lineHeight: 'xl',
  };
};

const useDrawerBodyStyle = () => {
  const { sizes, lineHeights } = useTheme();

  return {
    px: '6x',
    pb: '6x',
    flex: 1,
    height: 'auto',
    overflowY: 'auto',
    _firstOfType: {
      marginTop: `calc(${get(sizes, '4x')} + ${get(lineHeights, 'xl')} + ${get(sizes, '3x')})`,
    },
  };
};

const useDrawerFooterStyle = () => {
  const [colorMode] = useColorMode();
  const { sizes, lineHeights } = useTheme();
  const borderColor = {
    dark: 'gray:80',
    light: 'gray:20', // TBD: light mode is not ready yet
  }[colorMode];

  return {
    display: 'flex',
    justifyContent: 'flex-end',
    px: '6x',
    py: '4x',
    borderTop: 1,
    borderTopColor: borderColor,
    _firstOfType: {
      marginTop: `calc(${get(sizes, '4x')} + ${get(lineHeights, 'xl')} + ${get(sizes, '3x')})`,
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
