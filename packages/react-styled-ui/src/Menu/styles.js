import { setColorWithOpacity } from '../theme/colors';
import useTheme from '../useTheme';
import useColorMode from '../useColorMode';

export const useMenuListStyle = ({ buttonRefWidth }) => {
  const { colorMode } = useColorMode();
  const elevation = {
    light: {
      bg: 'white',
      boxShadow: 'light.sm',
    },
    dark: {
      bg: 'gray:80',
      boxShadow: 'dark.sm',
    },
  }[colorMode];

  return {
    color: 'inherit',
    m: '0',
    p: '0',
    minWidth: buttonRefWidth,
    ...elevation,
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

const baseProps = ({ isMenuGrouped }) => {
  return {
    flex: ' 0 0 auto',
    userSelect: 'none',
    px: isMenuGrouped ? '6x' : '3x',
    py: '2x',
    color: 'inherit',
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    textAlign: 'left',
    outline: 'none'
  };
};

const menuItemProps = ({ colorMode, disabled }) => {
  const _hoverColor = { light: 'black:disabled', dark: setColorWithOpacity('white', 0.12) }[colorMode];
  const _activeFocusColor = { light: 'gray:20', dark: setColorWithOpacity('white', 0.08) }[colorMode];
  const _disabled = { light: 'black:disabled', dark: 'white:disabled' }[colorMode];
  return {
    _hover: {
      bg: !disabled ? _hoverColor : '',
    },
    _active: {
      bg: _activeFocusColor,
    },
    _focus: {
      bg: _activeFocusColor,
      outline: 0,
    },
    _disabled: {
      color: _disabled,
      cursor: 'not-allowed',
    },
  };
};

export const useMenuItemStyle = ({ isMenuGrouped, disabled }) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const props = { theme, colorMode, isMenuGrouped, disabled };

  return {
    ...baseProps(props),
    ...menuItemProps(props),
  };
};
