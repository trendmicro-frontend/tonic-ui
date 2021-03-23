import { setColorWithOpacity } from '../theme/colors';
import useTheme from '../useTheme';
import useColorMode from '../useColorMode';
import useColorStyle from '../useColorStyle';

export const useMenuListStyle = () => {
  const { colorMode } = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorModeStyle = {
    light: {
      bg: 'white',
      boxShadow: colorStyle.shadow.medium,
    },
    dark: {
      bg: 'gray:80',
      boxShadow: colorStyle.shadow.medium,
    },
  }[colorMode];

  return {
    color: 'inherit',
    m: '0',
    p: '0',
    ...colorModeStyle,
  };
};

/**
|--------------------------------------------------
| Styles for MenuGroup
|--------------------------------------------------
*/

export const useMenuGroupStyle = () => {
  const { colorMode } = useColorMode();
  const color = {
    dark: 'white:secondary',
    light: 'black:secondary',
  }[colorMode];

  return {
    px: '3x',
    py: '2x',
    color
  };
};

/**
|--------------------------------------------------
| Styles for MenuItem
|--------------------------------------------------
*/

const baseProps = () => {
  return {
    flex: ' 0 0 auto',
    userSelect: 'none',
    px: '3x',
    py: '2x',
    color: 'inherit',
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    textAlign: 'left',
    outline: 'none'
  };
};

const menuItemProps = ({ colorMode }) => {
  const hoverBackground = { light: 'black:disabled', dark: setColorWithOpacity('white', 0.12) }[colorMode];
  const activeBackground = { light: 'gray:20', dark: setColorWithOpacity('white', 0.08) }[colorMode];
  const disabledColor = { light: 'black:disabled', dark: 'white:disabled' }[colorMode];
  const disabledBackground = { light: 'white', dark: 'gray:80' }[colorMode];
  const focusBackground = activeBackground;
  return {
    _hover: {
      bg: hoverBackground,
    },
    _active: {
      bg: activeBackground,
    },
    _focus: {
      bg: focusBackground,
      outline: 0,
    },
    _disabled: {
      bg: disabledBackground,
      color: disabledColor,
      cursor: 'not-allowed',
    },
  };
};

export const useMenuItemStyle = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const props = { theme, colorMode };

  return {
    ...baseProps(props),
    ...menuItemProps(props),
  };
};
