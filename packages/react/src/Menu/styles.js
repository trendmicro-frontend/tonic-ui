import { setColorWithOpacity } from '../theme/colors';
import { useColorMode } from '../ColorMode';
import useColorStyle from '../useColorStyle';

const useMenuListStyle = () => {
  const [colorMode] = useColorMode();
  const [colorStyle] = useColorStyle({ colorMode });
  const colorModeStyle = {
    light: {
      bg: 'white',
      boxShadow: colorStyle?.shadow?.medium,
    },
    dark: {
      bg: 'gray:80',
      boxShadow: colorStyle?.shadow?.medium,
    },
  }[colorMode];

  return {
    color: 'inherit',
    m: '0',
    p: '0',
    py: '2x',
    ...colorModeStyle,
  };
};

const useMenuGroupStyle = () => {
  const [colorMode] = useColorMode();
  const color = {
    dark: 'white:secondary',
    light: 'black:secondary',
  }[colorMode];

  return {
    px: '3x',
    py: '2x',
    color,
  };
};

const useMenuItemStyle = () => {
  const [colorMode] = useColorMode();
  const hoverBackground = {
    light: 'black:disabled',
    dark: setColorWithOpacity('white', 0.12),
  }[colorMode];
  const activeBackground = {
    light: 'gray:20',
    dark: setColorWithOpacity('white', 0.08),
  }[colorMode];
  const disabledColor = {
    light: 'black:disabled',
    dark: 'white:disabled',
  }[colorMode];
  const disabledBackground = {
    light: 'white',
    dark: 'gray:80',
  }[colorMode];
  const focusBackground = activeBackground;

  return {
    flex: ' 0 0 auto',
    userSelect: 'none',
    px: '3x',
    py: '2x',
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
    textAlign: 'left',
    outline: 'none',
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

const useMenuItemDividerStyle = () => {
  return {
    my: '2x'
  };
};

const useMenuToggleStyle = () => {
  return {
    cursor: 'pointer',
  };
};

const useMenuToggleIndicatorStyle = () => {
  return {
    display: 'inline-flex',
    _disabled: {
      opacity: '.28',
    },
  };
};

export {
  useMenuListStyle,
  useMenuGroupStyle,
  useMenuItemStyle,
  useMenuItemDividerStyle,
  useMenuToggleStyle,
  useMenuToggleIndicatorStyle,
};
