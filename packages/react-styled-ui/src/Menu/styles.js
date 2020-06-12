import { setColorWithOpacity } from '../theme/colors';
import useTheme from '../useTheme';
import useColorMode from '../useColorMode';

export const useMenuListStyle = () => {
  const { colorMode } = useColorMode();
  const elevation = {
    light: {
      bg: '#fff',
      boxShadow: 'light.sm',
    },
    dark: {
      bg: 'gray:80',
      boxShadow: 'dark.sm',
    },
  };

  return {
    color: 'inherit',
    m: '0',
    p: '0',
    ...elevation[colorMode],
  };
};

/**
|--------------------------------------------------
| Styles for MenuItem
|--------------------------------------------------
*/

const baseProps = {
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

const menuItemProps = ({ colorMode }) => {
  const _hoverColor = { light: 'black:disabled', dark: setColorWithOpacity('white', 0.12) };
  const _activeFocusColor = { light: 'gray:20', dark: setColorWithOpacity('white', 0.08) };
  const _disabled = { light: 'black:disabled', dark: 'white:disabled' };
  return {
    _hover: {
      bg: _hoverColor[colorMode],
    },
    _active: {
      bg: _activeFocusColor[colorMode],
    },
    _focus: {
      bg: _activeFocusColor[colorMode],
      outline: 0,
    },
    _disabled: {
      color: _disabled[colorMode],
      cursor: 'not-allowed',
    },
  };
};

export const useMenuItemStyle = () => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const props = { theme, colorMode };

  return {
    ...baseProps,
    ...menuItemProps(props),
  };
};
